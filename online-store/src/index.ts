import { App } from './app';

import './global.scss';

const root: HTMLElement | null = document.getElementById('root');

const app: App = new App(root);
app.start();
