import { TranslatorService } from '@core/services/translate/translator.service';
import {
  injectActivatedRoute,
  injectRouter,
  MetaTag,
  RouteMeta,
} from '@analogjs/router';
import { Component, inject, input, Input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
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
import { MdReplacementPipe } from '@app/core/shared/pipes/md-replacement.pipe';
import { cities, citiesAr } from '@app/core/data/cities';
import { injectActiveCatalogAttributes } from '@app/core/shared/utils/get-catalog-attributes';
import { catalogGaurdResolver } from '@app/core/shared/guards/catalog.guard';
// import { c } from 'vite/dist/node/types.d-aGj9QkWt';
// export let catalogAttributes: Category | undefined;
// export function injectActiveCatalogAttributes(
//   route: ActivatedRouteSnapshot
// ): Category {
//   if (catalogAttributes) {
//     if (catalogAttributes.slug === route.params['slug']) {
//       return catalogAttributes;
//     }
//   }
//   const slug = route.params['slug'];
//   const catalogPost = injectContentFiles<Category>(
//     (contentFile) =>
//       contentFile.filename.includes('/catalog/') &&
//       contentFile.attributes.slug === slug
//   )[0];
//   return (catalogAttributes = catalogPost.attributes);
// }

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
  const inWord = postAttributes.lang === 'ar' ? ' في ' : ' in ';
  return postAttributes.title + inWord + route.params['city'];
};
export const catalogMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const postAttributes = injectActiveCatalogAttributes(route);
  const translatorService = inject(TranslatorService);
  translatorService.setCurrentLang(postAttributes.lang);
  const inWord = postAttributes.lang === 'ar' ? ' في ' : ' in ';
  return [
    {
      name: 'description',
      content: postAttributes.description + inWord + route.params['city'],
    },
    {
      name: 'author',
      content: 'WeHandU',
    },
    {
      property: 'og:title',
      content: postAttributes.title + inWord + route.params['city'],
    },
    {
      property: 'og:description',
      content: postAttributes.description + inWord + route.params['city'],
    },
    {
      property: 'og:image',
      content: postAttributes.iconUrl + inWord + route.params['city'],
    },
  ];
};

export const catalogCityGaurdResolver: CanActivateFn = (route, state) => {
  const postAttributes = injectActiveCatalogAttributes(route);
  const city = route.params['city'];
  if (postAttributes.lang === 'ar') {
    if (!citiesAr[city]) return false;
  } else {
    if (!cities[city]) return false;
  }
  return true;
};
export const routeMeta: RouteMeta = {
  title: catalogTitleResolver,
  meta: catalogRouteMeta,
  canActivate: [catalogCityGaurdResolver, catalogGaurdResolver],
  resolve: {
    cityName: async (route: ActivatedRouteSnapshot) => {
      const postAttributes = injectActiveCatalogAttributes(route);
      const city = route.params['city'];
      if (postAttributes.lang === 'ar') {
        return citiesAr[city].nameAr;
      } else {
        return cities[city].nameEn;
      }
    },
  },
};
@Component({
  standalone: true,
  imports: [SHARED_MODULES, MarkdownComponent, MdReplacementPipe],
  template: ` <ng-container *ngIf="catalogPost$ | async as post">
    <h1 class="text-center">
      {{
        post.attributes.title +
          (post.attributes.lang == 'ar' ? ' في ' : ' in ') +
          cityName | titlecase
      }}
    </h1>
    <analog-markdown
      [content]="
        post.content | mdReplacement : ['{city}'] : [cityName! | titlecase]
      "
    ></analog-markdown>
  </ng-container>`,
  styleUrls: ['./[slug].page.scss'],
  host: {
    class: 'catalog-page',
  },
})
export default class CityCatalogPage {
  routes = APP_ROUTES;
  route = inject(ActivatedRoute);

  activatedRoute = inject(ActivatedRoute);

  @Input() cityName?: string;

  catalogPost$ = injectContent<Category>({
    customFilename: `catalog/${encodeURIComponent(
      this.route.snapshot.params['slug']
    )}`,
  });
}
