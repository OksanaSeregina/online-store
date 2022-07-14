import { BaseComponent } from '../base-component';
import { Cart } from '../cart';
import { getTemplate } from './header.view';

export class Header extends BaseComponent {
  private cart: Cart | undefined;

  protected element: HTMLElement = document.createElement('header');
  protected template: string = getTemplate();

  protected attachElement(): void {
    this.root?.prepend(this.element);
    this.createCart();
  }

  private createCart(): void {
    this.cart = new Cart(document.querySelector('[data-root="cart"]'), '');
    this.cart.init();
  }
}
