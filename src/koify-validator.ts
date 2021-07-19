export class KoifyValidator {
  public static isInteger(input: any): boolean {
    return KoifyValidator.isNumber(input) && !(input % 1);
  }

  public static isFloat(input: any): boolean {
    return KoifyValidator.isNumber(input) && (input % 1 !== 0);
  }

  public static isNumber(input: any): boolean {
    return typeof input === 'number' && !Number.isNaN(input) && Number.isFinite(input);
  }

  public static isString(input: any): boolean {
    return typeof input === 'string';
  }

  public static isObject(input: any): boolean {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
  }

  public static isArray(input: any): boolean {
    return typeof input === 'object' && Array.isArray(input);
  }
}

export default KoifyValidator;
