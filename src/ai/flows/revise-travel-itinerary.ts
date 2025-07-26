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

const ItineraryItemSchema = z.object({
  day: z.number().describe('The day of the itinerary.'),
  timeOfDay: z.string().describe('The time of day for the activity.'),
  spot: z.string().describe('The name of the location or attraction.'),
  thingsToDo: z.string().describe('A description of activities at the location.'),
  ticketInfo: z.string().describe('Information on how to get tickets, if applicable.'),
  facts: z.string().describe('Interesting facts about the place.'),
  reviews: z.string().describe('Recent reviews from a trusted site like Google.'),
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

  Create a new itinerary with a different arrangement of travel spots considering the city and duration. The itinierary should be like day, time of the day, the spot, things to do there, how to get tickets, some facts about the place and recent reviews from a trusted site like google.
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
