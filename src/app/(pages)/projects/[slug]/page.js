'use client';
import { useParams } from 'next/navigation';
import { useRedirect } from '@/app/hooks/useRedirect';

import Navbar from '@/app/components/navigation/Navbar';
import Footer from '@/app/components/navigation/Footer';

import projectData from '@/app/project-data.json';

export default function Page() {
  const { slug } = useParams();
  const { redirected, runRedirect } = useRedirect();

  const decodedSlug = decodeURIComponent(slug);

  const project = projectData.projects.find(
    (project) => project.title === decodedSlug,
  );

  return (
    <main
      className={`page-scrollbar scrollbar-light dark:scrollbar-dark h-screen min-h-screen w-screen overflow-x-hidden overflow-y-scroll transition-opacity duration-300 ${redirected ? 'opacity-0' : 'opacity-100'} `}
      // style={{
      //   background: `radial-gradient(150px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 70, 110, 0.10), transparent 80%)`,
      // }}
    >
      <Navbar redirected={redirected} runRedirect={runRedirect} />
      <div className="flex h-full flex-col items-center justify-between pt-44 font-normal text-nero-800 dark:text-nero-200">
        <div className="container flex w-full flex-col items-start justify-start gap-y-2">
          <p> &rsaquo; Projects</p>
          <h2 className="text-3xl font-semibold">{project.title}</h2>
        </div>

        <Footer />
      </div>
    </main>
  );
}
