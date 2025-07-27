
export function InstagramReels() {
  return (
    <div className="flex justify-center my-8">
      <video controls width="250" className="rounded-lg">
        <source src="/videos/reel.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
