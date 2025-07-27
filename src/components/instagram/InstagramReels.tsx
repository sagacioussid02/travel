import { Instagram } from 'lucide-react';

export function InstagramReels() {
  return (
    <section className="mb-12 md:mb-16">
      <a
        href="https://www.instagram.com/sidoni_clickz/reels/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl md:text-4xl font-bold font-headline text-center mb-10 text-foreground flex items-center justify-center gap-3 hover:text-primary transition-colors"
      >
        <Instagram className="w-8 h-8" />
        Featured Reel
      </a>
      <div className="flex justify-center">
        <div className="w-full max-w-[250px] rounded-xl shadow-lg overflow-hidden bg-card">
          <video
            controls
            width="250"
            className="w-full h-auto object-cover"
            poster="https://placehold.co/250x450.png"
            data-ai-hint="travel video"
          >
            <source src="/videos/reel.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
