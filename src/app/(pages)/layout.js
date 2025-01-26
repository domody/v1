'use client';
import '@/app/styles/globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { useRedirect } from '../hooks/useRedirect';
// import useRadialBlur from './radialBlur';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Dom Ody',
//   description: 'Portfolio',
// };

export default function RootLayout({ children }) {
  const { redirected, runRedirect } = useRedirect();
  return (
    <html lang="en" className="bg-nero-100 dark:bg-nero-950">
      <body
        className={`overflow-x-hidden ${inter.className} fade-in overflow-y-hidden text-nero-800 selection:bg-nero-300 dark:text-nero-200 dark:selection:bg-nero-900`}
      >
        <main
          className={`page-scrollbar scrollbar-light dark:scrollbar-dark h-screen w-screen overflow-x-hidden overflow-y-scroll transition-opacity duration-300 ${redirected ? 'opacity-0' : 'opacity-100'} `}
          // style={{
          //   background: `radial-gradient(150px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 70, 110, 0.10), transparent 80%)`,
          // }}
        >
          <div className="flex min-h-screen flex-col items-center justify-between pt-44 font-normal">
            <Navbar redirected={redirected} runRedirect={runRedirect} />

            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
