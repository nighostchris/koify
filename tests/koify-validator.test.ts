import { KoifyValidator } from '../src';

describe('KoifyValidator', () => {
  test ('isInteger("3")', () => {
    const result = KoifyValidator.isInteger('3');
    expect(result).toBeTruthy;
  });

  test ('isInteger(3)', () => {
    const result = KoifyValidator.isInteger(3);
    expect(result).toBeTruthy;
  });

  test ('isInteger(3.2)', () => {
    const result = KoifyValidator.isInteger(3.2);
    expect(result).toBeFalsy;
  });

  test ('isInteger("testing")', () => {
    const result = KoifyValidator.isInteger('testing');
    expect(result).toBeFalsy;
  });

  test ('isFloat("3")', () => {
    const result = KoifyValidator.isFloat('3');
    expect(result).toBeFalsy;
  });

  test ('isFloat(3)', () => {
    const result = KoifyValidator.isFloat(3);
    expect(result).toBeFalsy;
  });

  test ('isFloat(3.2)', () => {
    const result = KoifyValidator.isFloat(3.2);
    expect(result).toBeTruthy;
  });

  test ('isFloat("testing")', () => {
    const result = KoifyValidator.isFloat('3.2');
    expect(result).toBeFalsy;
  });

  test ('isString(3)', () => {
    const result = KoifyValidator.isString(3);
    expect(result).toBeFalsy;
  });

  test ('isString("testing")', () => {
    const result = KoifyValidator.isString('testing');
    expect(result).toBeTruthy;
  });

  test ('isObject({ c: 4, d: 5 })', () => {
    const result = KoifyValidator.isObject({ c: 4, d: 5 });
    expect(result).toBeTruthy;
  });

  test ('isObject(null)', () => {
    const result = KoifyValidator.isObject(null);
    expect(result).toBeFalsy;
  });

  test ('isObject([1, 2, 3])', () => {
    const result = KoifyValidator.isObject([1, 2, 3]);
    expect(result).toBeFalsy;
  });

  test ('isArray([1, 2, 3])', () => {
    const result = KoifyValidator.isArray([1, 2, 3]);
    expect(result).toBeTruthy;
  });

  test ('isArray(null)', () => {
    const result = KoifyValidator.isArray(null);
    expect(result).toBeFalsy;
  });

  test ('isArray({ c: 4, d: 5 })', () => {
    const result = KoifyValidator.isArray({ c: 4, d: 5 });
    expect(result).toBeFalsy;
  });
});
