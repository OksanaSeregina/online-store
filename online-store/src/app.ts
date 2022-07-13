import { Header, Main, Footer } from './components';

export class App {
  private header: Header = new Header(this.root);
  private main: Main = new Main(this.root);
  private footer: Footer = new Footer(this.root);

  constructor(private root: HTMLElement | null) {}

  public start(): void {
    this.header.init();
    this.main.init();
    this.footer.init();
  }
}
