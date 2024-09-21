import { BaseSeo } from '../base.model';

export class Category extends BaseSeo {
  public name: string = '';
  public nameEn: string = '';
  public description: string = '';
  public descriptionEn: string = '';
  public iconUrl: string = '';
  constructor(jsonData: Partial<Category>) {
    super();
    Object.assign(this, jsonData);
  }
}
