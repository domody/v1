My current portfolio site, built using Next.js & Tailwind, and implementing some cool features such as markdown parsing, custom APIs and idk some waffle. This was a fun project I made initially to progress my skills, and write about other interesting projects I'd worked on.

---

### Code

Here is a code snippet i am using to test this markdown API system. I actually dont know what to write here

```js
export async function fetchMd(slug) {
  const response = await fetch(`http://localhost:3000/api/projects/${slug}`);
  const data = await response.json();
  return data.content;
}
```
