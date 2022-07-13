import { IAuthor } from './models';
import { IMG_PATH } from '../../constants';
import './footer.scss';

export const getTemplate = (author: IAuthor) => {
  return `<ul class="link-github">
            <li class="item-link-github">
              &copy; <a class="name-link-github" href="${author.github}" target="_blank">${author.name}</a>
            </li>
            <li class="item-link-github">2022</li>
            <a class="link-github-footer" href="https://rs.school/js/" target="_blank"
              ><li class="item-link-github"><img src="${IMG_PATH}/rsschool.svg" alt="logo" /></li
            ></a>
          </ul>`;
};
