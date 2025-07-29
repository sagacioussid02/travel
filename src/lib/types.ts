import type { ItineraryItem as GenItineraryItem } from '@/ai/flows/generate-travel-itinerary';

// All itinerary item types are now consistent, so we only need one.
export type ItineraryItem = GenItineraryItem;
