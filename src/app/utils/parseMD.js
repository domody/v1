import { CodeBlock } from '../components/information/CodeBlock';

let isInCodeBlock = false;
let codeBlockLanguage = '';
let codeBlockContent = [];

const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

export function parseMarkdown(line, index) {
  // Do not return empty lines unless in code block
  if (line.trim().length == 0 && !isInCodeBlock) {
    return null;
  }

  // Detect opening of a code block
  if (line.trim().match(/^```(\w*)$/) && !isInCodeBlock) {
    isInCodeBlock = true;
    codeBlockLanguage = line.replace(/^```/, '');
    codeBlockContent = [];
    return null; // Do not render this line
  }

  // Detect closing of a code block
  if (line.trim().match(/^```$/) && isInCodeBlock) {
    isInCodeBlock = false;
    const finalCodeBlock = (
      <CodeBlock
        key={index}
        title={'code'}
        lang={codeBlockLanguage.trim() || 'js'}
        code={codeBlockContent.join('\n')}
      />
    );
    codeBlockContent = [];
    return finalCodeBlock;
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
    );
  }
  if (line.match(/^### (.*)/)) {
    return (
      <h3 className="text-xl font-semibold" key={index}>
        {line.replace(/^### /, '')}
      </h3>
    );
  }

  // Bold Text
  if (line.match(/\*\*(.*)\*\*/)) {
    const new_line = parseMarkdown(line.replace(/\*\*(.*?)\*\*/, '$1'), index);

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

  // Link
  if (linkRegex.test(line)) {
    const newLine = line.replace(linkRegex, (match, text, url) => {
      return `<a href="${url}" class="underline hover:text-nero-50 hover:font-medium transition-all" target="_blank">${text}</a>`;
    });

    return <p key={index} dangerouslySetInnerHTML={{ __html: newLine }} />;
  }

  // Horizontal Rule
  if (line.match(/\-\-\-/)) {
    return <hr key={index} />;
  }

  // Default for normal text
  return <p key={index}>{line}</p>;
}
