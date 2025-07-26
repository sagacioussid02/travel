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

const ItineraryItemSchema = z.object({
  day: z.number().describe('The day of the itinerary.'),
  timeOfDay: z.string().describe('The time of day for the activity.'),
  spot: z.string().describe('The name of the location or attraction.'),
  thingsToDo: z.string().describe('A description of activities at the location.'),
  ticketInfo: z.string().describe('Information on how to get tickets, if applicable.'),
  facts: z.string().describe('Interesting facts about the place.'),
  reviews: z.string().describe('Recent reviews from a trusted site like Google.'),
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
  prompt: `You are an expert travel agent. Generate a detailed travel itinerary for a user visiting {{city}} for {{numberOfDays}} days. The itinerary should include the day, time of the day, the spot, things to do there, how to get tickets, some facts about the place and recent reviews from a trusted site like Google. Provide a comprehensive and engaging travel plan.
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
