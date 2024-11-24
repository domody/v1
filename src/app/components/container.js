import '../globals.css';
import React from 'react';
import { ArrowUpRight } from 'react-feather';

const Container = ({ date, title, text, tags, link }) => {
  const shouldOpenInNewTab = link !== '/';

  return (
    <>
      <a
        className="relative group/container transition-all animate-fade hover:!opacity-100 group-hover:opacity-50 hover:!scale-[1.02] group-hover:scale-[0.99]"
        href={link}
        target={shouldOpenInNewTab ? '_blank' : undefined}
        rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}
      >
        <div className="p-6 text-nero-800 dark:text-nero-200 blur-none rounded-lg cursor-pointer z-20 transition-all flex flex-col justify-start items-start bg-black/[0.02] dark:bg-white/[0.005] hover:bg-neutral-300 hover:dark:bg-[#040404]">
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col justify-start items-start">
              <h1 className="font-semibold text-xl">{title}</h1>
              <p className="text-xs text-nero-800">{date}</p>
            </div>
            <div className="flex items-start">
              <ArrowUpRight className="group-hover/container:scale-125 text-nero-400 group-hover/container:text-nero-600  dark:group-hover/container:text-nero-100 transition-all" />
            </div>
          </div>

          <p className="text-sm font-base text-nero-500 dark:text-nero-400 mt-4">
            {text}
          </p>

          <div className="flex justify-start items-start mt-6 w-full flex-wrap">
            {tags.map((tag) => (
              <div
                className="py-2 px-3 rounded-full bg-teal-700/50 dark:bg-teal-950/50 flex justify-end items-start mr-1.5 mt-2"
                key={tag}
              >
                <p className="text-xs text-teal-200 dark:text-teal-300 font-semibold">
                  {tag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </a>
    </>
  );
};

export default Container;
