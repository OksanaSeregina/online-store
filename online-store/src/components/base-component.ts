export abstract class BaseComponent {
  protected abstract element: HTMLElement;
  protected abstract template: string;

  get instance(): HTMLElement {
    return this.element;
  }

  constructor(protected root: HTMLElement | null, protected title: string = '') {}

  public init(): void {
    this.render();
  }

  public render(): void {
    this.element.innerHTML = this.template;
    if (this.root) {
      this.attachElement();
    }
  }

  protected attachElement(): void {
    if (this.root) {
      this.root.appendChild(this.element);
    }
  }
}
