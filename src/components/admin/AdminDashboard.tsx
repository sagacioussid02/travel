'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase';
import FileUploader from './FileUploader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ShieldCheck } from 'lucide-react';

const whitelistedEmails = [
  'siddharthuncc@gmail.com',
  'sidoni.creation@gmail.com',
];

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const isWhitelisted = user && user.email && whitelistedEmails.includes(user.email);

  if (!isWhitelisted) {
    return null;
  }

  return (
    <section className="my-12">
        <Card className="max-w-4xl mx-auto border-2 border-primary/30 shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <ShieldCheck className="text-primary" />
                    Admin Panel
                </CardTitle>
                <CardDescription>
                    Use this panel to upload your travel blog PDFs to customize the AI's knowledge.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FileUploader />
            </CardContent>
        </Card>
    </section>
  );
}
