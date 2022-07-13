import { Header, Main, Footer } from './components';
import { CardService } from './core';

export class App {
  private header: Header = new Header(this.root);
  private main: Main = new Main(this.root, '', new CardService());
  private footer: Footer = new Footer(this.root);

  constructor(private root: HTMLElement | null) {}

  public start(): void {
    this.header.init();
    this.main.init();
    this.footer.init();
  }
}
