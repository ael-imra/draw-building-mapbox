import { createRoot } from 'react-dom/client';
import App from './Components/App';

import './styles/index.css';

declare global {
  interface Window {
    root: HTMLElement;
  }
}

const root = createRoot(window.root);

root.render(<App />);
