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
import { getLocationDetails } from '../tools/location-tools';

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
  startTime: z.string().describe('The start time for the activity (e.g., "9:00 AM").'),
  endTime: z.string().describe('The end time for the activity (e.g., "11:00 AM").'),
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
  tools: [getLocationDetails],
  prompt: `You are an expert travel agent. Generate a detailed and logically sequenced travel itinerary for a user visiting {{city}} for {{numberOfDays}} days. 
  
  For each itinerary item, provide:
  - A start and end time for each activity. You must account for the travel time between locations and the average time required to visit each spot. Use the getLocationDetails tool to get this information.
  - One main suggested spot with things to do, ticket info, facts, and reviews.
  - A few optional spots nearby that the user could visit as alternatives.

  Provide a comprehensive, engaging, and realistic travel plan. The schedule should be feasible.

  ---
  CUSTOM TRAVEL BLOG DATA:
  When generating the itinerary, if you include any of the following locations, you MUST use the provided "Things to Do" and "Facts". This information is from the user's personal travel blog and should be treated as the source of truth.

  Location: Secret Garden of Paris
  Things to Do: "Wander through the hidden pathways, find the quiet bench by the fountain for a moment of peace, and try to spot the resident cat, 'Mignon'. This is a place for quiet reflection, not for loud tourist activities."
  Facts: "This garden was a private sanctuary for a famous poet in the 19th century and was only opened to the public in the last decade. It's said that the fountain's water comes from a natural spring with healing properties."

  Location: The Lost Bookstore of Rome
  Things to Do: "Browse the floor-to-ceiling shelves of rare and antique books. Ask the owner, 'Marco', for a recommendation based on your favorite author. They often host impromptu poetry readings in the evenings."
  Facts: "The bookstore is rumored to have a secret passage that was once part of the ancient city's catacombs. Some of the books are one-of-a-kind, handwritten manuscripts from centuries ago."
  ---
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
