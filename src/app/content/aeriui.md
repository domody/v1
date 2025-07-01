aeri-ui is a free, open-source React component library built using React, TailwindCSS, and Class Variance Authority (CVA). It offers a collection of reusable, themeable UI Components designed for consistencty, ease of integration, and minimal configuration overhead.

The library is a work in progress and will undergo continuous development and refinement. While it's not feature-compolete, the current state is stable and usable, making it suitable to be included in real-world projects.

Inspired by [shadcn/ui](https://ui.shadcn.com), this project is not a fork or a replacement but rather a learning-driven implementation built from scratch. Working on aeri-ui has allowed me to deepend my understanding componenet encapsulation, theme design, client/server rendering tradeoffs, and automated tooling workflows. 

---

### Ongoing Transition to Storybook

*Note: aeri-ui is currently undergoing a full migration to Storybook for improved component previews and testing. During this transition, some components may have unaddressed bugs or missing features. Rest assured that many of these bugs have already been noticed and fixed behind-the-scenes, and these will be publicly resolved as part of the Storybook rollout.*

This migration is a key step toward improving documentation, interactivity, and long-term maintainability.

---

### Core Technologies

 - React - All components are built using ForwardRef components with hooks and idiomatic patterns.
 - TailwindCSS - Used as the styling layer, with custom variables and themeability. 
 - Class Variance Authority (CVA) - Enables powerful and type-safe class name generation based on component props. Utilised heavily within the 'cn' funciton or components with variants.
 - Lucide React - For iconography. I plan to make this an optional dependancy to further reduce the projects weight, but it is currently required.
 - Raw Github API - Used to dynamically fetch component source code for the documentation site. 
 - Next.js with Typescript - Used to build the documentation site.
 
---

### Component Architecture & Design Principles

Every component in aeri-ui follows a consistent design theme, allowing for seamless composition and styling interoperability across a project. Key implementation details include:

#### Design Tokens with Tailwind Variables

Theme colors, spacing, and border radii are abstracted into CSS variables and applied via Tailwind. This makes it easy to apply consistent themeing across all components, or override defaults globably, allowing users to easily customize their aeri-ui components.

#### Props-Driven Class Composition

Using CVA, many components expose configurable class variants based on props (e.g. size, variant). This enables advanced conditional styling without sacrificing maintability or Developer Experience (DX). Every component also leverages a 'cn' funtion, which makes use of CVA, to allow class names to be effeciently generated and overriden by developers.
 
---

### Design Considerations

#### Rendering Strategy: Server vs. Client

Components are rendered server-side by default to ensure fast page loads and easy integration across diverse projects. However, components that rely on user interaction or local state, such as dropdowns, modals, or list selectors, are selectively rendered on the client-side where necessary. This hybrid approach balances performance and interactivity. Client-rendered behaviour is reserved for scenarios where:
 - State needs to persist locally (e.g. open/close modals).
 - Event handlers are essential.
 - React hydration is required.

This careful split helps reduce unnecessary client-side Javascript bundles while keeping components intuitive to use. 

#### Documentation Site Architecture

Most development challenges arose from building the documentation site, not the components themselves. To reduce maintenance overhead, the site is designed to by as dynamic as possible:
 - Component source code is fetched directly from GitHub's raw content API.
 - Large amounts of each documentation page are rendered based on metadata or prewritten components to reduce code redundancy. 
 - New components or updates require minimal changes to the docs manually.

Through implementation involved trial-and-error and some less-than-ideal solutions, it was a valuable learning experience. As the project evolves, I plan to redine these systems and adhere more closely to the best practices.

---

### Project setup & Usage

aeri-ui supports multiple integration methods: 

#### Setup via npx

```bash
npx aeriui@latest init
```

Using this npx command ensures that setup is handled automatically. The command takes care of multiple setup processes, such as: 
 - Installs required dependencies (React, TailwindCSS, CVA).
 - Configures Tailwind variables in a global CSS file for theme control.
 - Sets up the required 'cn()' utility function. 
 - Creates an aeriui.json config file to track component directories. 
 - Optionally sets up a project-wide alias for easy imports. 

Once the project has been correctly setup and configured, components can then be installed through one of two ways: 

#### Install via npx

```bash
npx aeriui@latest add <component>
```

This command writes the specified component's code to a file in the directory specified by the user, which is read from the aeriui.json file. The command also has a wildcard variant, which installs all available components.

```bash
npx aeriui@latest add *
```

#### Copy-paste components manually

Alternatively, individual component can be copied directly from the documenation site. Each component page includes a full source preview, making it easy to:
 - Understand how the component works internally.
 - Drop it into your project without extra tooling.
 - Extend or customize it as needed. 

All components are self-contained, written entirely with React and TailwindCSS, and require no external packages beyound the base dependancies. 

--- 

### Future Plans

While aeri-ui is already stable and usable, there are several enhancements and features planned to expand its flexibility, usability, and developer experience: 
 - Optional dependencies - Refactor core components to remove hard dependencies on external libraries like lucide-react, making icon support optional and reducing bundle size.
 - ARIA & Accessibility Enhancements - Audit and improve accessibility across all interactive components, ensuring each component complies with WCAG standards, and improving keyboard and screen reader support.
 - Docs UX Overhaul - Improve the documentation site's UI and UX with component playgrounds, live theme switching, and better search/navigation to support growing component volume. 
 - Framework support beyond React - While built for React, future iterations may explore wrappers, ports, or entirely rewritten versions of components  for other frameworks like Vue or Svelte. 

---

### Conclusion 

aeri-ui is a personal project that has already taught me a great deal, but it's also a living tool that I plan to continuously grow, polish, and scale. The aim is not just to create a set of components, but to build a developer-friendly, themeable UI foundation that evolves alongside the modern frontend ecosystem. 