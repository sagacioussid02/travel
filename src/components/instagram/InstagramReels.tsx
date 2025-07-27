'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const videoFiles = ['reels.mp4', 'reels2.mp4', 'reels3.mp4'];

export function InstagramReels() {
  const [videoErrors, setVideoErrors] = React.useState<boolean[]>(
    Array(videoFiles.length).fill(false)
  );

  const handleVideoError = (index: number) => {
    setVideoErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-sm rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">
          <a
            href="https://www.instagram.com/sidoni_clickz/reels/"
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
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {videoFiles.map((videoFile, index) => (
              <CarouselItem key={index}>
                <a
                  href="https://www.instagram.com/sidoni_clickz/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <video
                    controls
                    className="w-full rounded-lg"
                    muted
                    autoPlay
                    playsInline
                    loop
                    onError={() => handleVideoError(index)}
                    src={`/videos/${videoFile}`}
                  >
                    Your browser does not support the video tag.
                  </video>
                </a>
                {videoErrors[index] && (
                  <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md text-sm">
                    <p className="font-bold">Video Not Found</p>
                    <p>
                      Could not find video:{' '}
                      <code className="bg-black/20 p-1 rounded-sm text-xs">
                        {videoFile}
                      </code>
                    </p>
                    <p>
                      Please place it in the{' '}
                      <code className="bg-black/20 p-1 rounded-sm text-xs">
                        public/videos/
                      </code>{' '}
                      directory.
                    </p>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-4">
          <a
            href="https://www.instagram.com/sidoni_clickz/reels/"
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