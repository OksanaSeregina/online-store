import { IMG_PATH } from '../../constants';
import './group-filter.scss';

export const getTemplate = () => {
  return `<form name="filters">
            <div class="filters-items">
            <h6 class="title-selection">Search:</h6>
            <div class="search-container">
              <input data-filter-id="search" class="input-search" id="input" type="text" placeholder="Search" autofocus
                                autocomplete="off"/>
              <img data-filter-id="icon-search" class="icons icon-search" src="${IMG_PATH}/search.png" alt="search" />
              <img data-filter-id="icon-close" class="icons icon-close hidden" src="${IMG_PATH}/cross.png" alt="cross" />
            </div>
          </div>
          <div class="filters-items">
            <h6 class="title-selection">Sorting:</h6>
            <div class="sorting-container">
                <select data-filter-id="sorting"></select>
            </div>
          </div>
          <div class="reset">
            <button type="reset" class="btn-reset">Reset filters</button>
            <button data-type-id="clear" class="btn-reset">Reset settings</button>
          </div>
        </form>`;
};
