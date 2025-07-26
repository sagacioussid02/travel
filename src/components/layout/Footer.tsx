import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto py-6 text-center text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>
          &copy; {new Date().getFullYear()} Sidoni. All rights reserved.
        </p>
        <a 
          href="https://instagram.com/sidoni.travel" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Instagram className="w-4 h-4" />
          @sidoni.travel
        </a>
      </div>
    </footer>
  );
}
