import { template } from './header.view';

export class Header {
  constructor(private root: HTMLElement | null) {}

  public render(): void {
    if (this.root) {
      this.root.innerHTML = template();
    }
  }
}
