
export function InstagramReels() {
  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-sm rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Featured Reel</h3>
        </div>
        <div className="p-6 pt-0">
          <video controls className="w-full rounded-lg">
            <source src="/videos/reels.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex items-center p-6 pt-0">
          <a
            href="https://www.instagram.com/sidoni_clickz/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
