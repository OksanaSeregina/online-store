import { template } from './main.view';

export class Main {
  constructor(private root: HTMLElement | null) {}

  public render(): void {
    if (this.root) {
      const element = document.createElement('main');
      element.innerHTML = template();
      this.root.appendChild(element);
    }
  }
}
