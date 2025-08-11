
'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../actions';
import CheckoutForm from './CheckoutForm';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


// Make sure to add your publishable key to your .env.local file
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function PaymentPage() {
    const [clientSecret, setClientSecret] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await createPaymentIntent();
            if (response.success && response.clientSecret) {
                setClientSecret(response.clientSecret);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Could not initialize payment. Please try refreshing the page.',
                });
            }
        };
        getClientSecret();
    }, [toast]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-background/80">
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12 flex-grow w-full flex items-center justify-center">
                <Card className="max-w-md w-full shadow-xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-4">
                            <Zap className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-headline">Unlock Unlimited Access</CardTitle>
                        <CardDescription className="text-base">
                            Complete your purchase to continue generating personalized travel itineraries.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-6 border rounded-lg bg-card/50">
                            <h3 className="text-xl font-bold">Sidoni Pro</h3>
                            <p className="text-3xl font-bold my-2">$10.00 <span className="text-sm font-normal text-muted-foreground">/ one-time</span></p>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                <li>Unlimited itinerary generations</li>
                                <li>Unlimited itinerary revisions</li>
                                <li>Access to all travel toolkits</li>
                                <li>Priority support</li>
                            </ul>
                        </div>
                        {clientSecret ? (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        ) : (
                            <div className="space-y-4">
                               <Skeleton className="h-10 w-full" />
                               <Skeleton className="h-10 w-full" />
                               <Skeleton className="h-12 w-full" />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
