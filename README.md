# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # bubble-brew

    A small React + TypeScript app scaffolded with Vite. I fixed JSX-in-.js errors by converting legacy JavaScript/JSX files to TypeScript `.tsx` files and ensuring routing dependencies are installed.

    How to run locally

    1. Install dependencies:

    ```powershell
    cd "C:\Users\HP\OneDrive\Desktop\Bubble paul\bubble-brew"
    npm install
    ```

    2. Start the dev server:

    ```powershell
    npm run dev
    ```

    Open http://localhost:5173 in your browser after the server starts.

    What I changed

    - Converted `src/App.js` -> `src/App.tsx` and converted component files in `src/components/` to `.tsx`.
    - Created `src/index.css` and fixed `src/main.tsx` to import the `App` component correctly.
    - Installed `react-router-dom` and started the dev server to verify the app.

    If you'd like, I can now:

    - Add stricter TypeScript typings to all components.
    - Add ESLint/Prettier rules and type-aware linting.
    - Commit the changes to git for you.
