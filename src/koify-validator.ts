export class KoifyValidator {
  public static isNumber(input: any): boolean {
    return typeof input === 'number' && !Number.isNaN(input) && Number.isFinite(input);
  }
}
