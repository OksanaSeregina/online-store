import './slider.scss';

export const getTemplate = () => {
  return `<div class="mdc-slider mdc-slider--range">
            <input class="mdc-slider__input" type="range" min="0" max="70" value="30" name="rangeStart">
            <input class="mdc-slider__input" type="range" min="30" max="100" value="70" name="rangeEnd">
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
          </div>`;
};
