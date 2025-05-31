
'use client';

import { Button } from '@/components/ui/button';
import { Camera, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Camera className="h-16 w-16 text-red-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              We're sorry, but something unexpected happened. Please try again.
            </p>
            <div className="space-y-4">
              <Button onClick={reset} size="lg">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
