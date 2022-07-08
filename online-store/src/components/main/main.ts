import { BaseComponent } from '../base-component';
import { getTemplate } from './main.view';

export class Main extends BaseComponent {
  protected element: HTMLElement = document.createElement('main');
  protected template: string = getTemplate();
}
