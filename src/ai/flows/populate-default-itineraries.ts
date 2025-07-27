'use server';

/**
 * @fileOverview A flow for generating default travel itineraries for popular destinations.
 *
 * - populateDefaultItineraries - A function that generates default travel itineraries.
 * - PopulateDefaultItinerariesInput - The input type for the populateDefaultItineraries function.
 * - PopulateDefaultItinerariesOutput - The return type for the populateDefaultItineraries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {cache} from 'react';

const PopulateDefaultItinerariesInputSchema = z.object({
  destination: z.string().describe('The destination for the travel itinerary.'),
  durationDays: z.number().describe('The number of days for the itinerary.'),
});
export type PopulateDefaultItinerariesInput = z.infer<typeof PopulateDefaultItinerariesInputSchema>;

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

const PopulateDefaultItinerariesOutputSchema = z.object({
  itinerary: z.array(ItineraryItemSchema).describe('A list of daily itineraries.'),
});

export type PopulateDefaultItinerariesOutput = z.infer<typeof PopulateDefaultItinerariesOutputSchema>;

export const populateDefaultItineraries = cache(
  async (
    input: PopulateDefaultItinerariesInput
  ): Promise<PopulateDefaultItinerariesOutput> => {
    return populateDefaultItinerariesFlow(input);
  }
);

const prompt = ai.definePrompt({
  name: 'populateDefaultItinerariesPrompt',
  input: {schema: PopulateDefaultItinerariesInputSchema},
  output: {schema: PopulateDefaultItinerariesOutputSchema},
  prompt: `You are an AI travel agent that specializes in creating travel itineraries.

  Create a travel itinerary for the following destination: {{{destination}}}
  The itinerary should be for {{{durationDays}}} days.

  The itinerary should include the following information for each item:
  - day: The day of the itinerary.
  - time: A granular time for the activity (e.g., "9:00 AM").
  - spot: The main recommended location or attraction.
  - thingsToDo: A description of activities at the main location.
  - ticketInfo: Information on how to get tickets, if applicable.
  - facts: Interesting facts about the place.
  - reviews: Recent reviews from a trusted site like Google.
  - optionalSpots: A list of optional nearby places to visit with a short description.
  `,
});

const populateDefaultItinerariesFlow = ai.defineFlow(
  {
    name: 'populateDefaultItinerariesFlow',
    inputSchema: PopulateDefaultItinerariesInputSchema,
    outputSchema: PopulateDefaultItinerariesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
