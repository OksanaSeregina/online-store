import { inRange } from './inRange.helper';

describe('inRange: ', () => {
  it('should return true if value in range', () => {
    const range: [string, string] = ['1', '11'];
    const value = '2';
    expect(inRange(range, value)).toBe(true);
  });

  it('should return true if value is range value', () => {
    const range: [string, string] = ['1', '11'];
    const value = '11';
    expect(inRange(range, value)).toBe(true);
  });

  it('should return true if empty range', () => {
    const range: [string, string] = ['', ''];
    const value = '11';
    expect(inRange(range, value)).toBe(true);
  });

  it('should return false if value out of range', () => {
    const range: [string, string] = ['1', '11'];
    const value = '21';
    expect(inRange(range, value)).toBe(false);
  });
});
