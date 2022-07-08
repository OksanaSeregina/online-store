import { template } from './header.view';

export class Header {
  constructor(private root: HTMLElement | null) {}

  public render(): void {
    if (this.root) {
      const element = document.createElement('header');
      element.innerHTML = template();
      this.root.prepend(element);
    }
  }
}
