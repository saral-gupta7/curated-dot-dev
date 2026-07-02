# curated.dev

A small, opinionated library of technical videos and articles that are worth keeping. Built with TanStack Start, React 19, Tailwind CSS 4, Zustand, and TypeScript.

## Local development

Use Node.js 20 or newer.

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

## Content

Content is organized under `src/constants/`: topic navigation in `topicGroups.ts`, topic-grouped video files in `videoResources/`, articles in `articleResources.ts`, shared types in `constants.types.ts`, and taxonomy utilities in `topicHelpers.ts`.

## Quality checks

```bash
npm run validate
```

This checks formatting, types, lint rules, tests, and the production build.

## Deploy to Vercel

The project uses the Nitro Vite adapter and declares the TanStack Start framework preset in `vercel.json`.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repository into Vercel.
3. Confirm the detected framework is **TanStack Start**.
4. Deploy. Vercel uses `npm run build` automatically.

For CLI deployment:

```bash
npx vercel
```

Do not prefix private server secrets with `VITE_`. Vite exposes variables with that prefix to browser code.
