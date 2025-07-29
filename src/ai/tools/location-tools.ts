'use server';
/**
 * @fileOverview Provides tools for fetching location details for itinerary planning.
 *
 * - getLocationDetails: A tool that returns geographic coordinates and estimated visit duration for a given location.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Helper function to calculate bearing
function getBearing(lat1: number, lon1: number, lat2: number, lon2: number) {
  const dLon = (lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

// Haversine formula to calculate distance
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export const getLocationDetails = ai.defineTool(
    {
      name: 'getLocationDetails',
      description: 'Provides the latitude, longitude, and estimated visit duration for a location. Also calculates travel time from a starting point if provided.',
      inputSchema: z.object({
        placeName: z.string().describe('The name of the location (e.g., "Eiffel Tower, Paris").'),
        startTime: z.string().optional().describe('The start time for the current day\'s itinerary.'),
        startLat: z.number().optional().describe('The latitude of the starting location.'),
        startLon: z.number().optional().describe('The longitude of the starting location.'),
      }),
      outputSchema: z.object({
        latitude: z.number(),
        longitude: z.number(),
        visitDurationMinutes: z.number(),
        travelTimeMinutes: z.number(),
        nextAvailableTime: z.string(),
      }),
    },
    async (input) => {
      // In a real app, you would call a Geo/Maps API here.
      // For this demo, we'll use a simple estimation.
      const estimatedLocationData: Record<string, { lat: number, lon: number, duration: number }> = {
        'eiffel tower': { lat: 48.8584, lon: 2.2945, duration: 120 },
        'louvre museum': { lat: 48.8606, lon: 2.3376, duration: 180 },
        'notre-dame cathedral': { lat: 48.8529, lon: 2.3500, duration: 60 },
        'arc de triomphe': { lat: 48.8738, lon: 2.2950, duration: 45 },
        'sacre-coeur basilica': { lat: 48.8867, lon: 2.3431, duration: 60 },
        'secret garden of paris': { lat: 48.86, lon: 2.34, duration: 45 }, // Custom User Data
        'times square': { lat: 40.7580, lon: -73.9855, duration: 60 },
        'statue of liberty': { lat: 40.6892, lon: -74.0445, duration: 180 },
        'central park': { lat: 40.7851, lon: -73.9683, duration: 120 },
        'empire state building': { lat: 40.7484, lon: -73.9857, duration: 90 },
        'brooklyn bridge': { lat: 40.7061, lon: -73.9969, duration: 45 },
        'colosseum': { lat: 41.8902, lon: 12.4922, duration: 150 },
        'roman forum': { lat: 41.8925, lon: 12.4853, duration: 120 },
        'vatican city': { lat: 41.9029, lon: 12.4534, duration: 240 },
        'trevi fountain': { lat: 41.9009, lon: 12.4833, duration: 30 },
        'pantheon': { lat: 41.8986, lon: 12.4769, duration: 45 },
        'the lost bookstore of rome': { lat: 41.89, lon: 12.48, duration: 75 }, // Custom User Data
        'meiji jingu': { lat: 35.6764, lon: 139.6993, duration: 60 },
        'senso-ji temple': { lat: 35.7148, lon: 139.7967, duration: 60 },
        'tokyo skytree': { lat: 35.7101, lon: 139.8107, duration: 120 },
        'shibuya crossing': { lat: 35.6590, lon: 139.7006, duration: 30 },
        'tsukiji outer market': { lat: 35.6655, lon: 139.7708, duration: 90 },
      };
      
      const placeKey = Object.keys(estimatedLocationData).find(key => input.placeName.toLowerCase().includes(key));
      const placeData = placeKey ? estimatedLocationData[placeKey] : { lat: 48.85, lon: 2.35, duration: 90 }; // Default if not found

      let travelTimeMinutes = 0;
      if (input.startLat && input.startLon) {
        const distanceKm = getDistance(input.startLat, input.startLon, placeData.lat, placeData.lon);
        // Average travel speed in a city (walking, public transport) is ~10km/h
        travelTimeMinutes = Math.round((distanceKm / 10) * 60);
      }
      
      // Calculate next available time
      const [hours, minutes] = input.startTime ? input.startTime.split(':').map(Number) : [9, 0];
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);

      const arrivalTime = new Date(startDate.getTime() + travelTimeMinutes * 60000);
      const departureTime = new Date(arrivalTime.getTime() + placeData.duration * 60000);
      
      const formatTime = (date: Date) => {
        const h = date.getHours().toString().padStart(2, '0');
        const m = date.getMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
      }
      
      return {
        latitude: placeData.lat,
        longitude: placeData.lon,
        visitDurationMinutes: placeData.duration,
        travelTimeMinutes: travelTimeMinutes,
        nextAvailableTime: formatTime(departureTime),
      };
    }
  );
