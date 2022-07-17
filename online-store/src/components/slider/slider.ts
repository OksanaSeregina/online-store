import { MDCSlider } from '@material/slider';
import { BaseComponent } from '../base-component';
import { ISlider, SliderEvent } from './models';
import { getTemplate } from './slider.view';

export class Slider extends BaseComponent {
  private rangeFrom: HTMLElement | null = null;
  private rangeTo: HTMLElement | null = null;
  private min: HTMLInputElement | null = null;
  private max: HTMLInputElement | null = null;
  private mdcSlider: MDCSlider | undefined;
  private event: CustomEvent<{ value: { id: string; range: [string, string] } }> = new CustomEvent(SliderEvent.Change, {
    detail: { value: { id: this.id, range: ['', ''] } },
  });
  protected element: HTMLElement = document.createElement('div');
  protected template: string = getTemplate(this.settings);

  get id() {
    return this.settings.id;
  }

  constructor(root: HTMLElement | null, private settings: ISlider) {
    super(root);
  }

  get disabled(): boolean {
    return !!this.mdcSlider?.getDisabled();
  }
  set disabled(value: boolean) {
    this.mdcSlider?.setDisabled(value);
  }

  get valueStart(): number {
    return Number(this.mdcSlider?.getValueStart());
  }
  set valueStart(value: number) {
    this.mdcSlider?.setValueStart(value);
  }

  get valueEnd(): number {
    return Number(this.mdcSlider?.getValue());
  }
  set valueEnd(value: number) {
    this.mdcSlider?.setValue(value);
  }

  public init(): void {
    super.init();
    document.addEventListener('resetFilterChanged', this.onResetChange.bind(this));
  }

  public render(): void {
    super.render();

    const element: HTMLElement | null = document.querySelector(`[data-id="${this.id}"]`);
    if (element) {
      this.mdcSlider = new MDCSlider(element);
    }
    this.mdcSlider?.listen('MDCSlider:change', this.onChange.bind(this));
  }

  public initConfig(): void {
    this.loadConfig(this.settings.range);
  }

  protected attachElement(): void {
    super.attachElement();
    this.rangeFrom = <HTMLDivElement>document.querySelector(`[data-slider-range-from="${this.id}"]`);
    this.rangeTo = <HTMLDivElement>document.querySelector(`[data-slider-range-to="${this.id}"]`);
    this.min = <HTMLInputElement>document.querySelector(`[data-slider-min="${this.id}"]`);
    this.max = <HTMLInputElement>document.querySelector(`[data-slider-max="${this.id}"]`);
    this.renderMinMax([this.settings.min, this.settings.max]);
    this.renderRange(this.settings.range);
  }

  private onChange(): void {
    const range: [string, string] = [this.valueStart.toString(), this.valueEnd.toString()];
    this.renderRange(range);
    this.event.detail.value.range = range;
    this.root?.dispatchEvent(this.event);
  }

  protected onResetChange(): void {
    this.loadConfig([this.settings.min, this.settings.max]);
  }

  private loadConfig(value: [string, string]): void {
    const [min, max] = value;
    this.valueStart = Number(min);
    setTimeout(() => {
      this.valueEnd = Number(max);
      this.onChange();
    });
  }

  private renderRange(value: [string, string]): void {
    const [from, to] = value;
    if (this.rangeFrom && this.min) {
      this.min.setAttribute('value', from);
      this.rangeFrom.textContent = from;
    }
    if (this.rangeTo && this.max) {
      this.max.setAttribute('value', to);
      this.rangeTo.textContent = to;
    }
  }

  private renderMinMax(value: [string, string]): void {
    const [min, max] = value;
    if (this.min) {
      this.min.setAttribute('min', min);
      this.min.setAttribute('max', max);
    }
    if (this.max) {
      this.max.setAttribute('min', min);
      this.max.setAttribute('max', max);
    }
  }
}
