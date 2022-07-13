import { ISlider } from './models';
import './slider.scss';

export const getTemplate = (title: string, settings: ISlider) => {
  return `<div class="filters-items" data-id="${settings.id}">
            <div class="container-slider">
              <h6 class="title-selection">${title ? title + ': ' : ''}</h6>
                <div class="range-slider">
                  <div class="count-range">1</div>
                  <div class="mdc-slider mdc-slider--range">
                    <input class="mdc-slider__input" type="range" min="0" max="70" value="30" name="rangeStart">
                    <input class="mdc-slider__input" type="range" min="10" max="100" value="70" name="rangeEnd">
                    <div class="mdc-slider__track">
                      <div class="mdc-slider__track--inactive"></div>
                      <div class="mdc-slider__track--active">
                        <div class="mdc-slider__track--active_fill"></div>
                      </div>
                    </div>
                    <div class="mdc-slider__thumb">
                      <div class="mdc-slider__thumb-knob"></div>
                    </div>
                    <div class="mdc-slider__thumb">
                      <div class="mdc-slider__thumb-knob"></div>
                    </div>
                  </div>
                  <div class="count-range">10</div>
                </div>
              </div>
          </div>`;
};
