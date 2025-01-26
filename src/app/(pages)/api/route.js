import { NextResponse } from 'next/server';
import { remark } from 'remark';
import html from 'remark-html';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export async function GET() {
  const matterResult = {
    content:
      "My current portfolio site, built using Next.js & Tailwind, and implementing some cool features such as markdown parsing, custom APIs and idk some waffle. This was a fun project I made initially to progress my skills, and write about other interesting projects I'd worked on.\r\n***\r\n### Code\r\nHere is a code snippet i am using to test this markdown API system. I actually dont know what to write here\r\n```javascript\r\nconst  [markdownContent,  setMarkdownContent]  =  useState(null);\r\n\r\nuseEffect(()  =>  {\r\nasync  function  fetchMarkdownContent()  {\r\ntry  {\r\n\tconst  response  =  await  fetch(`/api/projects/${decodedSlug}`);\r\n\tconst  data  =  await  response.json();\r\n\tsetMarkdownContent(data.content);\r\n\tconsole.log(data.content);\r\n}  catch (error) {\r\n\tconsole.error('Error fetching markdown content:',  error);\r\n}}\r\n  \r\nfetchMarkdownContent();\r\n}, [decodedSlug]);\r\n```",
    data: {},
    isEmpty: false,
    excerpt: '',
  };

  try {
    const processedContent = await unified()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return NextResponse.json({
      contentHtml,
    });
  } catch (err) {
    return NextResponse.json({
      error: `${err}`,
    });
  }
}
