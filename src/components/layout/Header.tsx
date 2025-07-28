'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithRedirect, GoogleAuthProvider, signOut, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { PaperPlaneIcon } from './PaperPlaneIcon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { LogOut, User as UserIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    
    getRedirectResult(auth)
      .catch((error) => {
        console.error("Error during sign-in redirect:", error);
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: error.message || 'Could not log you in via redirect. Please try again.',
        });
      });

    return () => unsubscribe();
  }, [toast]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error during sign-in:", error);
       toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Could not initiate login. Please try again.',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };
  
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
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                    <AvatarFallback>
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem disabled>
                  <div className="font-medium">{user.displayName}</div>
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={handleLogout}>
                   <LogOut className="mr-2 h-4 w-4" />
                   <span>Log out</span>
                 </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={handleLogin}>Login</Button>
              <Button asChild>
                <a href="https://binosusai.com" target="_blank" rel="noopener noreferrer">Sign Up</a>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
