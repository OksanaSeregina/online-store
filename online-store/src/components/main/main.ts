import { CardService, inRange, isCustomEvent, StorageService } from '../../core';
import { BaseComponent } from '../base-component';
import { Card, ICard } from '../card';
import { Cart } from '../cart';
import { GroupFilter, GroupFilterEvent, GroupFilterSelectOptionValue } from '../group-filter';
import { ISlider, Slider, SliderEvent } from '../slider';
import { getTemplate, getNoResultTemplate } from './main.view';
import { ValueFilter, ValueFilterEvent } from '../value-filter';
import { Root } from './models';
import { getSliderConfig } from './helpers';
import { DEFAULT_COLOR, DEFAULT_POPULAR, DEFAULT_SEARCH, DEFAULT_SERIES, DEFAULT_SIZE, DEFAULT_SORT } from '../../constants';

export class Main extends BaseComponent {
  private rootCartElement: HTMLElement | null = null;
  private search: string = '';
  private sort: GroupFilterSelectOptionValue = GroupFilterSelectOptionValue.NameAsc;
  private color: { [key: string]: boolean } = {};
  private series: { [key: string]: boolean } = {};
  private size: { [key: string]: boolean } = {};
  private isPopular: boolean = false;
  private countMinMax: { min: string; max: string } = { min: '', max: '' };
  private yearMinMax: { min: string; max: string } = { min: '', max: '' };
  private countRange: { min: string; max: string } = { min: '', max: '' };
  private yearRange: { min: string; max: string } = { min: '', max: '' };
  private sliders: { [key: string]: Slider } = {};
  private cards: { [key: string]: Card } = {};

  protected element: HTMLElement = document.createElement('main');
  protected template: string = getTemplate();

  constructor(root: HTMLElement | null, private cardService: CardService, private storageService: StorageService) {
    super(root);
  }

  protected async attachElement(): Promise<void> {
    super.attachElement();
    await this.loadCards();
    this.initCards();
    this.initSlider();
    this.initGroupFilter();
    this.initValueFilter();
  }

  private async loadCards(): Promise<void> {
    this.rootCartElement = document.querySelector(Root.Card);
    const cards: ICard[] = await this.cardService.get();
    cards.forEach((value) => {
      this.cards[value.id] = new Card(this.rootCartElement, value);
    });
  }

  private initSlider(): void {
    const root: HTMLElement | null = document.querySelector(Root.Slider);
    const years: number[] = Object.values(this.cards).map((card) => Number(card.year));
    const counts: number[] = Object.values(this.cards).map((card) => Number(card.count));
    this.countRange = { min: Math.min(...counts).toString(), max: Math.max(...counts).toString() };
    this.yearRange = { min: Math.min(...years).toString(), max: Math.max(...years).toString() };
    this.countMinMax = { ...this.countRange };
    this.yearMinMax = { ...this.yearRange };

    const storedSettings = <{ [key: string]: ISlider }>this.storageService.get('slider');
    const config: ISlider[] = storedSettings
      ? Object.values(storedSettings)
      : [getSliderConfig('Quantity in stock', 'quantity', this.countRange), getSliderConfig('Year of release', 'release', this.yearRange)];

    config.forEach((setting) => {
      this.sliders[setting.id] = new Slider(root, setting);
      Object.values(this.sliders).forEach((slider: Slider) => slider.init());
    });
    root?.addEventListener(SliderEvent.Change, this.onSliderChange.bind(this));
    Object.values(this.sliders).forEach((slider: Slider) => slider.initConfig());
  }

  private initCards(): void {
    this.updateCards();
    this.rootCartElement?.addEventListener('click', this.onCartChange.bind(this));
    const config = <string[]>this.storageService.get('cart');
    Object.values(this.cards).forEach((card: Card) => {
      if (config?.includes(card.id)) {
        Cart.instance.onChange(card);
      }
    });
  }

  private initGroupFilter(): void {
    const root: HTMLElement | null = document.querySelector(Root.GroupFilter);
    const filter: GroupFilter = new GroupFilter(root, {
      searchValue: <string>this.storageService.get('search') || DEFAULT_SEARCH,
      sortValue: <GroupFilterSelectOptionValue>this.storageService.get('sortBy') || DEFAULT_SORT,
    });
    filter.init();
    Object.values(GroupFilterEvent).forEach((event: GroupFilterEvent) => {
      root?.addEventListener(event, this.onGroupFilterChange.bind(this));
    });
    filter.initConfig();
  }

  private initValueFilter(): void {
    const root: HTMLElement | null = document.querySelector(Root.ValueFilter);
    const filter: ValueFilter = new ValueFilter(root, {
      isPopular: <boolean>this.storageService.get('isPopular') || DEFAULT_POPULAR,
      series: <{ [key: string]: boolean }>this.storageService.get('series') || DEFAULT_SERIES,
      size: <{ [key: string]: boolean }>this.storageService.get('size') || DEFAULT_SIZE,
      color: <{ [key: string]: boolean }>this.storageService.get('color') || DEFAULT_COLOR,
    });
    filter.init();
    Object.values(ValueFilterEvent).forEach((event: ValueFilterEvent) => {
      root?.addEventListener(event, this.onValueFilterChange.bind(this));
    });
    filter.initConfig();
  }

  private updateCards(): void {
    if (this.rootCartElement) {
      this.rootCartElement.classList.remove('empty-catalog-container');
      this.rootCartElement.innerHTML = '';
      const cards: Card[] = this.getFilteredCards();
      if (!cards.length) {
        this.rootCartElement.classList.add('empty-catalog-container');
        this.rootCartElement.innerHTML = getNoResultTemplate();
      }
      cards.forEach((card: Card) => card.init());
    }
  }

  private onSliderChange(event: Event): void {
    if (!isCustomEvent(event)) {
      throw new Error('Not a custom event');
    }
    const { id, range } = (<{ value: { id: string; range: string[] } }>event.detail).value;
    const [min, max] = range;
    switch (id) {
      case 'quantity':
        this.countRange = { min, max };
        break;
      case 'release':
        this.yearRange = { min, max };
    }
    const config: { [key: string]: ISlider } = {
      quantity: {
        ...getSliderConfig('Quantity in stock', 'quantity', this.countRange),
        min: this.countMinMax.min,
        max: this.countMinMax.max,
      },
      release: { ...getSliderConfig('Year of release', 'release', this.yearRange), min: this.yearMinMax.min, max: this.yearMinMax.max },
    };
    this.storageService.set('slider', config);
    return this.updateCards();
  }

  private onValueFilterChange(event: Event): void {
    if (!isCustomEvent(event)) {
      throw new Error('Not a custom event');
    }
    switch (event.type) {
      case ValueFilterEvent.Color:
        this.color = (<{ value: { [key: string]: boolean } }>event.detail).value;
        this.storageService.set('color', this.color);
        break;
      case ValueFilterEvent.Popular:
        this.isPopular = (<{ value: boolean }>event.detail).value;
        this.storageService.set('isPopular', this.isPopular);
        break;
      case ValueFilterEvent.Series:
        this.series = (<{ value: { [key: string]: boolean } }>event.detail).value;
        this.storageService.set('series', this.series);
        break;
      case ValueFilterEvent.Size:
        this.size = (<{ value: { [key: string]: boolean } }>event.detail).value;
        this.storageService.set('size', this.size);
        break;
    }
    return this.updateCards();
  }

  private onGroupFilterChange(event: Event): void {
    if (!isCustomEvent(event)) {
      throw new Error('Not a custom event');
    }
    switch (event.type) {
      case GroupFilterEvent.Search:
        this.search = (<{ value: string }>event.detail).value;
        this.storageService.set('search', this.search);
        break;
      case GroupFilterEvent.Sort:
        this.sort = Number((<{ value: string }>event.detail).value);
        this.storageService.set('sortBy', this.sort);
        break;
    }
    this.updateCards();
  }

  private onCartChange(event: MouseEvent): void {
    event.preventDefault();
    const target: HTMLElement = <HTMLElement>event.target;
    const id: string | null | undefined = target?.closest('[data-card-id]')?.getAttribute('data-card-id');
    if (id) {
      const cart: { [key: string]: Card } = Cart.instance.onChange(this.cards[id]);
      this.storageService.set('cart', Object.keys(cart));
    }
  }

  private getFilteredCards(): Card[] {
    const filtered: Card[] = Object.values(this.cards).filter((value: Card) => {
      const hasName: boolean = value.name.toLowerCase().includes(this.search.toLowerCase());
      const colors: string[] = Object.keys(this.color).filter((key: string) => this.color[key]);
      const hasColor: boolean = !colors.length || colors.includes(value.color.toLowerCase());
      const hasPopular: boolean = !this.isPopular || value.isPopular;
      const series: string[] = Object.keys(this.series).filter((key: string) => this.series[key]);
      const hasSeries: boolean = !series.length || series.includes(value.series.toLowerCase());
      const size: string[] = Object.keys(this.size).filter((key: string) => this.size[key]);
      const hasSize: boolean = !size.length || size.includes(value.size.toLowerCase());
      const hasCount: boolean = inRange([this.countRange.min, this.countRange.max], value.count);
      const hasYear: boolean = inRange([this.yearRange.min, this.yearRange.max], value.year);
      return hasName && hasColor && hasPopular && hasSeries && hasSize && hasCount && hasYear;
    });
    switch (this.sort) {
      case GroupFilterSelectOptionValue.NameAsc:
        return Object.values(filtered).sort((a, b) => a.name.localeCompare(b.name));
      case GroupFilterSelectOptionValue.NameDesc:
        return Object.values(filtered).sort((a, b) => b.name.localeCompare(a.name));
      case GroupFilterSelectOptionValue.YearAsc:
        return Object.values(filtered).sort((a, b) => a.year.localeCompare(b.year));
      case GroupFilterSelectOptionValue.YearDesc:
        return Object.values(filtered).sort((a, b) => b.year.localeCompare(a.year));
      default:
        return Object.values(filtered).sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
