import { ICard } from '../../components';

export class CardService {
  private static _instance: CardService;

  constructor() {
    if (!CardService._instance) {
      CardService._instance = this;
    }
    return CardService._instance;
  }

  public get(): Promise<ICard[] | void> {
    // NOTE: have dynamic import instead fetch to avoid using json or node server
    return import('../../db.json').then((obj: { cards: ICard[] }) => obj.cards);
  }
}
