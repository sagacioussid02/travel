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
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f97316' }} />
          <stop offset="50%" style={{ stopColor: '#ec4899' }} />
          <stop offset="100%" style={{ stopColor: '#a855f7' }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      <path
        d="M69.92,37.33,37.42,69.83a4.27,4.27,0,0,1-6-6l32.5-32.5a4.27,4.27,0,0,1,6,6Z"
        fill="white"
      />
      <path
        d="M37.42,30.17,30.08,37.5a4.27,4.27,0,0,0,0,6l7.33,7.34a4.27,4.27,0,0,0,6,0l7.34-7.34a4.27,4.27,0,0,0,0-6L43.42,30.17a4.27,4.27,0,0,0-6,0Z"
        fill="white"
      />
    </svg>
  );
}
