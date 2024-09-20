import { Base } from '../base.model';

export class City extends Base {
  public name: string = '';
  public nameEn: string = '';
  public countryId: string = '';
  public countryName: string = '';
  public countryNameEn: string = '';

  constructor(jsonData: City) {
    super();
    Object.assign(this, jsonData);
  }
}
