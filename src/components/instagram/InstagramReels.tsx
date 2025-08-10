'use client';

import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const videoFiles = [
  'timessq.mp4',
  'summit.mp4',
  'statue.mp4',
  'sandiego.mp4',
  'landing.mp4',
  'brooklyn.mp4',
];

export function InstagramReels() {
  const [videoErrors, setVideoErrors] = React.useState<boolean[]>(
    Array(videoFiles.length).fill(false)
  );

  const handleVideoError = (index: number) => {
    setVideoErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-4xl rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">
          <a
            href="https://www.instagram.com/travelwithsidoni/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            Featured Reels
          </a>
        </h3>

        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            loop: true,
            align: 'start',
          }}
        >
          <CarouselContent className="-ml-4">
            {videoFiles.map((videoFile, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <a
                  href="https://www.instagram.com/travelwithsidoni/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="p-1">
                    <video
                      controls
                      className="w-full rounded-lg aspect-video object-cover"
                      muted
                      autoPlay
                      playsInline
                      loop
                      onError={() => handleVideoError(index)}
                      src={`/videos/${videoFile}`}
                    >
                      Your browser does not support the video tag.
                    </video>
                    {videoErrors[index] && (
                      <div className="mt-2 p-2 bg-destructive/10 text-destructive rounded-md text-xs">
                        <p className="font-bold">Video Not Found</p>
                        <p>
                          Place{' '}
                          <code className="bg-black/20 p-1 rounded-sm">
                            {videoFile}
                          </code>{' '}
                          in{' '}
                          <code className="bg-black/20 p-1 rounded-sm">
                            public/videos/
                          </code>
                        </p>
                      </div>
                    )}
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        <div className="mt-4">
          <a
            href="https://www.instagram.com/travelwithsidoni/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View more on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
