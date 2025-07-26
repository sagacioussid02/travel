import type { ItineraryItem as GenItineraryItem } from '@/ai/flows/generate-travel-itinerary';
import type { PopulateDefaultItinerariesOutput } from '@/ai/flows/populate-default-itineraries';

type DefaultItineraryItem = PopulateDefaultItinerariesOutput['itinerary'][0];

// Ensure both types have the same shape
// We are mapping the timeOfDay to time for consistency
export type ItineraryItem = Omit<DefaultItineraryItem, 'timeOfDay'> & { time: string } | GenItineraryItem;
