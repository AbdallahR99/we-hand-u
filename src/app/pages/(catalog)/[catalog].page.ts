import { TranslatorService } from '@core/services/translate/translator.service';
import { MetaTag, RouteMeta } from '@analogjs/router';
import { Component, inject, Input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
} from '@angular/router';
import { CATEGORIES } from '@app/core/data/categories';
import { l } from 'vite/dist/node/types.d-aGj9QkWt';
import { BaseSeo } from '@app/core/models/repository/base.model';
import { Category } from '@app/core/models/repository/catalog/category.model';
import { APP_ROUTES } from '@app/core/constants/routes';
import { catalogRouteMeta } from '@app/core/shared/utils/fetch-category.metadata';

export const routeMeta: RouteMeta = {
  // title: 'TEsseest',
  meta: catalogRouteMeta,
};

@Component({
  standalone: true,
  imports: [],
  template: ` <p>catalog page works!!</p>
    <p>category name {{ category?.name }}</p>`,
})
export default class CatalogPage {
  @Input() category?: Category;
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    console.log(this.activatedRoute, 'activatedRoute');
  }
}
