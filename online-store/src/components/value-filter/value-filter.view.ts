import { getKeyByValue } from '../../core';
import { ColorFilter, SizeFilter, SeriesFilter } from './models';
import './value-filter.scss';

export const getTemplate = () => {
  return `<h3 class="title">Filters by value</h3>
          <div class="filters-items">
            <div class="series-selection">
              <h6 class="title-selection">Series:</h6>
              <ul class="list" data-filter-id="series">
                ${Object.values(SeriesFilter)
                  .map(
                    (option) => '<li class="item series-type" data-value="' + option + '">' + getKeyByValue(option, SeriesFilter) + '</li>'
                  )
                  .join('')}
              </ul>
            </div>
          </div>
          <div class="filters-items">
            <div class="series-selection">
              <h6 class="title-selection">Diameter of the watch face (mm):</h6>
              <ul class="list" data-filter-id="size">
              ${Object.values(SizeFilter)
                .map((option) => '<li class="item size-type" data-value="' + option + '">' + option + '</li>')
                .join('')}
              </ul>
            </div>
          </div>
          <div class="filters-items">
            <div class="series-selection">
              <h6 class="title-selection">Color:</h6>
              <ul class="list" data-filter-id="color">
                ${Object.values(ColorFilter)
                  .map((option) => '<li class="item-color color-type-' + option + '" data-value="' + option + '"></li>')
                  .join('')}
              </ul>
            </div>
          </div>
          <div class="checkbox-popular">
            <label for="popular" class="title-selection">Only popular:</label>
            <input type="checkbox" id="popular" name="popular" data-filter-id="popular">
          </div>`;
};
