import { ISlider } from './models';
import './slider.scss';

export const getTemplate = (settings: ISlider) => {
  return `<div class="filters-items">
            <div class="container-slider">
              <h6 class="title-selection">${settings.title ? settings.title + ': ' : ''}</h6>
                <div class="range-slider">
                  <div class="count-range" data-slider-range-from="${settings.id}"></div>
                  <div data-id="${settings.id}" class="mdc-slider mdc-slider--range">
                    <input class="mdc-slider__input" data-slider-min="${settings.id}" type="range" name="rangeStart">
                    <input class="mdc-slider__input" data-slider-max="${settings.id}" type="range" name="rangeEnd">
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
                  <div class="count-range" data-slider-range-to="${settings.id}"></div>
                </div>
              </div>
          </div>`;
};
