import { DEFAULT_COLOR, DEFAULT_POPULAR, DEFAULT_SERIES, DEFAULT_SIZE } from '../../constants';
import { BaseComponent } from '../base-component';
import { ColorFilter, SizeFilter, SeriesFilter, ValueFilterEvent, IFilterValueSettings } from './models';
import { getTemplate } from './value-filter.view';

export class ValueFilter extends BaseComponent {
  private static _instance: ValueFilter;
  private popularElement: HTMLInputElement | null = null;
  private colorState: { [key: string]: boolean } = {};
  private seriesState: { [key: string]: boolean } = {};
  private sizeState: { [key: string]: boolean } = {};
  private popularEvent: CustomEvent<{ value: boolean }> = new CustomEvent(ValueFilterEvent.Popular, {
    detail: { value: false },
  });
  private seriesEvent: CustomEvent<{ value: { [key: string]: boolean } }> = new CustomEvent(ValueFilterEvent.Series, {
    detail: { value: {} },
  });
  private sizeEvent: CustomEvent<{ value: { [key: string]: boolean } }> = new CustomEvent(ValueFilterEvent.Size, {
    detail: { value: {} },
  });
  private colorEvent: CustomEvent<{ value: { [key: string]: boolean } }> = new CustomEvent(ValueFilterEvent.Color, {
    detail: { value: {} },
  });

  protected element: HTMLElement = document.createElement('div');
  protected template: string = getTemplate();
  protected onResetChange = (): void => {
    this.loadPopularConfig(DEFAULT_POPULAR);
    this.loadSeriesConfig(DEFAULT_SERIES);
    this.loadSizeConfig(DEFAULT_SIZE);
    this.loadColorConfig(DEFAULT_COLOR);
  };

  static get instance() {
    return ValueFilter._instance;
  }

  constructor(root: HTMLElement | null, private settings: IFilterValueSettings) {
    super(root);
    if (!ValueFilter._instance) {
      ValueFilter._instance = this;
    }
    return ValueFilter._instance;
  }

  public init(): void {
    super.init();
    document.addEventListener('resetFilterChanged', this.onResetChange);
  }

  public initConfig(): void {
    this.loadPopularConfig(this.settings.isPopular);
    this.loadSeriesConfig(this.settings.series);
    this.loadSizeConfig(this.settings.size);
    this.loadColorConfig(this.settings.color);
  }

  protected attachElement(): void {
    super.attachElement();
    this.initColor();
    this.initPopular();
    this.initSeries();
    this.initSize();
  }

  private initColor(): void {
    const element: HTMLUListElement = <HTMLUListElement>document.querySelector('[data-filter-id="color"]');
    element.addEventListener('click', this.onColorChange.bind(this));
  }

  private initPopular(): void {
    this.popularElement = <HTMLInputElement>document.querySelector('[data-filter-id="popular"]');
    this.popularElement.addEventListener('change', this.onPopularChange.bind(this));
  }

  private initSeries(): void {
    const seriesElement = <HTMLUListElement>document.querySelector('[data-filter-id="series"]');
    seriesElement.addEventListener('click', this.onSeriesChange.bind(this));
  }

  private initSize(): void {
    const element: HTMLUListElement = <HTMLUListElement>document.querySelector('[data-filter-id="size"]');
    element.addEventListener('click', this.onSizeChange.bind(this));
  }

  private loadSeriesConfig(config: { [key: string]: boolean }): void {
    document.querySelectorAll('.series-type').forEach((element) => {
      const value: string = <string>element.getAttribute('data-value');
      this.seriesState[value] = config[value];
      this.seriesState[value] ? element.classList.add('series-type-active') : element.classList.remove('series-type-active');
    });
    this.seriesEvent.detail.value = this.seriesState;
    this.root?.dispatchEvent(this.seriesEvent);
  }

  private loadColorConfig(config: { [key: string]: boolean }): void {
    document.querySelectorAll('[class*="color-type"]').forEach((element) => {
      const value: string = <string>element.getAttribute('data-value');
      this.colorState[value] = config[value];
      this.colorState[value] ? element.classList.add('color-type-active') : element.classList.remove('color-type-active');
    });
    this.colorEvent.detail.value = this.colorState;
    this.root?.dispatchEvent(this.colorEvent);
  }

  private loadSizeConfig(config: { [key: string]: boolean }): void {
    document.querySelectorAll('.size-type').forEach((element) => {
      const value: string = <string>element.getAttribute('data-value');
      this.sizeState[value] = config[value];
      this.sizeState[value] ? element.classList.add('size-type-active') : element.classList.remove('size-type-active');
    });
    this.sizeEvent.detail.value = this.sizeState;
    this.root?.dispatchEvent(this.sizeEvent);
  }

  private loadPopularConfig(config: boolean): void {
    if (this.popularElement) {
      this.popularElement.checked = config;
      this.popularEvent.detail.value = this.popularElement.checked;
      this.root?.dispatchEvent(this.popularEvent);
    }
  }

  private onPopularChange(): void {
    if (this.popularElement) {
      this.popularEvent.detail.value = this.popularElement.checked;
      this.root?.dispatchEvent(this.popularEvent);
    }
  }

  private onSeriesChange(event: Event): void {
    const value: SeriesFilter | null = (<HTMLLIElement>event.target).getAttribute('data-value') as SeriesFilter | null;
    if (value) {
      this.seriesState[value] = !this.seriesState[value];
      this.seriesState[value]
        ? (<HTMLLIElement>event.target).classList.add('series-type-active')
        : (<HTMLLIElement>event.target).classList.remove('series-type-active');
    }
    this.seriesEvent.detail.value = this.seriesState;
    this.root?.dispatchEvent(this.seriesEvent);
  }

  private onSizeChange(event: Event): void {
    const value: SizeFilter | null = (<HTMLLIElement>event.target).getAttribute('data-value') as SizeFilter | null;
    if (value) {
      this.sizeState[value] = !this.sizeState[value];
      this.sizeState[value]
        ? (<HTMLLIElement>event.target).classList.add('size-type-active')
        : (<HTMLLIElement>event.target).classList.remove('size-type-active');
    }
    this.sizeEvent.detail.value = this.sizeState;
    this.root?.dispatchEvent(this.sizeEvent);
  }

  private onColorChange(event: Event): void {
    const value: ColorFilter | null = (<HTMLLIElement>event.target).getAttribute('data-value') as ColorFilter | null;
    if (value) {
      this.colorState[value] = !this.colorState[value];
      this.colorState[value]
        ? (<HTMLLIElement>event.target).classList.add('color-type-active')
        : (<HTMLLIElement>event.target).classList.remove('color-type-active');
    }

    this.colorEvent.detail.value = this.colorState;
    this.root?.dispatchEvent(this.colorEvent);
  }
}
