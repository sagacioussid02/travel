'use client';

import { PaperPlaneIcon } from './PaperPlaneIcon';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-full">
            <PaperPlaneIcon className="h-6 w-6 text-primary" />
          </div>
          <a
            href="/"
            className="text-2xl font-headline font-bold text-foreground"
          >
            Sidoni
          </a>
        </div>
      </div>
    </header>
  );
}
