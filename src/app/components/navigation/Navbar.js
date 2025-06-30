'use client';
import '@/app/styles/globals.css';

import { useEffect, useState, useRef } from 'react';
import { Menu } from 'react-feather';
import { Sun } from 'react-feather';
import { Moon } from 'react-feather';
import { Terminal } from 'react-feather';

import projectData from '@/app/project-data.json';

const Navbar = ({ redirected, runRedirect }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'dark',
  );
  const [menuOpened, setMenuOpened] = useState(false);
  const menuDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(event.target)
      ) {
        setMenuOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };

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
      <div className="fixed left-0 top-0 z-50 w-screen px-2 py-4 sm:px-0">
        <div className="container mx-auto flex h-12 items-center justify-between rounded-xl bg-[#d0d0d0]/50 backdrop-blur dark:bg-[#0f0f0f]/50">
          <div className="flex h-full items-center text-nero-800 dark:text-white">
            <div
              className="flex cursor-pointer items-center justify-center rounded bg-black/5 p-1.5 dark:bg-white/5"
              onClick={() => handleLinkClick('/')}
            >
              <Terminal className="size-4" />
            </div>
          </div>
          <div className="flex h-full items-center justify-start text-nero-800 dark:text-white">
            <div className="mr-8 hidden h-full items-center justify-start space-x-8 text-sm font-medium sm:flex">
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
                className="flex aspect-square cursor-pointer items-center justify-center rounded bg-black/5 p-1.5 dark:bg-white/5"
                onClick={toggleTheme}
              >
                {theme === 'light' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </div>
              <div
                className={`flex aspect-square cursor-pointer items-center justify-center rounded bg-black/5 p-1.5 sm:hidden dark:bg-white/5 ${menuOpened ? 'blur-[1px]' : ''}`}
                onClick={toggleMenuOpen}
              >
                <Menu className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={menuDropdownRef}
          className={`absolute right-2 top-[4.25rem] ml-auto flex w-36 origin-top-right flex-col items-start justify-between overflow-hidden rounded-xl bg-[#d0d0d0]/50 backdrop-blur transition-all sm:hidden dark:bg-[#0f0f0f]/50 ${menuOpened ? 'scale-100 opacity-100' : 'scale-50 !py-0 opacity-0'}`}
        >
          {projectData.links.nav.length > 0 &&
            projectData.links.nav.map((link) => {
              return (
                <div
                  key={link.id}
                  className="w-full rounded-md px-4 py-2 focus:bg-[#d0d0d0]/50 focus:dark:bg-[#0f0f0f]/50"
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
