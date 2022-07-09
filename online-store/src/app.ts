import { Header, Main, Slider } from './components';

export class App {
  private header: Header = new Header(this.root);
  private main: Main = new Main(this.root);
  private slider: Slider = new Slider(this.root);

  constructor(private root: HTMLElement | null) {}

  public start(): void {
    this.header.render();
    this.main.render();
    this.slider.render();
  }
}
