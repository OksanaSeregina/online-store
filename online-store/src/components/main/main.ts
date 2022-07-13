import { BaseComponent } from '../base-component';
import { Card } from '../card';
import { ISlider, Slider } from '../slider';
import { getTemplate } from './main.view';

const CARDS_MOCK = [
  {
    id: '1',
    name: 'asdasd',
    image: '',
    count: '1',
    year: '123',
    series: 'asdasd',
    color: 'asdasd',
    size: 'asdasd',
    favorite: true,
  },
  {
    id: '2',
    name: 'asdasd',
    image: '',
    count: '1',
    year: '123',
    series: 'asdasd',
    color: 'asdasd',
    size: 'asdasd',
    favorite: true,
  },
  {
    id: '3',
    name: 'asdasd',
    image: '',
    count: '1',
    year: '123',
    series: 'asdasd',
    color: 'asdasd',
    size: 'asdasd',
    favorite: true,
  },
];
export class Main extends BaseComponent {
  private sliders: { [key: string]: Slider } = {};
  private cards: { [key: string]: Card } = {};

  protected element: HTMLElement = document.createElement('main');
  protected template: string = getTemplate();

  protected attachElement(): void {
    super.attachElement();
    this.createSliders();
    this.createCards();
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

  private createCards(): void {
    CARDS_MOCK.forEach((value) => {
      this.cards[value.id] = new Card(document.querySelector('[data-root="card"]'), '', value);
      Object.values(this.cards).forEach((card: Card) => card.init());
    });
  }
}
