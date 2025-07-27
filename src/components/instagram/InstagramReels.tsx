'use client';

import * as React from 'react';

export function InstagramReels() {
  const [videoError, setVideoError] = React.useState(false);

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
            Featured Reel
          </a>
        </h3>

        <video
          controls
          className="w-full rounded-lg"
          onError={() => setVideoError(true)}
          src="/videos/reels.mp4"
        >
          Your browser does not support the video tag.
        </video>

        {videoError && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md text-sm">
            <p className="font-bold">Video Not Found</p>
            <p>
              Please make sure you have placed your video file at the following
              location in your project:
            </p>
            <code className="block bg-black/20 p-2 rounded-sm mt-2 text-xs">
              public/videos/reels.mp4
            </code>
          </div>
        )}

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
