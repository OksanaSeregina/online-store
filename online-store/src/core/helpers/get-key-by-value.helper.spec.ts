import { getKeyByValue } from './get-key-by-value.helper';

const TEST_MOCK = {
  A: '11',
  B: '12',
  C: '13',
};

enum TEST_ENUM_MOCK {
  A = '11',
  B = '12',
  C = '13',
}

describe('getKeyByValue: ', () => {
  it('should return object key by value', () => {
    const obj: Record<string, unknown> = TEST_MOCK;
    const value = '11';
    const expected = 'A';
    expect(getKeyByValue(value, obj)).toBe(expected);
  });

  it('should return enum key by value', () => {
    const obj: Record<string, unknown> = TEST_ENUM_MOCK;
    const value = '11';
    const expected = 'A';
    expect(getKeyByValue(value, obj)).toBe(expected);
  });
});
