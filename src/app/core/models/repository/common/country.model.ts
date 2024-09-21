import { BaseUrlSlug } from '../base.model';

export class Country extends BaseUrlSlug {
  public name: string = '';
  public nameEn: string = '';
  public code: string = '';
  public flagUrl: string = '';

  constructor(jsonData: Country) {
    super();
    Object.assign(this, jsonData);
  }
}
