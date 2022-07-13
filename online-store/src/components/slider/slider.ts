import { MDCSlider } from '@material/slider';
import { BaseComponent } from '../base-component';
import { ISlider } from './models';
import { getTemplate } from './slider.view';

export class Slider extends BaseComponent {
  private mdcSlider: MDCSlider | undefined;
  protected element: HTMLElement = document.createElement('div');
  protected template: string = getTemplate(this.title, this.settings);

  constructor(root: HTMLElement | null, title = '', private settings: ISlider) {
    super(root, title);
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

  public render(): void {
    super.render();
    const element: HTMLElement | null = document.querySelector('.mdc-slider');
    if (element) {
      this.mdcSlider = new MDCSlider(element);
    }
  }
}
