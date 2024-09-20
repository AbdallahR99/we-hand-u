/**
 *
 * @interface Base
 */

import { Guid } from 'guid-ts';

export abstract class BaseId {
  public id: Guid = Guid.empty();
}

export abstract class Base extends BaseId {
  public createdBy: string | null = null;
  public updatedBy: string | null = null;
  public deletedBy: string | null = null;
  public isDeleted: boolean = false;
  public createdDate: Date | string = new Date();
  public updatedDate: Date | string = new Date();
  public deletedDate: Date | string = new Date();
  constructor(public jsonData?: Base) {
    super();
    if (jsonData) {
      Object.assign(this, jsonData);
    }
  }
}

export interface IUrlSlug {
  slug: string;
}

export interface ISeoMeta extends IUrlSlug {
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  metaKeywords: string;
  metaKeywordsEn: string;
  metaImageUrl: string;
}

export abstract class BaseSeo extends Base implements ISeoMeta {
  // SEO stuff
  public slug: string = '';
  public metaTitle: string = '';
  public metaTitleEn: string = '';
  public metaDescription: string = '';
  public metaDescriptionEn: string = '';
  public metaKeywords: string = '';
  public metaKeywordsEn: string = '';
  public metaImageUrl: string = '';

  constructor() {
    super();
  }
}
