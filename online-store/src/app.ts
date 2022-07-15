import { Header, Main, Footer, Modal } from './components';
import { CardService } from './core';

export class App {
  private header: Header = new Header(this.root);
  private main: Main = new Main(this.root, '', new CardService());
  private footer: Footer = new Footer(this.root);
  private modal: Modal = new Modal(this.modalRoot);

  constructor(private root: HTMLElement | null, private modalRoot: HTMLElement | null) {}

  public start(): void {
    this.modal.init();
    this.header.init();
    this.main.init();
    this.footer.init();
  }
}
