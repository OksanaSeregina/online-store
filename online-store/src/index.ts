import { Header } from './components';
import './global.scss';
import { Main } from './pages';

const root: HTMLElement | null = document.getElementById('root');

const header = new Header(root);
header.render();

const main = new Main(root);
main.render();
