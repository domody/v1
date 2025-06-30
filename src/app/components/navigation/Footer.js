'use client';
import '@/app/styles/globals.css';
import { useEffect, useState } from 'react';

import { Menu } from 'react-feather';
import { Sun } from 'react-feather';
import { Moon } from 'react-feather';
import { Search } from 'react-feather';
import { Disc } from 'react-feather';
import { useRedirect } from '@/app/hooks/useRedirect';

const Footer = ({ redirected, runRedirect }) => {
  const [isMounted, setIsMounted] = useState(false);
  const date = new Date();

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDayOfWeek = daysOfWeek[date.getDay()];

  const handleLinkClick = (link) => {
    if (link) {
      runRedirect(link, true);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="container mt-24 flex flex-col items-center justify-center gap-x-2 gap-y-2 border-t border-neutral-400 py-8 text-sm font-semibold text-nero-600 sm:flex-row sm:gap-y-0 dark:border-neutral-950">
        <p>Dom Ody &#169; {new Date().getFullYear()}</p>
        <p className="hidden sm:block">&#x2022;</p>
        <div className="flex cursor-pointer">
          <p>Have a great</p>
          <p className="group relative ml-1 inline-block cursor-pointer">
            {currentDayOfWeek}!
            <span className="duration-250 absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 transform bg-teal-400 transition-transform ease-out group-hover:scale-x-100"></span>
          </p>
        </div>
        <p className="hidden sm:block">&#x2022;</p>
        <p
          className="cursor-pointer transition-all hover:text-nero-800 dark:hover:text-nero-300"
          onClick={() => handleLinkClick('/contact')}
        >
          Contact
        </p>
      </div>
    </>
  );
};

export default Footer;
