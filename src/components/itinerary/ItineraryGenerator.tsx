
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Bot,
  Loader2,
  MapPin,
  CalendarDays,
  Sparkles,
  RefreshCw,
  CreditCard,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { generateItinerary, reviseItinerary } from '@/app/actions';
import { ItineraryTable } from './ItineraryTable';
import type { ItineraryItem } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  numberOfDays: z.coerce
    .number()
    .min(1, { message: 'Duration must be at least 1 day.' })
    .max(5, { message: 'Duration cannot exceed 5 days.' }),
});

type FormData = z.infer<typeof formSchema>;
const GUEST_GENERATION_INFO_KEY = 'guestGenerationInfo';
const USER_GENERATION_INFO_KEY = 'userGenerationInfo';
const TWELVE_HOURS_IN_MS = 12 * 60 * 60 * 1000;

export default function ItineraryGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRevising, setIsRevising] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryItem[] | null>(null);
  const [formValues, setFormValues] = useState<FormData | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const { user, handleLogin } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    let key;
    let isGuest = true;
    if (user) {
        key = `${USER_GENERATION_INFO_KEY}_${user.uid}`;
        isGuest = false;
        setShowLoginPrompt(false);
    } else {
        key = GUEST_GENERATION_INFO_KEY;
    }
    
    const storedInfoRaw = localStorage.getItem(key);

    if (storedInfoRaw) {
        try {
            const storedInfo = JSON.parse(storedInfoRaw);
            let count = storedInfo.count;
            if (isGuest) {
                 const { timestamp } = storedInfo;
                 if (Date.now() - timestamp > TWELVE_HOURS_IN_MS) {
                    localStorage.removeItem(key);
                    count = 0;
                 }
            }
            setGenerationCount(count);
        } catch {
            localStorage.removeItem(key);
            setGenerationCount(0);
        }
    } else {
        setGenerationCount(0);
    }

  }, [user]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
      numberOfDays: 3,
    },
  });

  async function onSubmit(values: FormData) {
    if (user) {
        if (generationCount >= 1) {
            setShowPaymentPrompt(true);
            return;
        }
    } else {
        if (generationCount >= 1) {
            setShowLoginPrompt(true);
            return;
        }
    }

    setIsLoading(true);
    setItinerary(null);
    setFormValues(values);
    
    const newCount = generationCount + 1;
    setGenerationCount(newCount);

    if (user) {
        const userInfo = { count: newCount };
        localStorage.setItem(`${USER_GENERATION_INFO_KEY}_${user.uid}`, JSON.stringify(userInfo));
    } else {
        const guestInfo = {
            count: newCount,
            timestamp: Date.now(),
        };
        localStorage.setItem(GUEST_GENERATION_INFO_KEY, JSON.stringify(guestInfo));
    }

    const result = await generateItinerary(values);

    if (result.success) {
      setItinerary(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsLoading(false);
  }

  async function handleRevise() {
    if (!formValues || !itinerary) return;

    setIsRevising(true);
    const result = await reviseItinerary({
      city: formValues.city,
      duration: formValues.numberOfDays,
      previousItinerary: JSON.stringify(itinerary),
    });
    if (result.success) {
      setItinerary(result.data);
      toast({
        title: 'Itinerary Revised',
        description: 'Here is a new set of suggestions for your trip.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsRevising(false);
  }

  const handleProceedToPayment = () => {
    router.push('/payment');
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="font-handwriting text-3xl flex items-center gap-2">
              <Sparkles className="text-primary" />
              Create Your Dream Trip
            </CardTitle>
            <CardDescription>
              Enter your destination and we'll generate a personalized itinerary
              for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Destination City</FormLabel>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="e.g., Paris, Tokyo, Rome"
                              {...field}
                              className="pl-10"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (days)</FormLabel>
                        <div className="relative">
                          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input type="number" placeholder="e.g., 3" {...field} className="pl-10" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto font-bold"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Itinerary'
                    )}
                  </Button>
                    <p className="text-sm text-muted-foreground">
                      {generationCount} / 1 Free Generation Used
                    </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 animate-pulse" /> Crafting your adventure...
              </CardTitle>
              <CardDescription>
                Our AI is exploring the best spots for your trip. Please wait a moment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {itinerary && (
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">
                Your Itinerary for {formValues?.city}
              </CardTitle>
              <CardDescription>
                Here is a suggested plan for your {formValues?.numberOfDays}-day trip.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ItineraryTable itinerary={itinerary} />
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleRevise}
                disabled={isRevising}
                variant="outline"
              >
                {isRevising ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Revising...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Revise Itinerary
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      <AlertDialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <AlertDialogContent>
          <AlertDialogHeader>
              <AlertDialogTitle>Login to Continue</AlertDialogTitle>
              <AlertDialogDescription>
                  You have used your free itinerary generation. Please log in to continue creating amazing travel plans with Sidoni.
              </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showPaymentPrompt} onOpenChange={setShowPaymentPrompt}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Limit Reached</AlertDialogTitle>
                  <AlertDialogDescription>
                      You have used your itinerary generation for this session. Please purchase for unlimited access.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleProceedToPayment}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Payment
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
