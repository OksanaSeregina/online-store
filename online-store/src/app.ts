import { Header, Main, Footer, Modal } from './components';
import { CardService, StorageService } from './core';

export class App {
  private header: Header = new Header(this.root);
  private main: Main = new Main(this.root, new CardService(), this.storageService);
  private footer: Footer = new Footer(this.root);
  private modal: Modal = new Modal(this.modalRoot);
  private onChange = (): void => {
    this.storageService.clear();
    location.reload();
  };

  constructor(private root: HTMLElement | null, private modalRoot: HTMLElement | null, private storageService: StorageService) {}

  public start(): void {
    this.modal.init();
    this.header.init();
    this.main.init();
    this.footer.init();
    this.listen();
  }

  private listen(): void {
    document.addEventListener('resetStorageChanged', this.onChange);
  }
}
