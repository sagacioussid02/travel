import { config } from 'dotenv';
config();

import '@/ai/flows/revise-travel-itinerary.ts';
import '@/ai/flows/generate-travel-itinerary.ts';
import '@/ai/flows/populate-default-itineraries.ts';
import '@/ai/flows/generate-image.ts';
