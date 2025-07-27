import { cn } from '@/lib/utils';

export function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('lucide lucide-send', className)}
      width="24"
      height="24"
    >
      <path
        d="M10 10 L90 50 L10 90 L30 50 Z"
        fill="#a855f7"
        stroke="white"
        strokeWidth="2"
      />
      <path 
        d="M30 50 L90 50 L50 70 Z" 
        fill="#e9d5ff"
      />
    </svg>
  );
}
