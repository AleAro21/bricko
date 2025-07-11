import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import AmplifyProvider from '@/components/providers/AmplifyProvider';
import { UserProvider } from '@/context/UserContext';
import { TestamentProvider } from '@/context/TestamentContext';
import { ContactProvider } from '@/context/ContactContext';
import LoadingFallback from '@/components/common/LoadingFallback';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bricko',
  description: 'Bienes tokenizados',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/B.png"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        <AmplifyProvider>
          <UserProvider>
            <TestamentProvider>
              <ContactProvider>
                <Suspense fallback={<LoadingFallback />}>
                  <div className="bg-background">{children}</div>
                </Suspense>
              </ContactProvider>
            </TestamentProvider>
          </UserProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}