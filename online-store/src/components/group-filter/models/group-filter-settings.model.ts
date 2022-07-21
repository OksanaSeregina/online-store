import { GroupFilterSelectOptionValue } from './group-filter-select-option-value.enum';

export interface GroupFilterSettings {
  searchValue: string;
  sortValue: GroupFilterSelectOptionValue;
}
