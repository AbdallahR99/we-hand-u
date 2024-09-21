import { Guid } from 'guid-ts';
import { BaseSeo } from '../base.model';

export class SubCategory extends BaseSeo {
  public name: string = '';
  public nameEn: string = '';
  public description: string = '';
  public descriptionEn: string = '';
  public categoryId: Guid = Guid.empty();
  public categoryName: string = '';
  public categoryNameEn: string = '';
  public iconUrl: string = '';

  constructor(jsonData: SubCategory) {
    super();
    Object.assign(this, jsonData);
  }
}
