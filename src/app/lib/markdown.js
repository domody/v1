import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// import { remark } from 'remark';

const postsDirectory = path.join(process.cwd(), '/src/app/content');

export async function getPageContent(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const content = matter(fileContents);

  return {
    id,
    content,
    ...content.data,
  };
}
