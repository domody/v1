import '../globals.css';
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
      <div className="container mt-24 py-8 border-t border-neutral-400 dark:border-neutral-950 flex justify-center items-center space-x-2 text-sm font-semibold text-nero-600">
        <h1>Dom Ody &#169; 2024</h1>
        <h1>&#x2022;</h1>
        <div className="cursor-pointer flex">
          <h1>Have a great</h1>
          <h1 className="cursor-pointer group relative inline-block ml-1">
            {currentDayOfWeek}!
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-teal-400 transform origin-right scale-x-0 transition-transform duration-250 ease-out group-hover:scale-x-100"></span>
          </h1>
        </div>
        <h1>&#x2022;</h1>
        <a href="">Contact</a>
      </div>
    </>
  );
};

export default Footer;
