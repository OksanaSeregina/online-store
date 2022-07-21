export abstract class BaseComponent {
  protected abstract element: HTMLElement;
  protected abstract template: string;
  protected onResetChange = (): void => {
    return undefined;
  };

  get instance(): HTMLElement {
    return this.element;
  }

  constructor(protected root: HTMLElement | null) {}

  public init(): void {
    this.render();
  }

  public render(): void {
    this.element.innerHTML = this.template;
    if (this.root) {
      this.attachElement();
    }
  }

  public destroy(): void {
    if (this.root) {
      this.root.innerHTML = '';
    }
  }

  protected attachElement(): void {
    this.root?.appendChild(this.element);
  }
}
