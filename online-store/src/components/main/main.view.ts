import './main.scss';

export const getTemplate = () => {
  return `<div class="center">
            <div class="filters-container">
              <div class="group-filters" data-root="value"></div>
              <div class="group-filters" data-root="slider">
                <h3 class="title">Filters by range</h3>
              </div>
              <div class="group-filters" data-root="sorting"></div>
            </div>
            <div class="catalog-container" data-root="card"></div>
          </div>
          `;
};

export const getNoResultTemplate = () => {
  return `<div class="message">Nothing found. Please, change filters and try again.</div>`;
};
