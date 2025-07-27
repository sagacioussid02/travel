'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
       <Card className="w-full max-w-4xl text-center p-6 bg-muted/50">
        <CardContent className="p-0">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your Publisher ID
              data-ad-slot="YOUR_AD_SLOT_ID" // Replace with your Ad Slot ID
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
             <div className="text-muted-foreground text-sm mt-2">Advertisement</div>
        </CardContent>
       </Card>
    </div>
  );
};

export default AdBanner;
