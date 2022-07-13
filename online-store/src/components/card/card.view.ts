import { IMG_PATH } from '../../constants';
import './card.scss';
import { ICard } from './models';

export const getTemplate = (settings: ICard) => {
  return `<div data-id="${settings.id}" class="product-card">
            <div class="product-thumb">
              <img class="offer-image" src="${IMG_PATH}/${settings.image}" />
            </div>
            <div class="product-details">
              <h4 class="name-product">${settings.name}</h4>
              <h5 class="description">Series: ${settings.series}</h5>
              <h5 class="description">Size: ${settings.size}</h5>
              <h5 class="description">Color: ${settings.color}</h5>
              <h5 class="description">Quantity in stock: ${settings.count}</h5>
              <h5 class="description">Year of release: ${settings.year}</h5>
              <h5 class="description">Popular: ${settings.favorite}</h5>
            </div>
            <div  class="add-cart" data-hide-id="${settings.id}">
              <div class="card-button">
                <a data-action="add" href="#">Add to cart</a>
              </div>
            </div>
          </div>`;
};
