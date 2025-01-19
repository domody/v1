'use client';
import '../globals.css';
import { useEffect, useState } from 'react';
import { Menu } from 'react-feather';
import { Sun } from 'react-feather';
import { Moon } from 'react-feather';
import { Search } from 'react-feather';
import { Disc } from 'react-feather';

const Navbar = () => {
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

  return (
    <>
      <div className="w-screen fixed z-50 top-0 left-0 py-4">
        <div
          className="container h-12 flex justify-between items-center mx-auto rounded-xl bg-[#d0d0d0]/50 dark:bg-[#0f0f0f]/50 backdrop-blur-sm"
        >
          <div className="h-full text-nero-800 dark:text-white flex items-center">
            <Disc />
          </div>
          <div className="h-full flex justify-start items-center text-nero-800 dark:text-white">
            <div className="hidden md:flex h-full justify-start items-center text-sm font-medium space-x-8 mr-8">
              <a href="/">Home</a>
              {/* <a>ABOUT ME</a>
              <p>PROJECTS</p> */}
              <p>Contact</p>
            </div>
            <div className="h-full flex justify-start items-center space-x-3">
              <div
                className="bg-nero-300 dark:bg-nero-800 rounded-full flex justify-center items-center aspect-square p-1.5 cursor-pointer"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
              <div className="md:hidden bg-nero-300 dark:bg-nero-800 rounded-full flex justify-center items-center aspect-square h-full p-2">
                <Menu className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
