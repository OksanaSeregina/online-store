import { AUTHOR } from '../../constants';
import { BaseComponent } from '../base-component';
import { getTemplate } from './footer.view';

export class Footer extends BaseComponent {
  protected element: HTMLElement = document.createElement('footer');
  protected template: string = getTemplate(AUTHOR);
}
