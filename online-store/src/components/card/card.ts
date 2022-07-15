import { BaseComponent } from '../base-component';
import { getTemplate } from './card.view';
import { ICard } from './models';

enum ButtonAction {
  Add = 'Add to cart',
  Remove = 'Remove from cart',
}

export class Card extends BaseComponent {
  protected element: HTMLElement = document.createElement('div');
  protected template: string = getTemplate(this.settings);

  get id() {
    return this.settings.id;
  }

  constructor(root: HTMLElement | null, title = '', private settings: ICard) {
    super(root, title);
  }

  public toogle(): void {
    const root: HTMLElement | null = document.querySelector(`[data-card-id="${this.id}"]`);
    const buyButton: HTMLElement | null = document.querySelector(`[data-button-id="${this.id}`);
    root?.classList.toggle('ordered');
    if (buyButton) {
      buyButton.textContent = root?.classList.contains('ordered') ? ButtonAction.Remove : ButtonAction.Add;
    }
  }
}
