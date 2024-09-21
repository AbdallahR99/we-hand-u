import { Guid } from 'guid-ts';
import { BaseSeo } from '../base.model';
import { SubCategory } from './sub-category.model';

export class Catalog extends BaseSeo {
  // catalog details
  public name: string = '';
  public nameEn: string = '';
  public description: string = '';
  public descriptionEn: string = '';
  public imageUrls: string[] = [];

  // vendor details
  public vendorName: string = '';
  public vendorRate: number = 0;
  public vendorRateCount: number = 0;
  public vendorId: Guid = Guid.empty();

  // subcategory details (contains the categories)
  public subCategories: SubCategory[] = [];

  // address
  public cityId: Guid = Guid.empty();
  public cityName: string = '';
  public cityNameEn: string = '';

  public latitude: number = 0;
  public longitude: number = 0;
  public coverageRadius: number = 0;

  public address: string = '';
  public addressEn: string = '';

  // contact infos
  public phoneNumber: string[] = [];
  public email: string = '';

  // pricing (Server rendering only, we may need a raw JSON data for client side without js)
  public originalPrice: number = 0;
  public discountPrice: number = 0;
  public finalPrice: number = 0;
  public discountRate: number = 0;
  public currencyId: Guid = Guid.empty();
  public currencyName: string = '';
  public currencyNameEn: string = '';

  // pricing details
  public pricingDetails: string = '';

  constructor(jsonData: Catalog) {
    super();
    Object.assign(this, jsonData);
    this.subCategories =
      jsonData.subCategories?.map((subCat) => new SubCategory(subCat)) || [];
  }
}
