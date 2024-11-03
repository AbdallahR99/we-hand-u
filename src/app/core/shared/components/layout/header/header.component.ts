import { injectContentFiles } from '@analogjs/content';
import { injectActivatedRoute, injectRouter } from '@analogjs/router';
import { Component, inject, OnInit } from '@angular/core';
import { APP_SETTINGS } from '@app/core/constants/app-settings.constants';
import { APP_ROUTES } from '@app/core/constants/routes';
import { cities, citiesAr, CityData } from '@app/core/data/cities';
import { Category } from '@app/core/models/repository/catalog/category.model';
import { TranslatorService } from '@app/core/services/translate/translator.service';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LocalStorageKeys } from '@app/core/constants/local_storage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [SHARED_MODULES, MatIconModule, MatMenuModule],
})
export class HeaderComponent implements OnInit {
  get currentCityName(): string {
    return this.isEn
      ? cities[this.currentCity]?.nameEn
      : citiesAr[this.currentCity]?.nameAr;
  }
  get currentCity(): string {
    return APP_SETTINGS.currentCity;
  }
  set currentCity(city: string) {
    APP_SETTINGS.currentCity = city;
    localStorage.setItem(LocalStorageKeys.CITY, city);
  }
  cities = Object.values(cities);
  route = injectActivatedRoute();
  // appRoutes = APP_ROUTES;
  readonly categories = injectContentFiles<Category>((contentFile) =>
    contentFile.filename.includes('/src/content/catalog')
  );
  router = injectRouter();
  translatorService = inject(TranslatorService);
  get isEn(): boolean {
    return this.translatorService.getCurrentLang() === 'en';
  }

  setCurrentCity() {
    const selectedCity = localStorage.getItem(LocalStorageKeys.CITY);
    if (!selectedCity) return;
    const cityEn = cities[selectedCity];
    if (cityEn) {
      this.currentCity = cityEn.nameEn;
      return;
    }
    const cityAr = citiesAr[selectedCity];
    if (cityAr) {
      this.currentCity = cityAr.nameAr;
      return;
    }
  }

  changeCity(city: CityData) {
    const currentPath = this.router.url;

    const currentLang = this.translatorService.getCurrentLang();
    const pathParts = currentPath.split('/');
    const cityParam = decodeURIComponent(pathParts[1]);

    const pathHasCity =
      pathParts.length > 1 && (cities[cityParam] || citiesAr[cityParam]);
    if (pathHasCity) {
      pathParts[1] = this.isEn ? city.slugEn : city.slugAr;
    }
    const newPath = pathParts.join('/');
    console.log('newPath', pathParts[1]);

    this.currentCity = pathParts[1];

    if (newPath !== currentPath) {
      this.router.navigateByUrl(newPath);
    }
  }

  toggleTranslateUrl() {
    const currentPath = this.router.url;
    const currentLang = this.translatorService.getCurrentLang();
    const pathParts = currentPath.split('/');
    if (pathParts.length > 1) {
      const cityParam = decodeURIComponent(pathParts[1]);
      if (currentLang === 'en') {
        if (cities[cityParam]) {
          pathParts[1] = cities[cityParam].slugAr;
        }
      } else {
        if (citiesAr[cityParam]) {
          pathParts[1] = citiesAr[cityParam].slugEn;
        }
      }
      if (pathParts[2]) {
        const categorySlug = decodeURIComponent(pathParts[2]);
        const category = this.categories.find(
          (s) => s.attributes.slug === categorySlug
        );
        if (category) {
          if (currentLang === 'en') {
            pathParts[2] = category.attributes.slugAr;
          } else {
            pathParts[2] = category.attributes.slugEn;
          }
        }
      }

      const newPath = pathParts.join('/');
      this.translatorService.setCurrentLang(currentLang === 'en' ? 'ar' : 'en');
      if (newPath !== currentPath) {
        this.router.navigateByUrl(newPath);
      }
    }
  }

  navItems: {
    path: () => string;
    label: string;
  }[] = [
    {
      path: () => APP_ROUTES.HOME,
      label: 'Home',
    },
    {
      path: () => APP_ROUTES.CATALOG_LIST,
      // this.isEn ? APP_ROUTES.CATALOG_LIST : APP_ROUTES.CATALOG_LIST_AR,
      label: 'Services',
    },
    {
      path: () => APP_ROUTES.BLOG,
      label: 'Blog',
    },
    {
      path: () => APP_ROUTES.ABOUT,
      label: 'About',
    },
  ];

  ngOnInit() {
    // this.setCurrentCity();
  }
}
