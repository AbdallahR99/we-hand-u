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

// export const routeMeta: RouteMeta = {
//   // title: 'TEsseest',
//   meta: catalogRouteMeta,
// };

export const routeMeta: RouteMeta = {
  title: 'About Analog',
  canActivate: [() => true],
  providers: [SHARED_MODULES, MarkdownComponent],
};

@Component({
  standalone: true,
  imports: [SHARED_MODULES, MarkdownComponent],
  template: `
    <section class="categories mt-8 max-md:mx-4">
      <div
        class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto text-center "
      >
        @for (category of categories; track category.id) {
        <a
          [routerLink]="[
            isEn
              ? routes.CATALOG_LIST + '/' + category.slugEn
              : routes.CATALOG_LIST + '/' + category.slug
          ]"
        >
          <div
            class="category-card drop-shadow-sm bg-white shadow-lg hover:shadow-2xl h-full hover:-translate-y-4 hover:cursor-pointer transition-all rounded-lg overflow-hidden"
          >
            <img
              [src]="category.iconUrl"
              [alt]="category.nameEn"
              class="h-12 object-contain mx-auto mt-3"
            />
            <div class="p-4">
              <h2 class="text-2xl font-bold">
                {{ isEn ? category.nameEn : category.name }}
              </h2>
              <p class="mt-2 text-gray-600">
                {{ isEn ? category.descriptionEn : category.description }}
              </p>
              <span
                class="block mt-2 text-sm font-semibold text-primary hover:underline"
                >{{ 'View more' | translate }}</span
              >
            </div>
          </div>
        </a>
        }
      </div>
    </section>
  `,
  // template: ` <p>catalog pageسس works!!</p>
  //   <ul>
  //     <li *ngFor="let post of posts">
  //       <a [routerLink]="[routes.CATALOG_ITEM, post.slug]">{{
  //         post.attributes.title
  //       }}</a>
  //     </li>
  //   </ul>
  //   <p>category name {{ category?.name }}</p>`,
})
export default class CatalogPage {
  routes = APP_ROUTES;
  categories: Category[] = CATEGORIES;
  @Input() category?: Category;
  translatorService = inject(TranslatorService);

  activatedRoute = inject(ActivatedRoute);
  get isEn(): boolean {
    return this.translatorService.getCurrentLang() === 'en';
  }
  readonly posts = injectContentFiles<ServiceAttributes>((contentFile) =>
    contentFile.filename.includes('/src/content/blog/')
  );
  constructor() {
    console.log(this.posts);

    console.log(this.activatedRoute, 'activatedRoute');
  }
}
