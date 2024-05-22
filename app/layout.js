// import { Lato } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

// const inter = Lato({ subsets: ['latin'] });

export const metadata = {
  title: 'Testamento',
  description: 'Create You will',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head><link
  rel="icon"
  href="/icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/></head>
      <body >
        {/* <Navbar /> */}
        <Suspense fallback={"loading..."}>
        <div className='bg-background'>{children}</div>
        {/* <Footer /> */}
        </Suspense>
      </body>
    </html>
  );
}
