export interface IFilterValueSettings {
  isPopular: boolean;
  series: { [key: string]: boolean };
  size: { [key: string]: boolean };
  color: { [key: string]: boolean };
}
