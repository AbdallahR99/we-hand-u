import { BaseUrlSlug } from '../base.model';

export class City extends BaseUrlSlug {
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
