// import { MDXRemote } from 'next-mdx-remote/rsc';
// import { serialize } from 'next-mdx-remote/serialize';
// import rehypePrism from 'rehype-prism-plus';
// import rehypeCodeTitles from 'rehype-code-titles';

// const components = {
//   h1: (props) => (
//     <p {...props} className="bg-red-500">
//       {props.children}
//     </p>
//   ),
// };

// export function CustomMDX(props) {
//   return (
//     <MDXRemote
//       {...props}
//       components={{ ...components, ...(props.components || {}) }}
//     />
//   );
// }

// export async function fetchData() {
//   try {
//     const response = await fetch(`/api/projects/${decodedSlug}`);
//     const _data = await response.json();
//     setData(_data.content.content);
//   } catch (error) {
//     console.error('Error fetching markdown content:', error);
//   }
// }

// export function Project({ project }) {
//   return (
//     <div className="mt-4 flex flex-col gap-y-4">
//       <CustomMDX {...project.content} />
//     </div>
//   );
// }
