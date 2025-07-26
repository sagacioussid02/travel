import { Instagram, Heart } from 'lucide-react';

export function InstagramReels() {
  return (
    <section className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-10 text-foreground flex items-center justify-center gap-3">
        <Instagram className="w-8 h-8" />
        Featured Reel
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-[250px] p-1">
          <a
            href="https://www.instagram.com/reel/DMk-Ra2gUi0/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative group"
          >
            <img
              src="https://placehold.co/250x450.png"
              alt="Featured Instagram reel"
              width={250}
              height={450}
              className="w-full h-full object-cover"
              data-ai-hint="travel reel"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity group-hover:from-black/80"></div>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-sm font-semibold">@sidoni_clickz</p>
              <div className="flex items-center gap-1.5 text-xs">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                <span className="font-medium">1.2M</span>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-black/50 rounded-full p-4">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
