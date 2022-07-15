import { App } from './app';

import './global.scss';

const root: HTMLElement | null = document.querySelector('[data-root="root"]');
const popup: HTMLElement | null = document.querySelector('[data-root="modal"]');

const app: App = new App(root, popup);
app.start();
