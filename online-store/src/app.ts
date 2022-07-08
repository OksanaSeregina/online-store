import { Header, Main } from './components';

export class App {
  private header: Header = new Header(this.root);
  private main: Main = new Main(this.root);

  constructor(private root: HTMLElement | null) {}

  public start(): void {
    this.header.render();
    this.main.render();
  }
}
