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
import {
  injectContent,
  injectContentFiles,
  MarkdownComponent,
} from '@analogjs/content';
import { ServiceAttributes } from '@app/core/models/attributes/service.attributes';

@Component({
  standalone: true,
  imports: [SHARED_MODULES, MarkdownComponent],
  template: ` <ng-container *ngIf="post$ | async as post">
    <h1>{{ post.attributes.title }}</h1>
    <analog-markdown [content]="post.content"></analog-markdown>
  </ng-container>`,
})
export default class CatalogSlugPage {
  routes = APP_ROUTES;
  route = inject(ActivatedRoute);
  @Input() catalog?: string;

  // @Input() category?: Category;
  activatedRoute = inject(ActivatedRoute);
  readonly post$ = injectContent<ServiceAttributes>({
    // customFilename:
    // 'https://raw.githubusercontent.com/analogjs/analog/refs/heads/beta/README.md',
    param: 'slug',
    subdirectory: 'services',
  });
  constructor() {
    console.log(this.post$);
    console.log(this.catalog);
    console.log(this.activatedRoute, 'activatedRoute');
  }
}
