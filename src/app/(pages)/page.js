'use client';
import { useRef, useState, useEffect } from 'react';
import { useRedirect } from '../hooks/useRedirect';
import Image from 'next/image';

import { Instagram, GitHub } from 'react-feather';
import { IconBrandDiscord } from '@tabler/icons-react';
import { Code, Book, Mail } from 'react-feather';

import { IconButton } from '../components/cosmetic/IconButtons';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import ProjectCard from '../components/information/ProjectCard';
import AnimatedText from '../components/cosmetic/AnimatedText';

import projects from '@/app/project-data.json';

export default function Home() {
  const { redirected, runRedirect } = useRedirect();

  const [loading, setLoading] = useState(true);
  const [rand, setRand] = useState(1);

  const projectsLength = projects.projects.length;
  var [projectsCount, setProjectsCount] = useState(projectsLength);
  const projectsValRef = useRef(null);
  const aboutMe = projects.about_me.data;

  const [bgImage, setBgImage] = useState(null);

  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'light',
  );

  useEffect(() => {
    const updateTheme = () => {
      setTheme(localStorage.theme || 'light');
    };

    updateTheme();
    window.addEventListener('storage', updateTheme);

    return () => {
      window.removeEventListener('storage', updateTheme);
    };
  }, []);

  if (projectsCount > projectsLength) {
    projectsCount = projectsLength;
  }

  const handleChange = (event) => {
    var value = event.target.value;
    const max = projectsLength;

    setTimeout(() => {
      if (value > max) {
        value = max;
      } else if (value < 0) {
        value = 0;
      }
      setProjectsCount(value);
    }, 0);
  };

  useEffect(() => {
    const min = 1;
    const max = 6;
    const randomValue = min + Math.floor(Math.random() * max);
    setRand(randomValue);
    setLoading(false);
  }, []);

  useEffect(() => {
    const loadImage = async () => {
      const image = await import(`@/app/assets/gradients-light/${rand}.png`);
      setBgImage(image.default);
    };

    loadImage();
  }, [rand]);

  return (
    <main
      className={`page-scrollbar scrollbar-light dark:scrollbar-dark h-screen w-screen overflow-x-hidden overflow-y-scroll transition-opacity duration-300 ${redirected ? 'opacity-0' : 'opacity-100'} `}
      // style={{
      //   background: `radial-gradient(150px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 70, 110, 0.10), transparent 80%)`,
      // }}
    >
      {loading ? (
        <div className="flex h-full items-center justify-center bg-nero-950">
          <p className="text-nero-50">Loading...</p>{' '}
          {/* Add a spinner or text */}
        </div>
      ) : (
        <>
          <Navbar redirected={redirected} runRedirect={runRedirect} />
          <div className="flex flex-col items-center justify-between pt-44 font-normal text-nero-800 dark:text-nero-200">
            <div className="container w-full">
              <div className="relative flex w-full items-start justify-start">
                <div className="flex w-full flex-col items-start justify-start space-y-6">
                  {/* <div className=" py-2 pl-8 pr-5 bg-lime-400/15 rounded-full text-sm flex justify-center items-center">
                    See Projects
                    <ArrowRight className="h-4 ml-2" />
                </div> */}
                  <div className="flex items-center justify-start space-x-4">
                    <IconButton link="https://www.instagram.com/dom.ody/">
                      <Instagram />
                    </IconButton>

                    <IconButton link="https://github.com/domody">
                      <GitHub />
                    </IconButton>

                    <IconButton link="https://discordapp.com/users/1074284797217734717">
                      <IconBrandDiscord />
                    </IconButton>
                  </div>
                  <h1 className="text-7xl font-bold">Dom Ody</h1>
                  {/* <h2 className="text-xl font-medium">Full-stack Developer</h2> */}
                  <div className="mt-8 flex items-center justify-start space-x-8">
                    <Book className="h-4 cursor-pointer transition-all hover:scale-125" />
                    <Code className="h-5 cursor-pointer transition-all hover:scale-125" />
                    <Mail className="h-4 cursor-pointer transition-all hover:scale-125" />
                  </div>
                </div>
                {bgImage && (
                  <Image
                    className="transfrom absolute left-0 -z-10 -translate-x-1/2 lg:-top-48 lg:h-[50rem]"
                    src={bgImage}
                    alt=""
                    layout="intrinsic"
                  />
                )}
              </div>
              <div className="mt-24 flex w-full flex-col items-start justify-start border-b border-neutral-400 pb-16 dark:border-neutral-950">
                <div className="">
                  <p className="text-lg font-semibold">About Me</p>
                </div>
                <div className="flex h-full w-full flex-col items-start justify-start py-4">
                  <AnimatedText loading={loading} text={aboutMe} />
                </div>
              </div>

              <div className="mt-24 w-full flex-col items-start justify-start">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">Projects</p>
                  <p className="text-sm text-nero-700">
                    1 -{' '}
                    <span className="font-semibold">
                      <input
                        className="w-12 rounded-md bg-black/5 py-0.5 text-center placeholder:text-nero-700 focus:border focus:border-nero-300 focus:outline-none dark:bg-white/5 dark:focus:border-nero-700"
                        min={1}
                        max={projectsLength}
                        name=""
                        id="projectsVal"
                        ref={projectsValRef}
                        type="number"
                        value={projectsCount}
                        onChange={handleChange}
                      />
                    </span>{' '}
                    of {projectsLength}
                  </p>
                </div>
                <div className="projects-scrollbar group mt-8 grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2">
                  {projects.projects
                    .slice(0, projectsCount)
                    .map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        date={project.date}
                        title={project.title}
                        text={project.para}
                        tags={project.tags}
                        link={project.link}
                        repo={project.repo}
                        redirected={redirected}
                        runRedirect={runRedirect}
                      />
                    ))}
                </div>
                {/* <div className="w-full flex justify-center items-center mt-8">
              <button className="mt-2 px-4 pt-5 pb-3 bg-white/[0.02] rounded-full flex flex-col justify-center items-center text-xs">
                <ArrowDown className='animate animate-bounce h-4 w-4'/>
              </button>
            </div> */}
              </div>
            </div>

            <Footer />
          </div>
        </>
      )}
    </main>
  );
}
