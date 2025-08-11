
'use server';

import {
  generateTravelItinerary,
  type TravelItineraryInput,
} from '@/ai/flows/generate-travel-itinerary';
import {
  reviseTravelItinerary,
  type ReviseTravelItineraryInput,
} from '@/ai/flows/revise-travel-itinerary';
import Stripe from 'stripe';

// This is a placeholder for your Stripe secret key.
// In a real application, use environment variables: process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function createPaymentIntent() {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents ($10.00)
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return { success: true, clientSecret: paymentIntent.client_secret };
    } catch (error) {
        console.error('Error creating payment intent:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return {
            success: false,
            error: 'Failed to create payment intent.',
            details: errorMessage,
        };
    }
}


export async function generateItinerary(input: TravelItineraryInput) {
  try {
    const result = await generateTravelItinerary(input);
    return { success: true, data: result.itinerary };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return {
      success: false,
      error: 'Failed to generate itinerary. Please try again later.',
    };
  }
}

export async function reviseItinerary(input: ReviseTravelItineraryInput) {
  try {
    const result = await reviseTravelItinerary(input);
    return { success: true, data: result.revisedItinerary };
  } catch (error) {
    console.error('Error revising itinerary:', error);
    return {
      success: false,
      error: 'Failed to revise itinerary. Please try again later.',
    };
  }
}
