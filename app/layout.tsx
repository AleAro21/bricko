import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import AmplifyProvider from '@/components/providers/AmplifyProvider';
import { UserProvider } from '@/context/UserContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Testamento',
  description: 'Create Your Will',
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
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <AmplifyProvider>
          <UserProvider>
            <Suspense fallback="loading...">
              <div className="bg-background">{children}</div>
            </Suspense>
          </UserProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}