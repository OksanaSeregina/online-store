import { readme } from './readme';
import { App } from './app';
import { StorageService } from './core';

import './global.scss';

const root: HTMLElement | null = document.querySelector('[data-root="root"]');
const popup: HTMLElement | null = document.querySelector('[data-root="modal"]');
const storage: StorageService = new StorageService();

const app: App = new App(root, popup, storage);
app.start();

readme(); // NOTE: show console message for cross-checking
