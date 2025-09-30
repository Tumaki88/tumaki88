import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #7f5cff;
    --primary-light: #b9aaff;
    --primary-dark: #5438c9;
    --success: #28a745;
    --warning: #ffc107;
    --danger: #dc3545;
    --background: #121212;
    --sidebar-bg: #0a0a0a;
    --card-bg: #1e1e1e;
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
    --input-bg: #2d2d2d;
    --border-color: #333333;
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --border-radius-sm: 6px;
    --border-radius-md: 12px;
    --border-radius-lg: 24px;
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.2);
    --shadow-md: 0 4px 8px rgba(0,0,0,0.3);
    --shadow-lg: 0 8px 16px rgba(0,0,0,0.4);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background);
    color: var(--text-primary);
    font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: var(--primary);
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--primary-light);
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-dark);
    border-radius: 4px;
  }
`;

export default GlobalStyles;
