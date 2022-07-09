import { MDCSlider } from '@material/slider';
import { BaseComponent } from '../base-component';
import { getTemplate } from './slider.view';

export class Slider extends BaseComponent {
  private instance: MDCSlider | undefined;
  protected element: HTMLElement = document.createElement('div');
  protected template: string = getTemplate();

  get disabled(): boolean {
    return !!this.instance?.getDisabled();
  }
  set disabled(value: boolean) {
    this.instance?.setDisabled(value);
  }

  get valueStart(): number {
    return Number(this.instance?.getValueStart());
  }
  set valueStart(value: number) {
    this.instance?.setValueStart(value);
  }

  get valueEnd(): number {
    return Number(this.instance?.getValue());
  }
  set valueEnd(value: number) {
    this.instance?.setValue(value);
  }

  public render(): void {
    super.render();
    const element: HTMLElement | null = document.querySelector('.mdc-slider');
    if (element) {
      this.init(element);
    }
  }

  private init(element: HTMLElement): void {
    this.instance = new MDCSlider(element);
  }
}
