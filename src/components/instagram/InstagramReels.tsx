import { Instagram, Heart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const reels = [
  { id: 1, src: 'https://placehold.co/250x450', hint: 'travel reel', likes: '1.2M' },
  { id: 2, src: 'https://placehold.co/250x450', hint: 'beach sunset', likes: '890K' },
  { id: 3, src: 'https://placehold.co/250x450', hint: 'mountain hike', likes: '2.5M' },
  { id: 4, src: 'https://placehold.co/250x450', hint: 'city nightlife', likes: '500K' },
  { id: 5, src: 'https://placehold.co/250x450', hint: 'food market', likes: '1.8M' },
  { id: 6, src: 'https://placehold.co/250x450', hint: 'ancient ruins', likes: '3.1M' },
  { id: 7, src: 'https://placehold.co/250x450', hint: 'exotic wildlife', likes: '950K' },
];

export function InstagramReels() {
  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-10 text-foreground flex items-center justify-center gap-3">
        <Instagram className="w-8 h-8" />
        Trending Reels
      </h2>
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent>
          {reels.map((reel) => (
            <CarouselItem key={reel.id} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <div className="p-1">
                 <a href="https://www.instagram.com/sidoni_clickz/reels/" target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
                    <img
                        src={reel.src + '.png'}
                        alt={`Instagram reel ${reel.id}`}
                        width={250}
                        height={450}
                        className="w-full h-full object-cover"
                        data-ai-hint={reel.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-xs font-semibold">@sidoni_clickz</p>
                    <div className="flex items-center gap-1 text-xs">
                        <Heart className="w-3 h-3 text-red-500 fill-current" />
                        {reel.likes}
                    </div>
                    </div>
                 </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
