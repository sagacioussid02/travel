'use server';

/**
 * @fileOverview Generates a personalized travel itinerary based on the city and number of days provided.
 *
 * - generateTravelItinerary - A function that generates a travel itinerary.
 * - TravelItineraryInput - The input type for the generateTravelItinerary function.
 * - TravelItineraryOutput - The return type for the generateTravelItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TravelItineraryInputSchema = z.object({
  city: z.string().describe('The city to visit.'),
  numberOfDays: z.number().describe('The number of days to visit.'),
});
export type TravelItineraryInput = z.infer<typeof TravelItineraryInputSchema>;

const OptionalSpotSchema = z.object({
  spot: z.string().describe('The name of the optional location or attraction.'),
  description: z.string().describe('A short description of the optional spot.'),
});

const ItineraryItemSchema = z.object({
  day: z.number().describe('The day of the itinerary.'),
  time: z.string().describe('A granular time for the activity (e.g., "9:00 AM").'),
  spot: z.string().describe('The name of the main recommended location or attraction.'),
  thingsToDo: z.string().describe('A description of activities at the main location.'),
  ticketInfo: z.string().describe('Information on how to get tickets, if applicable.'),
  facts: z.string().describe('Interesting facts about the place.'),
  reviews: z.string().describe('Recent reviews from a trusted site like Google.'),
  optionalSpots: z.array(OptionalSpotSchema).describe('A list of optional nearby places to visit.'),
});


const TravelItineraryOutputSchema = z.object({
  itinerary: z.array(ItineraryItemSchema).describe('The generated travel itinerary.'),
});
export type TravelItineraryOutput = z.infer<typeof TravelItineraryOutputSchema>;
export type ItineraryItem = z.infer<typeof ItineraryItemSchema>;


export async function generateTravelItinerary(input: TravelItineraryInput): Promise<TravelItineraryOutput> {
  return generateTravelItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'travelItineraryPrompt',
  input: {schema: TravelItineraryInputSchema},
  output: {schema: TravelItineraryOutputSchema},
  prompt: `You are an expert travel agent. Generate a detailed travel itinerary for a user visiting {{city}} for {{numberOfDays}} days. 
  
  For each itinerary item, provide:
  - A granular time (e.g., "9:00 AM", "1:00 PM").
  - One main suggested spot with things to do, ticket info, facts, and reviews.
  - A few optional spots nearby that the user could visit as alternatives.

  Provide a comprehensive and engaging travel plan.
`,
});

const generateTravelItineraryFlow = ai.defineFlow(
  {
    name: 'generateTravelItineraryFlow',
    inputSchema: TravelItineraryInputSchema,
    outputSchema: TravelItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
