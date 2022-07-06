import { Main } from './pages';
import './global.scss';

const root: HTMLElement | null = document.getElementById('root');

const mainPage = new Main(root);
mainPage.render();
