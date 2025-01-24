import '@/app/styles/globals.css';
import { Menu } from 'react-feather';
import { Sun } from 'react-feather';
import { Moon } from 'react-feather';
import { Search } from 'react-feather';
import { Disc } from 'react-feather';

const Footer = () => {
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

  return (
    <>
      <div className="container mt-24 flex items-center justify-center space-x-2 border-t border-neutral-400 py-8 text-sm font-semibold text-nero-600 dark:border-neutral-950">
        <h1>Dom Ody &#169; {new Date().getFullYear()}</h1>
        <h1>&#x2022;</h1>
        <div className="flex cursor-pointer">
          <h1>Have a great</h1>
          <h1 className="group relative ml-1 inline-block cursor-pointer">
            {currentDayOfWeek}!
            <span className="duration-250 absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 transform bg-teal-400 transition-transform ease-out group-hover:scale-x-100"></span>
          </h1>
        </div>
        <h1>&#x2022;</h1>
        <a href="">Contact</a>
      </div>
    </>
  );
};

export default Footer;
