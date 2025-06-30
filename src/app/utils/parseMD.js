import { CodeBlock } from '../components/information/CodeBlock';
import { ExternalLink } from '../components/navigation/Links';
let isInCodeBlock = false;
let codeBlockLanguage = '';
let codeBlockContent = [];

const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

export function parseMarkdown(line, index, runRedirect) {
  console.log(index);
  // Codeblocks
  if (line.trim().length == 0 && !isInCodeBlock) {
    return null;
  }

  if (line.trim().match(/^```(\w*)$/) && !isInCodeBlock) {
    isInCodeBlock = true;
    codeBlockLanguage = line.replace(/^```/, '');
    codeBlockContent = [];
    return null;
  }

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

  if (isInCodeBlock) {
    codeBlockContent.push(line);
    return null;
  }

  // Images
  const imageMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const alt = imageMatch[1];
    const src = imageMatch[2];
    return (
      <img
        key={index}
        className="w-full overflow-hidden rounded-lg border border-nero-200/25 dark:border-nero-500/25"
        src={src}
        alt={alt}
      />
    );
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

  if (line.match(/^#### (.*)/)) {
    return (
      <h3 className="text-lg font-semibold" key={index}>
        {line.replace(/^#### /, '')}
      </h3>
    );
  }

  // Bold Text
  if (line.includes('**')) {
    const match = line.match(/\*\*(.*?)\*\*/);

    if (match) {
      const [fullMatch, boldText] = match;
      const [before, after] = line.split(fullMatch);

      return (
        <div className="">
          {parseMarkdown(before, `${index}.before`, runRedirect)}
          <strong key={index}>{boldText}</strong>{' '}
          {parseMarkdown(after, `${index}.after`, runRedirect)}
        </div>
      );
    }
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
    const parts = [];
    let lastIndex = 0;

    line.replace(linkRegex, (match, text, url, offset) => {
      parts.push(line.substring(lastIndex, offset));

      parts.push(
        <ExternalLink
          key={`${index}-${offset}`}
          link={url}
          runRedirect={runRedirect}
        >
          {text}
        </ExternalLink>,
      );

      lastIndex = offset + match.length;
    });

    parts.push(line.substring(lastIndex));

    return (
      <div className="flex flex-wrap gap-x-1 text-wrap" key={index}>
        {parts.map((part, i) =>
          typeof part === 'string'
            ? part.split(' ').map((word, j) => (
                <span key={`${i}-${j}`} className="inline-block">
                  {word}{' '}
                </span>
              ))
            : part,
        )}
      </div>
    );
  }

  // Horizontal Rule
  if (line.match(/\-\-\-/)) {
    return <hr className="my-8" key={index} />;
  }

  // Default for normal text
  return <div key={index}>{line}</div>;
}
