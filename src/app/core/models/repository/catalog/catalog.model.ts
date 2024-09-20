import { Guid } from 'guid-ts';
import { BaseSeo } from '../base.model';

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

  // // category
  // public categoryId: Guid = Guid.empty();
  // public categoryName: string = '';
  // public categoryNameEn: string = '';

  // // subcategoy
  // public subCategoryId: Guid = Guid.empty();
  // public subCategoryName: string = '';
  // public subCategoryNameEn: string = '';

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

  // pricing (Server rendering only, we may need a raw JSON data for client side without js)
  public originalPrice: number = 0;
  public discountPrice: number = 0;
  public finalPrice: number = 0;
  public discountRate: number = 0;
  public currencyId: Guid = Guid.empty();
  public currencyName: string = '';
  public currencyNameEn: string = '';

  constructor(jsonData: Catalog) {
    super();
    Object.assign(this, jsonData);
  }
}
