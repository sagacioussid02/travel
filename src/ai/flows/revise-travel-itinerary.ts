'use server';
/**
 * @fileOverview This file defines a Genkit flow for revising a travel itinerary.
 *
 * - reviseTravelItinerary - A function that takes user input and regenerates a new travel itinerary.
 * - ReviseTravelItineraryInput - The input type for the reviseTravelItinerary function.
 * - ReviseTravelItineraryOutput - The return type for the reviseTravelItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReviseTravelItineraryInputSchema = z.object({
  city: z.string().describe('The city or town the user will be visiting.'),
  duration: z.number().describe('The number of days of the visit.'),
  previousItinerary: z.string().optional().describe('The previously generated itinerary, if any.'),
});
export type ReviseTravelItineraryInput = z.infer<typeof ReviseTravelItineraryInputSchema>;

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

const ReviseTravelItineraryOutputSchema = z.object({
  revisedItinerary: z.array(ItineraryItemSchema).describe('A revised travel itinerary based on the user input.'),
});
export type ReviseTravelItineraryOutput = z.infer<typeof ReviseTravelItineraryOutputSchema>;

export async function reviseTravelItinerary(input: ReviseTravelItineraryInput): Promise<ReviseTravelItineraryOutput> {
  return reviseTravelItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reviseTravelItineraryPrompt',
  input: {schema: ReviseTravelItineraryInputSchema},
  output: {schema: ReviseTravelItineraryOutputSchema},
  prompt: `You are an AI travel agent. The user wants you to revise their travel itinerary.

  City: {{{city}}}
  Duration: {{{duration}}} days

  {% if previousItinerary %}
  Here is the itinerary they were not satisfied with:
  {{previousItinerary}}
  {% endif %}

  Create a new itinerary with a different arrangement of travel spots considering the city and duration. 
  
  For each itinerary item, provide:
  - A granular time (e.g., "9:00 AM", "1:00 PM").
  - One main suggested spot with things to do, ticket info, facts, and reviews.
  - A few optional spots nearby that the user could visit as alternatives.
  `,
});

const reviseTravelItineraryFlow = ai.defineFlow(
  {
    name: 'reviseTravelItineraryFlow',
    inputSchema: ReviseTravelItineraryInputSchema,
    outputSchema: ReviseTravelItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
