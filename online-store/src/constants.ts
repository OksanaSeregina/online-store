import { IAuthor } from './components';

/**
 * Global image path that is used in template.
 * That path depend of 'src/assets'
 */
export const IMG_PATH = './images';

export const AUTHOR: IAuthor = {
  name: 'Aksana Siarohina',
  github: 'https://github.com/OksanaSeregina',
};

export const STORAGE_KEY = 'matoa';

export const DEFAULT_SEARCH = '';
export const DEFAULT_SORT = 0;
export const DEFAULT_POPULAR = false;

export const DEFAULT_SERIES = {
  maple: false,
  ebony: false,
  tomia: false,
};

export const DEFAULT_SIZE = {
  '38': false,
  '42': false,
  '46': false,
};

export const DEFAULT_COLOR = {
  light: false,
  brown: false,
  gray: false,
};
