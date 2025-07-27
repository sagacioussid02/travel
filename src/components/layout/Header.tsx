import { MountainSnow } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-full">
            <MountainSnow className="h-6 w-6 text-primary" />
          </div>
          <a href="/" className="text-2xl font-headline font-bold text-foreground">
            Sidoni
          </a>
        </div>
        <a
          href="https://coff.ee/sidonitravels"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            height={40}
            width={144} 
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
          />
        </a>
      </div>
    </header>
  );
}
