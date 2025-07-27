import { MountainSnow, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <Button asChild variant="secondary">
          <a
            href="https://coff.ee/sidonitravels"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Coffee className="mr-2 h-4 w-4" />
            Buy me a coffee
          </a>
        </Button>
      </div>
    </header>
  );
}
