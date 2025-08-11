
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Instagram, Send } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';

export default function CheckoutForm() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="p-4 border rounded-md bg-muted/50 mb-6">
            <p className="text-center text-sm text-muted-foreground">
                Live payments are coming soon. The button below will show a confirmation message.
            </p>
        </div>
        <Button id="submit" className="w-full font-bold" size="lg">
            <CreditCard className="mr-2" />
            Pay Securely
        </Button>
      </form>

      <AlertDialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-4">
                    <Send className="w-8 h-8 text-primary" />
                </div>
                <AlertDialogTitle className="text-center">Payments Coming Soon!</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    We are currently setting up our secure payment system. For updates and to get in touch, please visit our Instagram page.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2">
                 <Link href="https://instagram.com/travelwithsidoni" target="_blank" className="w-full">
                    <AlertDialogAction className="w-full">
                            <Instagram className="mr-2"/>
                            Go to Instagram
                    </AlertDialogAction>
                </Link>
                <Button variant="outline" onClick={() => setShowComingSoon(false)}>Close</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
