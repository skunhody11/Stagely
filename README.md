# Stagely

Stagely is an interactive website developed by Saad Mohammednur, Maruf Hassen, Tony Wang, and Samarth Kunhody designed to make Super Bowl Sunday more fun for casual viewers, music fans, people who may not care much about football, or even just fans of the funny commercials that air during the breaks. The app gives users something engaging to do during the game instead of just passively watching.

## Problem

The Super Bowl is one of the biggest events in the United States, but many people don't actually watch it for the football — they're there for the halftime show, the commercials, or just to have something fun to do with friends. For these viewers, the game itself can feel boring or hard to follow.

This creates an information and engagement problem. While the Super Bowl includes repeated phrases, famous performers, and memorable ads, there's no organized way for users to interact with these moments. Most discussion happens on social media, where opinions are scattered and quickly lost, and existing sites are usually passive (polls, articles) rather than genuinely interactive.

## Features

- **Buzzword Bingo Game** — Users receive a randomly generated bingo card filled with common Super Bowl words and phrases. As these moments happen during the game, users click the matching squares, and the app tracks progress and checks for completed rows or bingo.
- **Voting and Rankings** — Artists and ads are displayed as cards, and users can vote for their favorite halftime performers and commercials. Votes are aggregated into live rankings that can be sorted and filtered.
- **Custom Bingo Cards** *(smaller feature)* — Users choose categories they care about most (music, ads, football-related terms) to generate a personalized bingo card.

## Data

The app uses a static CSV file to store Super Bowl buzzwords, halftime performers, and advertisements. User interactions such as votes and bingo progress are tracked and used to update the interface dynamically.

---

## Development

This project is built with React + Vite, providing a minimal setup with HMR and ESLint rules.

Two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performance. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.