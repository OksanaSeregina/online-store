import { template } from './main.view';

/* export class Main {
  private config: IMainSettings = {
    settings: {
      header: Header.get(),
    },
  };

  constructor(private root: HTMLElement | null) {}

  public render(): void {
    if (this.root) {
      this.root.innerHTML = template('News', this.config.settings.header);
    }
  }
} */

export class Main {
  constructor(private root: HTMLElement | null) {}

  public render(): void {
    if (this.root) {
      this.root.innerHTML += template();
    }
  }
}
