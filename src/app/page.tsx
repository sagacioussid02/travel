import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ItineraryGenerator from '@/components/itinerary/ItineraryGenerator';
import DefaultItineraries from '@/components/itinerary/DefaultItineraries';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { InstagramReels } from '@/components/instagram/InstagramReels';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AdBanner from '@/components/ads/AdBanner';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background/80">
      <Header />
      <main className="container mx-auto px-4 py-2 md:py-4 flex-grow w-full">
        <section className="text-center mb-4 md:mb-6">
          <h1 className="text-4xl md:text-6xl font-bold font-handwriting mb-4 text-foreground">
            Sidoni
          </h1>
          <p className="text-xl md:text-2xl font-handwriting max-w-3xl mx-auto bg-gradient-to-r from-primary via-pink-500 to-orange-500 text-transparent bg-clip-text">
            Unlock your next extraordinary journey. Our intelligent platform crafts
            unique, tailor-made itineraries in seconds, perfectly matching your
            travel style.
          </p>
        </section>
        
        <AdminDashboard />

        <ItineraryGenerator />

        <Suspense fallback={<ReelsSkeleton />}>
          <InstagramReels />
        </Suspense>

        <section className="mt-20 md:mt-28">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-10 text-foreground">
            Inspiring Journeys
          </h2>
          <Suspense fallback={<DefaultItinerariesSkeleton />}>
            <DefaultItineraries />
          </Suspense>
        </section>

        <AdBanner />
      </main>
      <Footer />
    </div>
  );
}

function DefaultItinerariesSkeleton() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

function ReelsSkeleton() {
  return (
    <div className="my-8 flex justify-center">
       <Card className="w-full max-w-4xl text-center p-6">
        <CardContent className="p-0">
          <Skeleton className="h-48 w-full" />
        </CardContent>
       </Card>
    </div>
  )
}
