import type { ItineraryItem as GenItineraryItem } from '@/ai/flows/generate-travel-itinerary';
import type { PopulateDefaultItinerariesOutput } from '@/ai/flows/populate-default-itineraries';

export type ItineraryItem = PopulateDefaultItinerariesOutput['itinerary'][0] | GenItineraryItem;
