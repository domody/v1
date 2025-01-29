'use client';
import { useParams } from 'next/navigation';
import { useRedirect } from '@/app/hooks/useRedirect';

import Navbar from '@/app/components/navigation/Navbar';
import Footer from '@/app/components/navigation/Footer';

import projectData from '@/app/project-data.json';
import { GitHub, Link } from 'react-feather';
import { useState, useEffect } from 'react';
import { CodeBlock } from '@/app/components/information/CodeBlock';

const code = `
function MyComponent(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>This is an example React component.</p>
    </div>
  );
}
`;

const markdownFromApi =
  "\n\n### Title\nSome text\n```js\nconsole.log('hi');\n```";
const markdownEscaped = markdownFromApi.replace(/`/g, '`').trim(); // Escape backticks

export default function Page() {
  const { slug } = useParams();
  const { redirected, runRedirect } = useRedirect();
  const [htmlContent, setHtmlContent] = useState(null);

  const decodedSlug = decodeURIComponent(slug);

  const project = projectData.projects.find(
    (project) => project.title === decodedSlug,
  );

  const handleRedirect = (_link, internal = false) => {
    console.log(_link);
    if (_link) {
      runRedirect(_link, internal);
    }
  };

  useEffect(() => {
    const html = parseLines(markdownEscaped);
    setHtmlContent(html);
  }, []);

  function parseLines(md) {
    const lines = md.split('\n');
    return lines.map((line, index) => {
      return parseMarkdown(line, index);
    });
  }

  let isInCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockContent = [];

  function parseMarkdown(line, index) {
    // Detect closing of a code block
    if (line.match(/^```$/) && isInCodeBlock) {
      isInCodeBlock = false;
      const finalCodeBlock = (
        <CodeBlock
          key={index}
          title={codeBlockLanguage || 'code'}
          code={codeBlockContent.join('\n')}
        />
      );
      codeBlockContent = [];
      return finalCodeBlock;
    }

    // Detect opening of a code block
    if (line.match(/^```(\w*)$/) && isInCodeBlock == false) {
      isInCodeBlock = true;
      codeBlockLanguage = line.replace(/^```/, '');
      codeBlockContent = [];
      return null; // Do not render this line
    }

    // Accumulate code lines if inside a code block
    if (isInCodeBlock) {
      codeBlockContent.push(line);
      return null; // Do not render code lines separately
    }

    // Headings 1 -> 3
    if (line.match(/^# (.*)/)) {
      return (
        <h1 className="text-5xl" key={index}>
          {line.replace(/^# /, '')}
        </h1>
      );
    }
    if (line.match(/^## (.*)/)) {
      return (
        <h2 className="text-3xl" key={index}>
          {line.replace(/^## /, '')}
        </h2>
      ); // Use your H2 component
    }
    if (line.match(/^### (.*)/)) {
      return (
        <h3 className="text-2xl font-semibold" key={index}>
          {line.replace(/^### /, '')}
        </h3>
      );
    }

    // Bold Text
    if (line.match(/\*\*(.*)\*\*/)) {
      const new_line = parseMarkdown(
        line.replace(/\*\*(.*?)\*\*/, '$1'),
        index,
      );

      return (
        <strong key={index}>{final_line.replace(/\*\*(.*?)\*\*/, '$1')}</strong>
      );
    }

    // Italic Text
    if (line.match(/\*(.*)\*/)) {
      return <i key={index}>{line.replace(/\*(.*?)\*/, '$1')}</i>;
    }

    if (line.match(/\_(.*)\_/)) {
      return <i key={index}>{line.replace(/\_(.*?)\_/, '$1')}</i>;
    }

    // Strikethrough
    if (line.match(/\~\~(.*)\~\~/)) {
      return <s key={index}>{line.replace(/\~\~(.*?)\~\~/, '$1')}</s>;
    }

    // Horizontal Rule
    if (line.match(/\-\-\-/)) {
      return <hr key={index} />;
    }

    console.log(index, line)
    // Default for normal text
    return <p key={index}>{line}</p>;
  }

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
            <h2 className="text-3xl font-semibold">{project.title}</h2>
            <div className="flex gap-x-2">
              <GitHub
                strokeWidth={2.5}
                className="size-[26px] cursor-pointer transition-all hover:scale-105 dark:stroke-nero-400 dark:hover:stroke-nero-50"
                onClick={() =>
                  handleRedirect(`https://github.com${project.repo}`)
                }
              />
              <Link
                strokeWidth={2.5}
                className="size-[26px] cursor-pointer transition-all hover:scale-105 dark:stroke-nero-400 dark:hover:stroke-nero-50"
                onClick={() =>
                  handleRedirect(project.link, String(project.link) === '/')
                }
              />
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
            <p>
              This is an example code block with a{' '}
              <span
                className="cursor-pointer underline"
                onClick={() =>
                  handleRedirect(project.link, String(project.link) === '/')
                }
              >
                link
              </span>
              .
            </p>
            <p>
              I still need to update the code block highlighting for light mode,
              it doesnt match and fails contrast test to an unbeliavable extent.
            </p>
            <CodeBlock title={'app.js'} code={code} />
            {htmlContent}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
