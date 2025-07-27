import { Instagram } from 'lucide-react';

export function InstagramReels() {
  return (
    <section className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-10 text-foreground flex items-center justify-center gap-3">
        <Instagram className="w-8 h-8" />
        Featured Reel
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-[250px] rounded-xl shadow-lg overflow-hidden">
          <video
            controls
            width="250"
            className="w-full h-full object-cover"
            poster="https://placehold.co/250x450.png"
          >
            <source src="/videos/reel.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
