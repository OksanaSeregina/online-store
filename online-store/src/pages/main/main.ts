import { template } from './main.view';

export class Main {
  constructor(private root: HTMLElement | null) {}

  public render(): void {
    if (this.root) {
      this.root.innerHTML = template('News');
    }
  }
}
