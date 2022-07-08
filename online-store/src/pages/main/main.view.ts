import './main.scss';

/* export const template = (title: string, header: string) => {
  return `<header class="logo">
            <h1 class="logo">${title}</h1>
            <div class="switcher"></div>
            ${header}
          </header>`;
};
 */
export const template = () => {
  return `<main>
            <div class="center">
              <div class="filters-container">
                <div class="group-filters">
                  <h3 class="title">Filters by value</h3>
                  <div class="filters-items">
                    <div class="series-selection">
                      <h6 class="title-selection">Series:</h6>
                      <ul class="list">
                        <li class="item">Maple</li>
                        <li class="item">Ebony</li>
                        <li class="item">Featured</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="group-filters">
                  <h3 class="title">Filters by value</h3>
                  <div class="filters-items">
                    <div class="series-selection">
                      <h6 class="title-selection">Series:</h6>
                      <ul class="list">
                        <li class="item">Maple</li>
                        <li class="item">Ebony</li>
                        <li class="item">Featured</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="group-filters">
                  <h3 class="title">Filters by value</h3>
                  <div class="filters-items">
                    <div class="series-selection">
                      <h6 class="title-selection">Series:</h6>
                      <ul class="list">
                        <li class="item">Maple</li>
                        <li class="item">Ebony</li>
                        <li class="item">Featured</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>`;
};
