This is the same site you're currently browsing - my personal portfolio. It showcases my work, offering detailed breakdowns of various projects along with with multiple ways to get in touch. The site is a lightweight, static web app with a clean, minimal design. 

All design and development were done entirely by me.

While it may seem redundant to feature this site as a portfolio project, futre versions will likely evolve in both design and functionality. Documentiing each iteration helps illustrate my growth as a developer and designer over time.

---

### Core Technologies

 - React - Utilized for component-based architecture and dynamic rendering of content.
 - TailwindCSS - Used for rapid, utility-first styling and responsive design consistency.

---

### Design Considerations

#### Minimal, Focused User Experience

The goal was to create a visually clean and minimal interface that makes navigation straightforward. From the homepage, users are immediately directed toward project previews, represented as concise cards with short descriptions and helpful tags. This ensures users can quickly scan and identify projects of interest.

#### Dynamic Visual Identity

To add a subtle visual variation, the homepage background features a randomly selected gradient image from a set of six. This not only adds a touch of color, but also introduces uniqueness to each visit.

![Santai.gg Player Profile](/projects/domodyv1/home.png)

#### Seamless Page Transitions

A key focus was on improving immersion by minimizing the jarring effect of traditional page loads. When navigating between internal pages, content gently fades in and out, creating smooth transitions that reduce the perceived loading time. This transition technique temporarily masks content loading by fading in from black, giving the impression of faster performance.

*Note: These transitions do not work when using browser navigation buttons (forward/back), but I plan to improve this in future versions.*

--- 

### In-House Markdown Renderer

As a personal challenge, I implemented a custom markdown renderer instead of relying on external libraries. This system fetches raw markdown content and parses it line-by-line, interpreting elements such as code blocks, headings, horizontal rules, and text formatting like bold and italics. 

Although it's still a work-in-progress and doesn't yet cover every markdown edge case, it has provided greater control over content rendering and has been a valuable learning experience. I intend to eventually adopt .mdx files to support more powerful and flexible documentation for future projects. 

---

### Future Plans

This portfolio will continue to evolve alongside my development skills. As both a living project and a reflection of my standards, I plan to: 

 - Transition the codebase to TypeScript (currently JavaScript-based).
 - Implement a more robust and scalable markdown system using .mdx. 
 - Improve accessibility and performance metrics site-wide. 
 - Expand the custom page transitions to include browser forward/back navigation.

---

### Conclusion

My personal portfolio is more than a static site. It evolves to reflect my growth, technical capabilities, and design sensibilities. It's both a portfolio and a project, and I treat it as a living example of my dedication to quality, experimentation, and user-focused design.