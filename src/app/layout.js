import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
// import useRadialBlur from './radialBlur';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dom Ody',
  description: 'Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-neutral-200 dark:bg-nero-950">
      <body
        className={`overflow-x-hidden  ${inter.className} overflow-y-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
