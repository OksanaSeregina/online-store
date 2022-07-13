import { CardService } from '../../core';
import { BaseComponent } from '../base-component';
import { Card, ICard } from '../card';
import { ISlider, Slider } from '../slider';
import { getTemplate } from './main.view';

export class Main extends BaseComponent {
  private sliders: { [key: string]: Slider } = {};
  private cards: { [key: string]: Card } = {};

  protected element: HTMLElement = document.createElement('main');
  protected template: string = getTemplate();

  constructor(root: HTMLElement | null, title = '', private service: CardService) {
    super(root, title);
  }

  protected async attachElement(): Promise<void> {
    super.attachElement();
    this.createSliders();
    await this.createCards();
  }

  private createSliders(): void {
    const settings: (ISlider & { title: string })[] = [
      { title: 'Quantity in stock', id: 'quantity' },
      { title: 'Year of release', id: 'release' },
    ];
    settings.forEach(({ title, id }) => {
      this.sliders[id] = new Slider(document.querySelector('[data-root="slider"]'), title, { id });
      Object.values(this.sliders).forEach((slider: Slider) => slider.init());
    });
  }

  private async createCards(): Promise<void> {
    const cards = await this.service.get();
    cards.forEach((value) => {
      this.cards[value.id] = new Card(document.querySelector('[data-root="card"]'), '', value);
      Object.values(this.cards).forEach((card: Card) => card.init());
    });
  }
}
