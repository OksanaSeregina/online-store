import { BaseComponent } from '../base-component';
import { Card } from '../card';
import { getTemplate } from './cart.view';

const MAX_COUNT = 20;

export class Cart extends BaseComponent {
  private static _instance: Cart;
  private state: { [key: string]: Card } = {};

  protected element: HTMLElement = document.createElement('div');
  protected template: string = getTemplate();

  get count() {
    return Object.values(this.state).length;
  }

  static get instance() {
    return Cart._instance;
  }

  constructor(root: HTMLElement | null, title = '') {
    super(root, title);
    if (!Cart._instance) {
      Cart._instance = this;
    }
    return Cart._instance;
  }

  public init(): void {
    super.render();
    this.renderCount();
  }

  public onChange(item: Card): { [key: string]: Card } {
    if (this.isExist(item)) {
      delete this.state[item.id];
    } else if (this.count !== MAX_COUNT) {
      this.state[item.id] = item;
    }
    this.renderCount();
    return this.state;
  }

  private isExist({ id }: Card): boolean {
    return !!this.state[id];
  }

  private renderCount(): void {
    const element: Element = document.getElementsByClassName('cart')[0];
    element.innerHTML = `<span class="quantity-cart">${this.count.toString()}</span>`;
  }
}
