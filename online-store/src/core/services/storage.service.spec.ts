import { STORAGE_KEY } from '../../constants';
import { IStorage } from './models';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  const storage: StorageService = new StorageService();
  const key: keyof IStorage = 'sortBy';
  const value: string = 'value';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should create singleton StorageService', () => {
    const newStorage: StorageService = new StorageService();
    expect(newStorage).toBe(storage);
  });

  it('should set value to localstorage', () => {
    storage.set(key, value);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(STORAGE_KEY, JSON.stringify({ [key]: value }));
  });

  it('should get value from localstorage', () => {
    const expected: { [key: string]: string } = { [key]: value };
    storage.set(key, value);

    expect(localStorage.getItem(STORAGE_KEY)).toEqual(JSON.stringify(expected));
    expect(storage.get(key)).toEqual(value);
  });

  it('should clear localstorage', () => {
    storage.set(key, value);
    storage.clear();

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(storage.get(key)).toBeUndefined();
  });
});
