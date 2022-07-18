import { CardService } from './card.service';

const DB_MOCK = {
  cards: [
    {
      id: '1',
      name: 'Way Kambas Maple',
      image: '/images-serever/image1.png',
      count: '6',
      year: '2021',
      series: 'Maple',
      color: 'light',
      size: '42',
      favorite: true,
    },
  ],
};

describe('CardService', () => {
  const service: CardService = new CardService();

  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('should create singleton CardService', () => {
    const newService: CardService = new CardService();
    expect(newService).toBe(service);
  });

  it('should get cards on success respone', async () => {
    jest.mock('../../db.json', () => DB_MOCK);
    await expect(service.get()).resolves.toEqual(DB_MOCK.cards);
  });

  it('should log error on fail', async () => {
    jest.mock('../../db.json', () => {
      throw new Error('Error');
    });
    await expect(service.get()).rejects.toThrow('Error');
  });
});
