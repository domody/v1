import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneLight,
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'react-feather';
import { useState, useEffect } from 'react';
const CodeBlock = ({ code, lang = 'js', title = null }) => {
  const [copied, setCopied] = useState();
  console.log(code);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  // const [theme, setTheme] = useState(
  // typeof window !== 'undefined' ? localStorage.theme : 'light',
  // );

  // useEffect(() => {
  // setInterval(() => {
  //     const newTheme = localStorage.theme
  //     if (newTheme === 'dark') {
  //         setTheme('dark')
  //     } else {
  //         setTheme('light')
  //     }
  // }, 5);
  // })

  // useEffect(() => {
  //     const newTheme = localStorage.theme
  //     if (newTheme === 'dark') {
  //         setTheme('dark')
  //     } else {
  //         setTheme('light')
  //     }
  //   }, []);

  return (
    <div className="flex w-full flex-col">
      {title && (
        <div className="flex w-full items-center justify-between rounded-t-md border border-nero-300 bg-nero-200/30 px-4 py-2 dark:border-nero-900 dark:bg-transparent">
          <p className="text-sm text-nero-600 dark:text-nero-300">{title}</p>

          <div>
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy
                className="size-4 cursor-pointer text-nero-400 transition-all hover:text-nero-900 dark:hover:text-nero-50"
                onClick={() => handleCopy()}
              />
            )}
          </div>
        </div>
      )}

      <div
        className={`relative w-full rounded-md border border-nero-300 dark:border-nero-900 dark:bg-nero-900/10 ${title ? 'rounded-t-none border-t-0' : ''}`}
      >
        <Copy
          className={`absolute right-4 top-4 size-4 ${title ? 'hidden' : ''}`}
        />
        <SyntaxHighlighter
          language={lang}
          // style={theme == 'light' ? oneLight : oneDark}
          style={oneDark}
          className={`w-full !bg-transparent !p-4 [&>*]:!bg-transparent`}
          customStyle={{ margin: 0 }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export { CodeBlock };
