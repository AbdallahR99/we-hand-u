import { Base, IUrlSlug } from '../base.model';

export class Category extends Base implements IUrlSlug {
  public name: string = '';
  public nameEn: string = '';
  public description: string = '';
  public descriptionEn: string = '';
  public slug: string = '';
  public iconUrl: string = '';
  constructor(jsonData: Category) {
    super();
    Object.assign(this, jsonData);
  }
}
