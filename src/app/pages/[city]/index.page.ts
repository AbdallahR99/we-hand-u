import { injectContentFiles } from '@analogjs/content';
import { injectActivatedRoute, RouteMeta } from '@analogjs/router';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { APP_SETTINGS } from '@app/core/constants/app-settings.constants';
import { LocalStorageKeys } from '@app/core/constants/local_storage';
import { cities, citiesAr } from '@app/core/data/cities';
// import { CATEGORIES } from '@app/core/data/categories';
import { Category } from '@app/core/models/repository/catalog/category.model';
import { TranslatorService } from '@app/core/services/translate/translator.service';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';

export const cityGaurdResolver: CanActivateFn = (route, state) => {
  const city = route.params['city'];
  if (citiesAr[city] || cities[city]) return true;
  return false;
};

export const routeMeta: RouteMeta = {
  canActivate: [cityGaurdResolver],
  resolve: {
    cityName: async (route: ActivatedRouteSnapshot) => {
      console.log(route);
      const translationService = inject(TranslatorService);
      const city = route.params['city'];

      // return route.params['city'];
      // const translationService = inject(TranslatorService);
      //
      const isAr = citiesAr[city];
      if (isAr) {
        translationService.setCurrentLang('ar');
      } else {
        translationService.setCurrentLang('en');
      }

      if (isAr) {
        const cityData = citiesAr[city];
        if (cityData) {
          localStorage.setItem(LocalStorageKeys.CITY, cityData.slugAr);
          APP_SETTINGS.currentCity = cityData.slugAr;
          return cityData.nameAr;
        }
        // return citiesAr[city].nameAr;
      } else {
        const cityData = cities[city];
        if (cityData) {
          localStorage.setItem(LocalStorageKeys.CITY, cityData.slugEn);
          APP_SETTINGS.currentCity = cityData.slugEn;
          return cityData.nameEn;
        }
        // return cities[city].nameEn;
      }
      return isAr ? citiesAr[city].nameAr : cities[city].nameEn;
    },
  },
};

@Component({
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './(home)/home.page.html',
  styleUrls: ['./(home)/home.page.scss'],
})
export default class IndexPage {
  translatorService = inject(TranslatorService);
  @Input() cityName?: string;
  // categories: Category[] = CATEGORIES;
  readonly categories = injectContentFiles<Category>(
    (contentFile) =>
      contentFile.filename.includes('/src/content/catalog') &&
      contentFile.attributes.lang === 'ar'
  ).sort((a, b) => a.attributes.order - b.attributes.order);
  get isEn(): boolean {
    return this.translatorService.getCurrentLang() === 'en';
  }
  // fs = inject(FacadeService);

  loadTranslateService() {
    // this.fs.translateService.translateWord('hello');
  }
}
