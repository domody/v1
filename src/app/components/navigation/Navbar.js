import '@/app/styles/globals.css';

import { useEffect, useState } from 'react';
import { Menu } from 'react-feather';
import { Sun } from 'react-feather';
import { Moon } from 'react-feather';

import data from '@/app/project-data.json';

const Navbar = ({ redirected, runRedirect }) => {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'light',
  );

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

  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-screen py-4">
        <div className="container mx-auto flex h-12 items-center justify-between rounded-xl bg-[#d0d0d0]/50 backdrop-blur-xs dark:bg-[#0f0f0f]/50">
          <div className="flex h-full items-center text-nero-800 dark:text-white">
            {/* <Disc /> */}
          </div>
          <div className="flex h-full items-center justify-start text-nero-800 dark:text-white">
            <div className="mr-8 hidden h-full items-center justify-start space-x-8 text-sm font-medium md:flex">
              {data.links.length > 0 &&
                data.links.map((link) => {
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
                className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-nero-300 p-1.5 dark:bg-nero-800"
                onClick={toggleTheme}
              >
                {theme === 'light' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </div>
              <div className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-nero-300 p-1.5 sm:hidden dark:bg-nero-800">
                <Menu className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
