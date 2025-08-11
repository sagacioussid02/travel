
'use server';

import {
  generateTravelItinerary,
  type TravelItineraryInput,
} from '@/ai/flows/generate-travel-itinerary';
import {
  reviseTravelItinerary,
  type ReviseTravelItineraryInput,
} from '@/ai/flows/revise-travel-itinerary';

export async function generateItinerary(input: TravelItineraryInput) {
  try {
    const result = await generateTravelItinerary(input);
    return { success: true, data: result.itinerary };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return {
      success: false,
      error: 'Failed to generate itinerary. Please try again later.',
    };
  }
}

export async function reviseItinerary(input: ReviseTravelItineraryInput) {
  try {
    const result = await reviseTravelItinerary(input);
    return { success: true, data: result.revisedItinerary };
  } catch (error) {
    console.error('Error revising itinerary:', error);
    return {
      success: false,
      error: 'Failed to revise itinerary. Please try again later.',
    };
  }
}
