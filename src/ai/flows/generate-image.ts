'use server';

/**
 * @fileOverview A flow for generating an image based on a prompt.
 *
 * - generateImage - A function that generates an image.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {cache} from 'react';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The prompt for the image to be generated.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      'The generated image, as a data URI that must include a MIME type and use Base64 encoding.'
    ),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export const generateImage = cache(async (input: GenerateImageInput): Promise<GenerateImageOutput> => {
  return generateImageFlow(input);
});

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A beautiful, high-quality photograph of ${input.prompt}, suitable for a travel website.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return {
      imageUrl: media.url,
    };
  }
);
