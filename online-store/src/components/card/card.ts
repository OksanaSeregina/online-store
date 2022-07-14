import { BaseComponent } from '../base-component';
import { getTemplate } from './card.view';
import { ICard } from './models';

export class Card extends BaseComponent {
  protected element: HTMLElement = document.createElement('div');
  protected template: string = getTemplate(this.settings);

  get id() {
    return this.settings.id;
  }

  constructor(root: HTMLElement | null, title = '', private settings: ICard) {
    super(root, title);
  }
}
