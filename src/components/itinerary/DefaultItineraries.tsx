import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { populateDefaultItineraries } from '@/ai/flows/populate-default-itineraries';
import type { ItineraryItem } from '@/lib/types';
import {
  CalendarDays,
  ChevronDown,
  Lightbulb,
  MapPin,
  MessageSquare,
  Ticket,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const defaultDestinations = [
  { destination: 'Paris, France', durationDays: 3, image: 'https://placehold.co/400x200', hint: 'eiffel tower' },
  { destination: 'Tokyo, Japan', durationDays: 5, image: 'https://placehold.co/400x200', hint: 'shibuya crossing' },
  { destination: 'Rome, Italy', durationDays: 4, image: 'https://placehold.co/400x200', hint: 'colosseum rome' },
];

export default async function DefaultItineraries() {
  const itineraries = await Promise.all(
    defaultDestinations.map(async (dest) => {
      try {
        const result = await populateDefaultItineraries(dest);
        return { ...dest, ...result };
      } catch (error) {
        console.error(`Failed to fetch itinerary for ${dest.destination}`, error);
        return { ...dest, itinerary: [] };
      }
    })
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {itineraries.map((plan, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={index}
            className="border-none"
          >
            <AccordionTrigger className="bg-card p-4 rounded-lg shadow-md hover:no-underline hover:shadow-lg transition-shadow text-left">
              <div className="flex items-center gap-4 w-full">
                <Image
                  src={plan.image}
                  alt={plan.destination}
                  width={100}
                  height={60}
                  className="rounded-md object-cover hidden sm:block"
                  data-ai-hint={plan.hint}
                />
                <div>
                  <h3 className="text-xl font-headline font-semibold text-foreground">
                    {plan.destination}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A {plan.durationDays}-day curated journey
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-card/50 rounded-b-lg">
              {plan.itinerary.length > 0 ? (
                <div className="space-y-6">
                  {plan.itinerary.map((item, itemIndex) => (
                    <ItineraryDayCard key={itemIndex} item={item} />
                  ))}
                </div>
              ) : (
                 <p className="text-muted-foreground text-center py-4">
                  Could not load itinerary for this destination.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function ItineraryDayCard({ item }: { item: ItineraryItem }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge variant="secondary" className="mb-2">
            <CalendarDays className="w-3 h-3 mr-1.5" />
            Day {item.day}
          </Badge>
          <h4 className="text-lg font-bold font-headline">{item.spot}</h4>
          <p className="text-sm text-muted-foreground">{item.time}</p>
        </div>
        {item.optionalSpots && item.optionalSpots.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Optional Spots <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {item.optionalSpots.map((spot, i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start gap-1">
                  <p className="font-semibold">{spot.spot}</p>
                  <p className="text-xs text-muted-foreground">{spot.description}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 mt-1 text-primary shrink-0" />
          <p><span className="font-semibold">Things to do:</span> {item.thingsToDo}</p>
        </div>
        <div className="flex items-start gap-3">
          <Ticket className="w-4 h-4 mt-1 text-primary shrink-0" />
          <p><span className="font-semibold">Tickets:</span> {item.ticketInfo}</p>
        </div>
        <div className="flex items-start gap-3">
          <Lightbulb className="w-4 h-4 mt-1 text-primary shrink-0" />
          <p><span className="font-semibold">Fun Fact:</span> {item.facts}</p>
        </div>
        <div className="flex items-start gap-3">
          <MessageSquare className="w-4 h-4 mt-1 text-primary shrink-0" />
          <p><span className="font-semibold">Reviews:</span> <em className="text-muted-foreground">"{item.reviews}"</em></p>
        </div>
      </div>
    </div>
  );
}
