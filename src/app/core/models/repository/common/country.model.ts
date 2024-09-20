import { Base } from '../base.model';

export class Country extends Base {
  public name: string = '';
  public nameEn: string = '';

  constructor(jsonData: Country) {
    super();
    Object.assign(this, jsonData);
  }
}
