import { Base } from '../base.model';

export class Currency extends Base {
  public name: string = '';
  public nameEn: string = '';
  public code: string = '';
  public codeEn: string = '';
  public symbol: string = '';

  constructor(jsonData: Currency) {
    super();
    Object.assign(this, jsonData);
  }
}
