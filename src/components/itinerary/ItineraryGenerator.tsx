'use client';

import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { generateItinerary, reviseItinerary } from '@/app/actions';
import { ItineraryTable } from './ItineraryTable';
import type { ItineraryItem } from '@/lib/types';

const formSchema = z.object({
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  numberOfDays: z.coerce
    .number()
    .min(1, { message: 'Duration must be at least 1 day.' })
    .max(14, { message: 'Duration cannot exceed 14 days.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function ItineraryGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRevising, setIsRevising] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryItem[] | null>(null);
  const [formValues, setFormValues] = useState<FormData | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
      numberOfDays: 3,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setItinerary(null);
    setFormValues(values);

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

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
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
    </>
  );
}
