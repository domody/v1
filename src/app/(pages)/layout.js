import '@/app/styles/globals.css';
import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dom Ody',
  description: 'Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-nero-100 dark:bg-nero-950">
      <body
        className={`overflow-x-hidden ${inter.className} fade-in overflow-y-hidden text-nero-800 selection:bg-nero-300 dark:text-nero-200 dark:selection:bg-nero-900`}
      >
          {children}
      </body>
    </html>
  );
}
