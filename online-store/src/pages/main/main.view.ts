import './main.scss';

export const template = (title: string) => {
  return `<header class="logo">
            <h1 class="logo">${title}</h1>
            <div class="switcher"></div>
          </header>`;
};
