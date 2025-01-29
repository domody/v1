'use client';
import '@/app/styles/globals.css';

import { useEffect, useState } from 'react';
import { Menu } from 'react-feather';
import { Sun } from 'react-feather';
import { Moon } from 'react-feather';

import projectData from '@/app/project-data.json';

const Navbar = ({ redirected, runRedirect }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'light',
  );

  const [opened, setOpened] = useState(false)

  const toggleOpen = () => {
    setOpened(!opened)
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

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
      <div className="fixed left-0 top-0 z-50 w-screen py-4 px-2 sm:px-0">
        <div className="backdrop-blur-lg container mx-auto flex h-12 items-center justify-between rounded-xl bg-[#d0d0d0]/50 dark:bg-[#0f0f0f]/50">
          <div className="flex h-full items-center text-nero-800 dark:text-white">
            {/* <Disc /> */}
          </div>
          <div className="flex h-full items-center justify-start text-nero-800 dark:text-white">
            <div className="mr-8 hidden h-full items-center justify-start space-x-8 text-sm font-medium md:flex">
              {projectData.links.nav.length > 0 &&
                projectData.links.nav.map((link) => {
                  return (
                    <p
                      key={link.id}
                      onClick={() => handleLinkClick(link.link)}
                      className="cursor-pointer"
                    >
                      {link.title}
                    </p>
                  );
                })}
            </div>
            <div className="flex h-full items-center justify-start space-x-3">
              <div
                className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-nero-300/50 p-1.5 dark:bg-nero-800/50"
                onClick={toggleTheme}
              >
                {theme === 'light' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </div>
              <div className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-nero-300/50 p-1.5 sm:hidden dark:bg-nero-800/50" onClick={toggleOpen}>
                <Menu className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        <div className={`backdrop-blur-lg ml-auto absolute right-2 top-[4.25rem] flex flex-col items-start w-32 overflow-hidden justify-between rounded-xl bg-[#d0d0d0]/50 dark:bg-[#0f0f0f]/50 sm:hidden transition-all origin-top-right ${opened ? "opacity-100 scale-100" : "!py-0 opacity-0 scale-50"}`}>
          {projectData.links.nav.length > 0 &&
            projectData.links.nav.map((link) => {
              return (
                <div                   
                  key={link.id} 
                  className='rounded-md focus:bg-[#d0d0d0]/50 focus:dark:bg-[#0f0f0f]/50 w-full py-2 px-4'
                >
                  <p
                  onClick={() => handleLinkClick(link.link)}
                  className="cursor-pointer"
                  >
                    {link.title}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
