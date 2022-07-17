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

  private _isOrdered: boolean = false;
  get isOrdered() {
    return this._isOrdered;
  }
  set isOrdered(value: boolean) {
    this._isOrdered = value;
    this.toggle();
  }

  get id() {
    return this.settings.id;
  }

  get name() {
    return this.settings.name;
  }

  get year() {
    return this.settings.year;
  }

  get color() {
    return this.settings.color;
  }

  get isPopular() {
    return this.settings.favorite;
  }

  get series() {
    return this.settings.series;
  }

  get size() {
    return this.settings.size;
  }

  get count() {
    return this.settings.count;
  }

  constructor(root: HTMLElement | null, private settings: ICard) {
    super(root);
  }

  public render(): void {
    super.render();
    this.toggle();
  }

  private toggle(): void {
    const root: HTMLElement | null = document.querySelector(`[data-card-id="${this.id}"]`);
    const buyButton: HTMLElement | null = document.querySelector(`[data-button-id="${this.id}`);
    if (this.isOrdered) {
      root?.classList.add('ordered');
    } else {
      root?.classList.remove('ordered');
    }
    if (buyButton) {
      buyButton.textContent = root?.classList.contains('ordered') ? ButtonAction.Remove : ButtonAction.Add;
    }
  }
}
