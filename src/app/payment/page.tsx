import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Zap } from 'lucide-react';

export default function PaymentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background/80">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow w-full flex items-center justify-center">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-4">
                <Zap className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">Unlock Unlimited Access</CardTitle>
            <CardDescription className="text-base">
              Choose a plan to continue generating personalized travel itineraries with no limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border rounded-lg bg-card/50">
                <h3 className="text-xl font-bold">Sidoni Pro</h3>
                <p className="text-3xl font-bold my-2">$10 <span className="text-sm font-normal text-muted-foreground">/ one-time</span></p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    <li>Unlimited itinerary generations</li>
                    <li>Unlimited itinerary revisions</li>
                    <li>Access to all travel toolkits</li>
                    <li>Priority support</li>
                </ul>
            </div>
            <div className="p-6 border rounded-lg bg-card/80">
                <h4 className="font-semibold mb-2">Payment Information</h4>
                {/* This is where a real payment form like Stripe Elements would be mounted. */}
                <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Payment Form Placeholder</p>
                </div>
            </div>
            <Button size="lg" className="w-full font-bold">
              <CreditCard className="mr-2" />
              Pay Securely
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
