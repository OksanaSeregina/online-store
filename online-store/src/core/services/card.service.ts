import { ICard } from '../../components';

// Singleton
export class CardService {
  private static instance: CardService;

  constructor() {
    if (!CardService.instance) {
      CardService.instance = this;
    }
    return CardService.instance;
  }

  public get(): Promise<ICard[]> {
    // NOTE: have dynamic import instead fetch to avoid using json or node server
    return import('../../db.json').then((obj: { cards: ICard[] }) => obj.cards);
  }
}
