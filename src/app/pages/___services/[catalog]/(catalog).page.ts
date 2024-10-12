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
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';
import { injectContentFiles, MarkdownComponent } from '@analogjs/content';
import { ServiceAttributes } from '@app/core/models/attributes/service.attributes';

export const routeMeta: RouteMeta = {
  // title: 'TEsseest',
  meta: catalogRouteMeta,
};

@Component({
  standalone: true,
  imports: [SHARED_MODULES, MarkdownComponent],
  template: ` <p>catalog page works!!</p>
    <ul>
      <li *ngFor="let post of posts">
        <a [routerLink]="['./', post.slug]">{{ post.attributes.title }}</a>
      </li>
    </ul>
    <p>category name {{ catalog }}</p>`,
})
export default class CatalogPage {
  routes = APP_ROUTES;
  route = inject(ActivatedRoute);
  @Input() catalog?: string;

  // @Input() category?: Category;
  activatedRoute = inject(ActivatedRoute);
  readonly posts = injectContentFiles<ServiceAttributes>(
    (contentFile) =>
      // contentFile.filename.includes('/src/content/blog/')
      contentFile.attributes.categorySlug ===
      (this.route.snapshot.params['catalog'] as string)
  );
  constructor() {
    console.log(this.posts);
    console.log(this.catalog);
    console.log(this.activatedRoute, 'activatedRoute');
  }
}
