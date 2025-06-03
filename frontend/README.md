# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Tailwind CSS + TypeScript React Setup Guide

This guide explains how to set up Tailwind CSS in a TypeScript React (Vite) project, including the correct configuration for Tailwind v4 and ESM environments.

---

## 1. Install Dependencies

Run the following command in your project root:

```
npm i -D tailwindcss@latest @tailwindcss/postcss@latest postcss@latest autoprefixer@latest vite

```

---

## 2. Initialize Tailwind CSS

Generate the Tailwind config file:

```
npx tailwindcss-cli@latest init -p 
```

This creates a `tailwind.config.js` file.

---

## 3. Configure Tailwind for Vite + React + TypeScript

### `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "*"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

### `postcss.config.js`
```js
export default  {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

---

### `src/index.css`
```css
@import "tailwindcss"
```

---

## 4. Import CSS in Your App

In your `src/main.jsx` or `src/main.tsx`, import the CSS at the top:

```js
import './index.css';
```

---

## 5. Start the Dev Server

```
npm run dev
```

---

