
export function InstagramReels() {
  return (
    <section className="mb-12 md:mb-16 flex flex-col items-center gap-6">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-foreground">
        Featured Reel
      </h2>
      <div className="w-full max-w-[250px] rounded-xl shadow-lg overflow-hidden">
        <video
          controls
          width="250"
          className="w-full h-auto block"
          poster="https://placehold.co/250x450.png"
          data-ai-hint="travel video"
        >
          <source src="/videos/reel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
