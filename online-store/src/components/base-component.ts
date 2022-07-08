export abstract class BaseComponent {
  protected abstract element: HTMLElement;
  protected abstract template: string;

  constructor(protected root: HTMLElement | null) {}

  public render(): void {
    if (this.root) {
      this.element.innerHTML = this.template;
      this.attachElement();
    }
  }

  protected attachElement(): void {
    if (this.root) {
      this.root.appendChild(this.element);
    }
  }
}
