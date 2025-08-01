'use client';
import { useParams } from 'next/navigation';
import { useRedirect } from '@/app/hooks/useRedirect';

import Navbar from '@/app/components/navigation/Navbar';
import Footer from '@/app/components/navigation/Footer';

import projectData from '@/app/project-data.json';
import { GitHub, Link, ArrowUpRight } from 'react-feather';
import { useState, useEffect } from 'react';
import { CodeBlock } from '@/app/components/information/CodeBlock';
import { parseMarkdown } from '@/app/utils/parseMD';

import { InternalLink, ExternalLink } from '@/app/components/navigation/Links';

export default function Page() {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);

  const project = projectData.projects.find(
    (project) => project.title === decodedSlug,
  );

  const { redirected, runRedirect } = useRedirect();

  const [mdContent, setMdContent] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    const fetchMD = async () => {
      try {
        const response = await fetch(`/api/projects/${decodedSlug}`);
        const data = await response.json();
        setMdContent(data.content);
      } catch (error) {
        throw new Error('Error fetching markdown content: ', error);
      }
    };

    fetchMD();
  }, []);

  useEffect(() => {
    if (mdContent != null) {
      const html = parseLines(mdContent.content.content);
      setHtmlContent(html);
    }
  }, [mdContent]);

  function parseLines(md) {
    const lines = md.split('\n');
    return lines.map((line, index) => {
      return parseMarkdown(line, index, runRedirect);
    });
  }

  const handleRedirect = (_link, internal = false) => {
    if (_link) {
      runRedirect(_link, internal);
    }
  };

  return (
    <main
      className={`page-scrollbar scrollbar-light dark:scrollbar-dark h-screen min-h-screen w-screen overflow-x-hidden overflow-y-scroll transition-opacity duration-300 ${redirected ? 'opacity-0' : 'opacity-100'} `}
      // style={{
      //   background: `radial-gradient(150px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 70, 110, 0.10), transparent 80%)`,
      // }}
    >
      <Navbar redirected={redirected} runRedirect={runRedirect} />
      <div className="flex h-full flex-col items-center justify-between pt-32 font-normal text-nero-800 dark:text-nero-200">
        <div className="container flex w-full flex-col items-start justify-start gap-y-2">
          <p
            className="-mb-2 cursor-pointer text-sm text-nero-400 transition-all dark:hover:text-nero-200"
            onClick={() => handleRedirect(`/`, true)}
          >
            Projects &rsaquo;
          </p>
          <div className="flex items-center gap-x-4">
            <ExternalLink
              link={project.link}
              runRedirect={runRedirect}
              className="text-3xl font-semibold"
            >
              {project.title}
            </ExternalLink>
            <div className="flex gap-x-2">
              <GitHub
                strokeWidth={2.5}
                className="size-6 cursor-pointer transition-all hover:scale-105 dark:stroke-nero-400 dark:hover:stroke-nero-50"
                onClick={() =>
                  handleRedirect(`https://github.com${project.repo}`)
                }
              />
              {/* <Link
                strokeWidth={2.5}
                className="size-[26px] cursor-pointer transition-all hover:scale-105 dark:stroke-nero-400 dark:hover:stroke-nero-50"
                onClick={() =>
                  handleRedirect(project.link, String(project.link) === '/')
                }
              /> */}
            </div>
          </div>
          <div className="flex flex-wrap">
            {project.tags.map((tag) => (
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
          <div className="mt-4 flex w-full flex-col gap-y-4">
            {htmlContent ? (
              <>{htmlContent}</>
            ) : (
              <p className="mx-auto mt-32 text-nero-700 dark:text-nero-300">
                Loading...
              </p>
            )}
          </div>
        </div>
        <Footer redirected={redirected} runRedirect={runRedirect} />
      </div>
    </main>
  );
}
