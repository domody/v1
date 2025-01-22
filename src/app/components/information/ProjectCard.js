import '@/app/styles/globals.css';
import React from 'react';

import { ArrowUpRight, GitHub } from 'react-feather';

const ProjectCard = ({ date, title, text, tags, link, repo, redirected, runRedirect }) => {
  const shouldOpenInNewTab = link !== '/';

  const openProjectSite = () => {
    if (link) {
      runRedirect(link)
    }
  };

  return (
    <>
      <div
        className="group/container relative animate-fade transition-all hover:!scale-[1.02] hover:!opacity-100 group-hover:scale-[0.99] group-hover:opacity-50"
        onClick={openProjectSite}
      >
        <div className="z-20 flex cursor-pointer flex-col items-start justify-start rounded-lg bg-black/[0.02] p-6 text-nero-800 blur-none transition-all hover:bg-neutral-300 dark:bg-white/[0.005] dark:text-nero-200 hover:dark:bg-[#040404]">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-xl font-semibold">{title}</h1>
              <p className="text-xs text-nero-800">{date}</p>
            </div>
            <div className="flex items-center justify-center gap-x-2">
              <a
                target={'_blank'}
                rel={'noopener noreferrer'}
                href={`https://github.com${repo}`}
              >
                <GitHub
                  strokeWidth={2.5}
                  className="size-4 origin-center text-nero-400 transition-all hover:size-5 hover:text-nero-600 dark:hover:text-nero-100"
                />
              </a>

              <ArrowUpRight className="text-nero-400 transition-all group-hover/container:scale-125 group-hover/container:text-nero-600 dark:group-hover/container:text-nero-100" />
            </div>
          </div>

          <p className="font-base mt-4 text-sm text-nero-500 dark:text-nero-400">
            {text}
          </p>

          <div className="mt-6 flex w-full flex-wrap items-start justify-start">
            {tags.map((tag) => (
              <div
                className={`mr-1.5 mt-2 flex items-start justify-end rounded-full px-3 py-2 ${tag === 'In Progress' ? 'bg-amber-700/50 dark:bg-amber-950/50' : 'bg-teal-700/50 dark:bg-teal-950/50'}`}
                key={tag}
              >
                <p
                  className={`text-xs font-semibold ${tag === 'In Progress' ? 'text-amber-200 dark:text-amber-300' : 'text-teal-200 dark:text-teal-300'}`}
                >
                  {tag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
