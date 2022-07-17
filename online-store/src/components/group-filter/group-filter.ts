import { DEFAULT_SEARCH } from '../../constants';
import { BaseComponent } from '../base-component';
import { getTemplate } from './group-filter.view';
import { GroupFilterEvent, GroupFilterSelectOption, GroupFilterSelectOptionValue, GroupFilterSettings } from './models';

const SELECT_OPTIONS: GroupFilterSelectOption[] = [
  {
    name: 'By name, from A to Z',
    value: GroupFilterSelectOptionValue.NameAsc,
  },
  {
    name: 'By name, from Z to A',
    value: GroupFilterSelectOptionValue.NameDesc,
  },
  {
    name: 'By year, ascending',
    value: GroupFilterSelectOptionValue.YearAsc,
  },
  {
    name: 'By year, descending',
    value: GroupFilterSelectOptionValue.YearDesc,
  },
];

export class GroupFilter extends BaseComponent {
  private static _instance: GroupFilter;
  private icons: (HTMLImageElement | null)[] = [];
  private input: HTMLInputElement | null = null;
  private select: HTMLSelectElement | null = null;
  private searchEvent: CustomEvent<{ value: string | undefined }> = new CustomEvent(GroupFilterEvent.Search, {
    detail: { value: this.settings.searchValue },
  });
  private selectEvent: CustomEvent<{ value: string }> = new CustomEvent(GroupFilterEvent.Sort, {
    detail: { value: this.settings.sortValue.toString() },
  });

  protected element: HTMLElement = document.createElement('div');
  protected template: string = getTemplate();

  static get instance() {
    return GroupFilter._instance;
  }

  constructor(root: HTMLElement | null, private settings: GroupFilterSettings) {
    super(root);
    if (!GroupFilter._instance) {
      GroupFilter._instance = this;
    }
    return GroupFilter._instance;
  }

  public init(): void {
    super.init();
    document.addEventListener('resetFilterChanged', this.onResetChange.bind(this));
  }

  public initConfig(): void {
    this.loadInputConfig(this.settings.searchValue);
    if (this.select) {
      this.onChange(null, this.selectEvent);
    }
  }

  protected attachElement(): void {
    super.attachElement();
    this.initSorting();
    this.initSearch();
    this.initResetButton();
    this.initResetStorageButton();
  }

  protected onResetChange(): void {
    this.loadInputConfig(DEFAULT_SEARCH);
  }

  private initSorting(): void {
    this.select = <HTMLSelectElement>document.querySelector('[data-filter-id="sorting"]');
    SELECT_OPTIONS.forEach((option: GroupFilterSelectOption) => {
      const selected: [boolean, boolean] = option.value === this.settings.sortValue ? [true, true] : [false, false];
      if (this.select) {
        this.select[option.value] = new Option(option.name, option.value.toString(), ...selected);
      }
    });
    this.select.addEventListener('input', this.onChange.bind(this, this.select, this.selectEvent));
  }

  private initSearch(): void {
    this.input = <HTMLInputElement>document.querySelector('[data-filter-id="search"]');
    this.icons = [document.querySelector('[data-filter-id="icon-search"]'), document.querySelector('[data-filter-id="icon-close"]')];
    const [, close] = this.icons;
    close?.addEventListener('click', this.onClose.bind(this, this.searchEvent));
    this.input.addEventListener('input', this.onChange.bind(this, this.input, this.searchEvent));
  }

  private initResetButton(): void {
    const element: HTMLSelectElement = <HTMLSelectElement>document.querySelector('button[type="reset"]');
    const customEvent: CustomEvent<{ value: undefined }> = new CustomEvent('resetFilterChanged', {
      detail: { value: undefined },
    });
    element.addEventListener('click', (event: Event) => {
      event.preventDefault();
      document.dispatchEvent(customEvent);
    });
  }

  private initResetStorageButton(): void {
    const element: HTMLSelectElement = <HTMLSelectElement>document.querySelector('[data-type-id="clear"]');
    const customEvent: CustomEvent<{ value: undefined }> = new CustomEvent('resetStorageChanged', {
      detail: { value: undefined },
    });
    element.addEventListener('click', (event: Event) => {
      event.preventDefault();
      document.dispatchEvent(customEvent);
    });
  }

  private loadInputConfig(value: string): void {
    if (this.input) {
      this.input.value = value;
      this.toggleIcons();
      this.searchEvent.detail.value = value;
      this.root?.dispatchEvent(this.searchEvent);
    }
  }

  private onChange(element: HTMLSelectElement | HTMLInputElement | null, event: CustomEvent<{ value: string | undefined }>): void {
    if (event.type === GroupFilterEvent.Search) {
      this.toggleIcons();
    }
    if (element) {
      event.detail.value = element.value;
    }
    this.root?.dispatchEvent(event);
  }

  private onClose(event: CustomEvent<{ value: string | undefined }>): void {
    if (this.input) {
      this.input.value = '';
      this.onChange(this.input, event);
    }
  }

  private toggleIcons(): void {
    const hasValue = !!this.input?.value?.length;
    const [search, close] = this.icons;
    if (hasValue) {
      close?.classList.remove('hidden');
      search?.classList.add('hidden');
    } else {
      search?.classList.remove('hidden');
      close?.classList.add('hidden');
    }
  }
}
