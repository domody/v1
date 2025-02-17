'use client';
import React from 'react';
import { useRedirect } from '@/app/hooks/useRedirect';
import { ArrowUpRight } from 'react-feather';
import { cn } from '@/app/utils/cn';

const InternalLink = ({ children, link, runRedirect }) => {
  const handleLinkClick = (link) => {
    if (link) {
      runRedirect(link, true);
    }
  };

  return <div onClick={() => handleLinkClick()}>{children}</div>;
};

const ExternalLink = ({ children, className, link, runRedirect }) => {
  const handleLinkClick = () => {
    if (link) {
      runRedirect(link, false);
    }
  };

  return (
    <div
      className={cn("group flex w-auto cursor-pointer gap-x-0.5 transition-all -mr-1", className)}
      onClick={handleLinkClick}
    >
      <div className="relative flex border-b-teal-400">
        <div className="transition-all hover:text-nero-50">{children}</div>
        <span className="duration-250 absolute inset-x-0 bottom-0.5 h-px w-[calc(100%-5px)] origin-left scale-x-0 transform bg-nero-50 transition-transform ease-out group-hover:scale-x-100"></span>
        <ArrowUpRight
          strokeWidth={2.5}
          className="size-4 stroke-nero-300 transition-all group-hover:stroke-nero-50"
        />
      </div>
    </div>
  );
};

export { InternalLink, ExternalLink };
