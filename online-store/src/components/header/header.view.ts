import { IMG_PATH } from '../../constants';
import './header.scss';

export const getTemplate = () => {
  return `<div class="center">
              <div id="my-id1" class="info__header header-fixed">
                <div class="logo">
                  <a href="#">
                    <img src="${IMG_PATH}/logo.png" alt="logo" />
                  </a>
                </div>

                <div class="icon__header">
                  <div class="icon" data-link="cart">
                    <a href="#" class="cart"></a>
                    <span class="quantity-cart"></span>
                  </div>
                </div>
              </div>
          </div>`;
};
