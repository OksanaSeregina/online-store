import { GroupFilterSelectOptionValue, ISlider } from '../../../components';

export interface IStorage {
  sortBy: GroupFilterSelectOptionValue;
  search: string;
  year: string;
  isPopular: boolean;
  slider: { [key: string]: ISlider };
  series: { [key: string]: boolean };
  size: { [key: string]: boolean };
  color: { [key: string]: boolean };
  cart: string[];
}
