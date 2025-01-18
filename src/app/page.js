'use client';
import { Inter } from 'next/font/google';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight,
  Twitter,
  Instagram,
  Linkedin,
  GitHub,
  Codepen,
} from 'react-feather';
import { Code, Book, Mail } from 'react-feather';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Container from './components/container';
import AnimatedText from './AnimatedText';
import projects from './projects.json';
import toggleTheme from './components/navbar';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [rand, setRand] = useState(1);

  const projectsLength = projects.projects.length;
  var [projectsCount, setProjectsCount] = useState(projectsLength);
  const projectsValRef = useRef(null);
  const aboutMe = projects.about_me.data;

  // Image file dir based on theme

  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'light',
  );

  useEffect(() => {
    const updateTheme = () => {
      setTheme(localStorage.theme || 'light');
    };

    updateTheme(); // Set initial theme
    window.addEventListener('storage', updateTheme); // Listen for theme changes

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

  return (
    <div
      className="w-screen h-screen overflow-y-scroll overflow-x-hidden page-scrollbar scrollbar-light dark:scrollbar-dark"
      // style={{
      //   background: `radial-gradient(150px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 70, 110, 0.10), transparent 80%)`,
      // }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p>Loading...</p> {/* Add a spinner or text */}
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex flex-col items-center font-normal justify-between pt-44 text-nero-800 dark:text-nero-200">
            <div className="w-full container">
              <div className="flex justify-start items-start relative w-full">
                <div className="flex flex-col justify-start items-start space-y-6 w-full select-none">
                  {/* <div className=" py-2 pl-8 pr-5 bg-lime-400/15 rounded-full text-sm flex justify-center items-center">
                    See Projects
                    <ArrowRight className="h-4 ml-2" />
                </div> */}
                  <div className="flex justify-start items-center space-x-4">
                    <Twitter />
                    <Instagram />
                    <Linkedin />
                    <GitHub />
                    <Codepen />
                  </div>
                  <h1 className="text-7xl font-bold">Dom Ody</h1>
                  {/* <h2 className="text-xl font-medium">Full-stack Developer</h2> */}
                  <div className="mt-8 flex justify-start items-center space-x-8">
                    <Book className="h-4 cursor-pointer hover:scale-125 transition-all" />
                    <Code className="h-5 cursor-pointer hover:scale-125 transition-all" />
                    <Mail className="h-4 cursor-pointer hover:scale-125 transition-all" />
                  </div>
                </div>

                <Image
                  className="absolute lg:-top-12 left-0 transfrom -translate-x-1/2 -z-10 lg:h-[50rem] select-none"
                  src={require(`./assets/gradients-${theme}/${rand}.png`)}
                  alt=""
                />
              </div>

              <div className="mt-24 w-full pb-16 flex flex-col justify-start items-start border-b border-neutral-400 dark:border-neutral-950">
                <div className="">
                  <p className="font-semibold text-lg">About Me</p>
                </div>
                <div className="w-full h-full py-4 flex flex-col items-start justify-start">
                  <AnimatedText loading={loading} text={aboutMe} />
                </div>
              </div>

              <div className="mt-24 w-full flex-col justify-start items-start">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg">Projects</p>
                  <p className="text-sm text-nero-700">
                    1 -{' '}
                    <span className="font-semibold ">
                      <input
                        className="w-12 py-0.5 text-center rounded-md bg-black/5 dark:bg-white/5 focus:outline-none focus:border focus:border-nero-300 dark:focus:border-nero-700 placeholder:text-nero-700"
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
                <div className="w-full h-full  projects-scrollbar mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 group">
                  {projects.projects
                    .slice(0, projectsCount)
                    .map((project, index) => (
                      <Container
                        key={project.id}
                        date={project.date}
                        title={project.title}
                        text={project.para}
                        tags={project.tags}
                        link={project.link}
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
          </main>{' '}
        </>
      )}
    </div>
  );
}
