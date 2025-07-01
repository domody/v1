import '@/app/styles/globals.css';
import React from 'react';

import { Maximize2, Link, GitHub } from 'react-feather';

const ProjectCard = ({
  date,
  title,
  text,
  tags,
  link,
  repo,
  redirected,
  runRedirect,
}) => {

  const handleRedirect = (_link, internal = false) => {
    if (_link) {
      runRedirect(_link, internal);
    }
  };

  return (
    <>
      <div
        className={`group/container just-start z-20 flex animate-fade cursor-pointer items-start rounded-lg bg-black/[0.02] p-6 text-nero-800 blur-none transition-all hover:!scale-[1.02] hover:bg-neutral-300 hover:!opacity-100 group-hover:scale-[0.99] group-hover:opacity-50 dark:bg-white/[0.005] dark:text-nero-200 hover:dark:bg-[#040404]`}
        onClick={() => handleRedirect(`/projects/${title}`, true)}
      >
        <div className="flex w-full flex-col items-start justify-start">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-xl font-semibold">{title}</h1>
              <p className="text-xs text-nero-800">{date}</p>
            </div>
            <div className="flex items-center justify-center gap-x-2">
              <GitHub
                strokeWidth={2.5}
                className="peer/icons size-4 text-nero-400 transition-all hover:size-5 hover:text-nero-600 dark:hover:text-nero-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRedirect(`https://github.com${repo}`);
                }}
              />
              <Link
                strokeWidth={2.5}
                className="peer/icons size-4 text-nero-400 transition-all hover:size-5 hover:text-nero-600 dark:hover:text-nero-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRedirect(link);
                }}
              />
              <Maximize2 className="peer/icons size-4 text-nero-400 transition-all group-hover/container:scale-125 group-hover/container:text-nero-600 peer-hover/icons:scale-100 dark:group-hover/container:text-nero-100" />
            </div>
          </div>

          <p className="font-base mt-4 line-clamp-4 text-sm text-nero-600 dark:text-nero-400">
            {text}
          </p>

          <div className="mt-6 flex w-full flex-wrap items-start justify-start">
            {tags.map((tag) => (
              <div
                className={`mr-1.5 mt-2 flex items-center justify-center rounded-full px-3 py-2 ${tag === 'In Progress' ? 'bg-amber-700/50 dark:bg-amber-950/50' : 'bg-teal-700/50 dark:bg-teal-950/50'}`}
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
