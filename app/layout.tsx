import { Suspense } from 'react';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Testamento',
  description: 'Create You will',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
        <Suspense fallback={"loading..."}>
          <div className='bg-background'>{children}</div>
        </Suspense>
      </body>
    </html>
  );
}