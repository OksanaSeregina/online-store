import { IMG_PATH } from '../../constants';
import './main.scss';

export const getTemplate = () => {
  return `<div class="filters-container">

                <div class="group-filters">
                  <h3 class="title">Filters by value</h3>
                  <div class="filters-items">
                    <div class="series-selection">
                      <h6 class="title-selection">Series:</h6>
                      <ul class="list">
                        <li class="item">Maple</li>
                        <li class="item">Ebony</li>
                        <li class="item">Tomia</li>
                      </ul>
                    </div>
                  </div>
                  <div class="filters-items">
                    <div class="series-selection">
                      <h6 class="title-selection">Diameter of the watch face (mm):</h6>
                      <ul class="list">
                        <li class="item">38</li>
                        <li class="item">42</li>
                        <li class="item">46</li>
                      </ul>
                    </div>
                  </div>
                  <div class="filters-items">
                    <div class="series-selection">
                      <h6 class="title-selection">Color:</h6>
                      <ul class="list">
                        <li class="item-color color-type-light"></li>
                        <li class="item-color color-type-brown"></li>
                        <li class="item-color color-type-gray"></li>
                      </ul>
                    </div>
                  </div>
                  <div class="checkbox-popular">
                    <label for="popular" class="title-selection">Only popular:</label>
                    <input type="checkbox" id="popular" name="popular" checked>
                  </div>
                </div>

                <div class="group-filters" data-root="slider">
                  <h3 class="title">Filters by range</h3>
                </div>

                <div class="group-filters">
                  <div class="filters-items">
                    <h6 class="title-selection">Search:</h6>
                    <div class="search-container">
                      <input class="input-search" id="input" type="text" placeholder="Search" autofocus
                                        autocomplete="off"/>
                      <img class="icons icon-search" src="${IMG_PATH}/search.png" alt="search" />
                      <img class="icons icon-close hidden" src="${IMG_PATH}/cross.png" alt="cross" />
                    </div>
                  </div>
                  <div class="filters-items">
                    <h6 class="title-selection">Sorting:</h6>
                    <div class="sorting-container">
                      <form>
                        <select>
                          <option>By name, from A to Z</option>
                          <option>By name, from Z to A</option>
                          <option>By year, ascending</option>
                          <option>By year, descending</option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <div class="reset">
                    <button class="btn-reset">Reset filters</button>
                    <button class="btn-reset">Reset settings</button>
                  </div>
                </div>

              </div>

              <div class="catalog-container" data-root="card"></div>
          `;
};
