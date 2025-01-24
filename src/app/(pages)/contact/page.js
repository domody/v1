'use client';
import { redirected, useRedirect } from '@/app/hooks/useRedirect';

import { IconBrandDiscord } from '@tabler/icons-react';

import Navbar from '@/app/components/navigation/Navbar';
import Footer from '@/app/components/navigation/Footer';

export default function Contact() {
  const { redirected, runRedirect } = useRedirect();
  return (
    <main
      className={`page-scrollbar scrollbar-light min-h-screen dark:scrollbar-dark h-screen w-screen overflow-x-hidden overflow-y-scroll transition-opacity duration-300 ${redirected ? 'opacity-0' : 'opacity-100'} `}
      // style={{
      //   background: `radial-gradient(150px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 70, 110, 0.10), transparent 80%)`,
      // }}
    >
      <Navbar redirected={redirected} runRedirect={runRedirect} />
      <div className="flex flex-col items-center h-full justify-between pt-44 font-normal text-nero-800 dark:text-nero-200">
        <div className="container w-full flex flex-col justify-start items-start gap-y-2">
        <p className="text-lg font-semibold">Contact</p>
          <p>discord: gomiooo</p>
          <p>mail: domody11@gmail.com</p>
        </div>

        <Footer />
      </div>
    </main>
  );
}
