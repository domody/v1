import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'react-feather';
import { useState, useEffect } from 'react';
const CodeBlock = ({code, lang = 'js', title = null}) => {
    const [copied, setCopied] = useState()

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500);
    }

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
    //     console.log('hello')
    //     const newTheme = localStorage.theme
    //     if (newTheme === 'dark') {
    //         setTheme('dark')
    //     } else {
    //         setTheme('light')
    //     }
    //   }, []);

    return  (
        <div className="flex flex-col w-full">
            {
                title && (
                    <div className="w-full px-4 py-2 border bg-nero-200/30 dark:bg-transparent border-nero-300 flex justify-between items-center dark:border-nero-900 rounded-t-md">
                    <p className='text-sm dark:text-nero-300 text-nero-600'>
                    {title}
                    </p>

                    <div>
                    {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className='size-4 text-nero-400 cursor-pointer transition-all hover:text-nero-900 dark:hover:text-nero-50' onClick={() => handleCopy()}/>
                    )}
                    </div>
                </div>
                )
            }

            <div className={`relative dark:bg-nero-900/10 rounded-md border border-nero-300 dark:border-nero-900 w-full ${title ? "rounded-t-none border-t-0" : ""}`}>
            <Copy className={`absolute top-4 right-4 size-4 ${title ? "hidden" : ""}`} />
            <SyntaxHighlighter
                language={lang}
                // style={theme == 'light' ? oneLight : oneDark}
                style={oneDark}
                className={`w-full !bg-transparent [&>*]:!bg-transparent !p-4`}
                customStyle={{ margin: 0 }}
            >
                {code}
            </SyntaxHighlighter>
            </div>
        </div>

    )
}

export { CodeBlock }