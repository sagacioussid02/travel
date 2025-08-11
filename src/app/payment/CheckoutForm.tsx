
'use client';

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/`,
      },
      redirect: 'if_required', // This prevents the automatic redirect
    });


    if (error) {
       if (error.type === 'card_error' || error.type === 'validation_error') {
          toast({
            variant: 'destructive',
            title: 'Payment Failed',
            description: error.message || 'An unexpected error occurred.',
          });
        } else {
           toast({
            variant: 'destructive',
            title: 'An unexpected error occurred.',
            description: 'Please try again.',
          });
        }
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast({
            title: 'Payment Successful!',
            description: 'You now have unlimited access.',
        });
        // Redirect programmatically after success
        window.location.href = '/';

    } else {
         toast({
            variant: 'destructive',
            title: 'Payment Status Unknown',
            description: 'Your payment status is unclear. Please check your account or contact support.',
        });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full mt-6 font-bold" size="lg">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2" />
            Pay Securely
          </>
        )}
      </Button>
    </form>
  );
}
