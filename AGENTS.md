# Repository Guidelines

## Project Structure & Module Organization
The repository is divided into [./New/](./New/) (the active React project) and [./Old/](./Old/) (legacy code). All active development occurs within the `New/` directory.

- **Frontend Architecture**: A React 19 application built with Vite, located in [./New/src/](./New/src/).
- **Components**: Modular UI elements are stored in [./New/src/components/](./New/src/components/).
- **Pages**: Main route components are located in [./New/src/pages/](./New/src/pages/).
- **Utilities**: Shared helper functions reside in [./New/src/utils/](./New/src/utils/), including the `cn` utility for Tailwind class management.
- **Routing**: Managed via `react-router-dom` in [./New/src/App.jsx](./New/src/App.jsx).

## Build, Test, and Development Commands
Commands must be executed from the [./New/](./New/) directory:

- `npm run dev`: Start the Vite development server with HMR.
- `npm run build`: Create a production-ready build in the `dist/` directory.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Serve the production build locally for verification.

## Coding Style & Naming Conventions
- **React Patterns**: Use functional components and hooks. React 19 is the current version.
- **Styling**: Tailwind CSS v4 is utilized for all styling. Leverage the `cn()` utility from [./New/src/utils/cn.js](./New/src/utils/cn.js) for merging dynamic classes.
- **Animations**: Use Framer Motion for UI transitions and interactions.
- **Icons**: Utilize Lucide React for consistent iconography.
- **Linting Rules**: ESLint is configured in [./New/eslint.config.js](./New/eslint.config.js). Note that unused variables starting with an uppercase letter are permitted to support component placeholders.

## Testing Guidelines
There is currently no automated testing framework configured. Developers should perform manual verification of UI components and responsive layouts across different breakpoints.

## Commit & Pull Request Guidelines
Commit messages should be concise and accurately reflect the changes made. Maintain a clean history by avoiding large, multi-purpose commits.
