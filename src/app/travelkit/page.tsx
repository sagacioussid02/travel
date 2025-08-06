import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Download, FileText, BarChart2, ShieldCheck, Camera, Mail, ShoppingCart } from 'lucide-react';
import * as React from 'react';

export default function TravelKitPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background/80">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow w-full">
        <section className="text-center mb-12">
          <div className="mb-4">
            <span className="inline-block bg-primary/20 text-primary animate-pulse rounded-full px-4 py-1 text-sm font-semibold tracking-wider">
              COMING SOON
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-foreground">
            ✈️ Travel Toolkit Bundle
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your essential collection of resources for smarter, safer, and more memorable travels. Download the complete bundle and be ready for any adventure!
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ToolkitItem
            icon={<FileText />}
            title="Packing List (Editable + Printable)"
            description="A customizable checklist you can edit for any destination, weather, or activity. Covers clothing, tech, documents, and more."
            features={[
              "Versions for beach, city, adventure, and winter trips.",
              "Blank editable template for full personalization."
            ]}
          />
          <ToolkitItem
            icon={<BarChart2 />}
            title="Travel Budgeting Sheet"
            description="A pre-formatted tracker (Google Sheets/Excel) to manage your expenses on the go."
            features={[
              "Auto-sum formulas to track spending.",
              "Currency conversion and daily budget planner.",
              "Visual graphs to compare budget vs. actuals."
            ]}
          />
          <ToolkitItem
            icon={<ShieldCheck />}
            title="Safety Checklist"
            description="A downloadable guide on safe travel practices, with special sections for solo and female travelers."
            features={[
              "Tips on accommodation and street safety.",
              "Common scams to avoid.",
              "List of emergency contacts & useful apps."
            ]}
          />
          <ToolkitItem
            icon={<Camera />}
            title="Instagrammable Photo Spot Guide"
            description="A curated mini-guide to the most photogenic spots in major cities like Paris, Bali, and NYC."
            features={[
              "Photo references and best times to shoot.",
              "Direct links to locations on maps.",
              "Posing, outfit, and lighting tips."
            ]}
          />
        </div>

        <section className="mt-20 md:mt-28 text-center">
            <div className="mb-4">
              <span className="inline-block bg-primary/20 text-primary animate-pulse rounded-full px-4 py-1 text-sm font-semibold tracking-wider">
                COMING SOON
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-10 text-foreground">
                Get Your Toolkit
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 justify-center font-headline text-2xl">
                            <Mail className="text-primary"/>
                            Free via Email
                        </CardTitle>
                        <CardDescription>
                            Get the complete bundle delivered to your inbox for free!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="lg" className="w-full">
                            <Download className="mr-2"/>
                            Sign Up & Download
                        </Button>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 justify-center font-headline text-2xl">
                            <ShoppingCart className="text-primary"/>
                            Purchase Securely
                        </CardTitle>
                        <CardDescription>
                           Support our work with a one-time purchase.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="lg" className="w-full">
                            <Download className="mr-2"/>
                            Buy Now
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

function ToolkitItem({ icon, title, description, features }: { icon: React.ReactNode, title: string, description: string, features: string[] }) {
    return (
        <Card className="bg-card/80">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 text-primary"})}
                    </div>
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0"/>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
