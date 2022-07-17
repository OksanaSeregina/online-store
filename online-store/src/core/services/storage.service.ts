import { STORAGE_KEY } from '../../constants';
import { IStorage } from './models';

export class StorageService {
  private static _instance: StorageService;

  constructor() {
    if (!StorageService._instance) {
      StorageService._instance = this;
    }
    return StorageService._instance;
  }

  public set(key: keyof IStorage, value: unknown): void {
    const storage: IStorage = this.getStorage();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage ? { ...storage, [key]: value } : { [key]: value }));
  }

  public get(key: keyof IStorage): unknown {
    const storage: IStorage = this.getStorage();
    if (storage) {
      return storage[key];
    }
  }

  public clear(): void {
    localStorage.setItem(STORAGE_KEY, '');
  }

  private getStorage(): IStorage {
    const storage: string | null = localStorage.getItem(STORAGE_KEY);
    return storage ? <IStorage>JSON.parse(storage) : <IStorage>{};
  }
}
