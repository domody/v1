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

import data from '@/app/project-data.json';

import { usePathname } from 'next/navigation';

export default function Home() {
  const { redirected, runRedirect } = useRedirect();

  const [loading, setLoading] = useState(true);
  const [rand, setRand] = useState(null);

  var [projectsCount, setProjectsCount] = useState(data.projects.length);
  const projectsValRef = useRef(null);
  const aboutMe = data.about_me.data;

  const [bgImage, setBgImage] = useState(null);

  // const [theme, setTheme] = useState(
  //   typeof window !== 'undefined' ? localStorage.theme : 'light',
  // );

  // useEffect(() => {
  //   const updateTheme = () => {
  //     setTheme(localStorage.theme || 'light');
  //   };

  //   updateTheme();
  //   window.addEventListener('storage', updateTheme);

  //   return () => {
  //     window.removeEventListener('storage', updateTheme);
  //   };
  // }, []);

  if (projectsCount > data.projects.length) {
    projectsCount = data.projects.length;
  }

  const handleChange = (event) => {
    var value = event.target.value;
    const max = data.projects.length;

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
      if (rand != null) {
        const image = await import(`@/app/assets/gradients-light/${rand}.png`);
        setBgImage(image.default);
      }
    };

    loadImage();
  }, [rand]);

  // {Math.floor((new Date() - new Date("2007-02-06")) / (1000 * 60 * 60 * 24 * 365.25))}
  return (
    <main
    className={`page-scrollbar scrollbar-light dark:scrollbar-dark h-screen min-h-screen w-screen overflow-x-hidden overflow-y-scroll transition-opacity duration-300 ${redirected ? 'opacity-0' : 'opacity-100'} `}
    // style={{
    //   background: `radial-gradient(150px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 70, 110, 0.10), transparent 80%)`,
    // }}
  >
    <Navbar redirected={redirected} runRedirect={runRedirect} />
    <div className="flex h-full flex-col items-center justify-between pt-32 font-normal text-nero-800 dark:text-nero-200">
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
          <h1 className="text-6xl font-bold sm:text-7xl">Dom Ody</h1>
          {/* <h2 className="text-xl font-medium">Developer</h2> */}
          <div className="mt-8 flex items-center justify-start space-x-8">
            <Book className="h-4 cursor-pointer transition-all hover:scale-125" />
            <Code className="h-5 cursor-pointer transition-all hover:scale-125" />
            <Mail className="h-4 cursor-pointer transition-all hover:scale-125" />
          </div>
        </div>
        {bgImage && (
          <Image
            className={`transfrom absolute left-1/4 sm:left-0 -z-10  -top-56 lg:-top-72 !max-w-[55rem] !h-auto md:!max-w-full ${rand == 1 || rand == 2 || rand == 4 || rand == 5 ? "-translate-x-[63%] sm:-translate-x-1/2" : "-translate-x-1/2"}`}
            src={bgImage}
            alt=""
            layout="intrinsic"
          />
        )}
      </div>
      <div className="mt-24 flex w-full flex-col items-start justify-start border-b border-neutral-500/30 pb-16 dark:border-neutral-900/30">
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
                max={data.projects.length}
                name=""
                id="projectsVal"
                ref={projectsValRef}
                type="number"
                value={projectsCount}
                onChange={handleChange}
              />
            </span>{' '}
            of {data.projects.length}
          </p>
        </div>
        <div className="projects-scrollbar group mt-8 grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {data.projects.slice(0, projectsCount).length > 0 ? (
            data.projects
              .slice(0, projectsCount)
              .map((project, index) => (
                <ProjectCard
                  key={index}
                  date={project.date}
                  title={project.title}
                  text={project.content}
                  tags={project.tags}
                  link={project.link}
                  repo={project.repo}
                  redirected={redirected}
                  runRedirect={runRedirect}
                />
              ))
          ) : (
            <p className="mx-auto pb-2 pt-16 sm:col-span-2 dark:text-nero-400">
              :&#93;
            </p>
          )}
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
    </main>
  );
}
