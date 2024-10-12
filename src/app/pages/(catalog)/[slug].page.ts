import { TranslatorService } from '@core/services/translate/translator.service';
import {
  injectActivatedRoute,
  injectRouter,
  MetaTag,
  RouteMeta,
} from '@analogjs/router';
import { Component, inject, Input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
} from '@angular/router';
import { Category } from '@app/core/models/repository/catalog/category.model';
import { APP_ROUTES } from '@app/core/constants/routes';
import { catalogRouteMeta } from '@app/core/shared/utils/fetch-category.metadata';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';
import {
  injectContent,
  injectContentFiles,
  MarkdownComponent,
} from '@analogjs/content';

export function injectActiveCatalogAttributes(
  route: ActivatedRouteSnapshot
): Category {
  route = route;
  const slug = route.params['slug'];
  const catalogPost = injectContentFiles<Category>(
    (contentFile) =>
      contentFile.filename.includes('/catalog/') &&
      contentFile.attributes.slug === slug
  )[0];
  return catalogPost.attributes;
}

// export interface ServiceAttributes {
//   title: string;
//   titleEn: string;
//   slug: string;
//   slugEn: string;
//   description: string;
//   descriptionEn: string;
//   coverImage: string;
// }

export const catalogTitleResolver: ResolveFn<string> = (route) => {
  const postAttributes = injectActiveCatalogAttributes(route);

  return postAttributes.title;
};
export const catalogMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const postAttributes = injectActiveCatalogAttributes(route);

  return [
    {
      name: 'description',
      content: postAttributes.description,
    },
    {
      name: 'author',
      content: 'Analog Team',
    },
    {
      property: 'og:title',
      content: postAttributes.title,
    },
    {
      property: 'og:description',
      content: postAttributes.description,
    },
    {
      property: 'og:image',
      content: postAttributes.iconUrl,
    },
  ];
};
export const routeMeta: RouteMeta = {
  title: catalogTitleResolver,
  meta: catalogRouteMeta,
};
@Component({
  standalone: true,
  imports: [SHARED_MODULES, MarkdownComponent],
  template: ` <ng-container *ngIf="catalogPost$ | async as post">
    <h1>{{ post.attributes.title }}</h1>
    <analog-markdown [content]="post.content"></analog-markdown>
  </ng-container>`,
  styleUrls: ['./[slug].page.scss'],
  host: {
    class: 'catalog-page',
  },
})
export default class CatalogPage {
  routes = APP_ROUTES;
  route = inject(ActivatedRoute);

  activatedRoute = inject(ActivatedRoute);

  catalogPost$ = injectContent<Category>({
    customFilename: `catalog/${encodeURIComponent(
      this.route.snapshot.params['slug']
    )}`,
  });
}
