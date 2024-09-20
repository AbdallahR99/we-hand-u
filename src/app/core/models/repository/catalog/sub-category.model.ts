import { Guid } from 'guid-ts';
import { Base, IUrlSlug } from '../base.model';

export class SubCategory extends Base implements IUrlSlug {
  public name: string = '';
  public nameEn: string = '';
  public description: string = '';
  public descriptionEn: string = '';
  public slug: string = '';
  public categoryId: Guid = Guid.empty();
  public categoryName: string = '';
  public categoryNameEn: string = '';
  public iconUrl: string = '';

  constructor(jsonData: SubCategory) {
    super();
    Object.assign(this, jsonData);
  }
}
