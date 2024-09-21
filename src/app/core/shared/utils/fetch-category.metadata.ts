import { MetaTag } from '@analogjs/router';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  Router,
  RedirectCommand,
  ResolveFn,
  ActivatedRoute,
} from '@angular/router';
import { APP_ROUTES } from '@app/core/constants/routes';
import { CATEGORIES } from '@app/core/data/categories';
import { BaseSeo } from '@app/core/models/repository/base.model';
import { Category } from '@app/core/models/repository/catalog/category.model';
import { TranslatorService } from '@app/core/services/translate/translator.service';
export const categoriesSlugs: {
  [key: string]: { category?: Category; lang?: string } | null;
} = {};
function fetchCategory(
  route: ActivatedRouteSnapshot
): { category?: Category; lang?: string } | undefined {
  const categorySlug = route.params['catalog'] as string;
  if (!categorySlug) return undefined;
  if (categoriesSlugs[categorySlug] === null) return undefined;
  if (categoriesSlugs[categorySlug])
    return categoriesSlugs[categorySlug] as {
      category?: Category;
      lang?: string;
    };

  const translatorService = inject(TranslatorService);
  if (!translatorService.getCurrentLang()) {
    translatorService.setCurrentLang('ar');
  }

  // if english
  if (translatorService.getCurrentLang() === 'en') {
    if (categorySlug.toLowerCase() == SERVICE_META.metaTitleEn.toLowerCase())
      return { lang: 'en' };
    const category = CATEGORIES.find((c) => c.slugEn === categorySlug);
    if (category) {
      return (categoriesSlugs[categorySlug] = { category, lang: 'en' });
    }

    if (categorySlug.toLowerCase() == SERVICE_META.metaTitle.toLowerCase()) {
      translatorService.setCurrentLang('ar');
      return { lang: 'ar' };
    }
    const categoryAr = CATEGORIES.find((c) => c.slug === categorySlug);
    if (categoryAr) {
      translatorService.setCurrentLang('ar');
      return (categoriesSlugs[categorySlug] = {
        category: categoryAr,
        lang: 'ar',
      });
    }
  }

  // if arabic
  if (translatorService.getCurrentLang() === 'ar') {
    if (categorySlug.toLowerCase() == SERVICE_META.metaTitle.toLowerCase())
      return { lang: 'ar' };
    const category = CATEGORIES.find((c) => c.slug === categorySlug);
    if (category) {
      return (categoriesSlugs[categorySlug] = { category, lang: 'ar' });
    }

    if (categorySlug.toLowerCase() == SERVICE_META.metaTitleEn.toLowerCase()) {
      translatorService.setCurrentLang('en');
      return (categoriesSlugs[categorySlug] = { lang: 'en' });
    }
    const categoryEn = CATEGORIES.find((c) => c.slugEn === categorySlug);
    if (categoryEn) {
      translatorService.setCurrentLang('en');
      return (categoriesSlugs[categorySlug] = {
        category: categoryEn,
        lang: 'ar',
      });
    }
  }
  categoriesSlugs[categorySlug] = null;
  return undefined;

  // const category = CATEGORIES.find((c) => c.slug === categorySlug);
  // return category;
}

// export const routeMeta: RouteMeta = {
//   title: 'About Analog',
//   canActivate: [() => 'false'],
//   // providers: [AboutService],
// };

const SERVICE_META = new BaseSeo({
  metaTitle: 'الخدمات',
  metaTitleEn: 'Services',
  metaDescription: 'الخدمات',
  metaDescriptionEn: 'services',
  metaKeywords: 'الخدمات',
  metaKeywordsEn: 'Services',
  metaImageUrl: '',
  slug: 'الخدمات',
  slugEn: 'services',
});

export const catalogRouteMeta: ResolveFn<MetaTag[]> = (route) => {
  const data = fetchCategory(route);
  const router = inject(Router);
  const metaTitle = inject(Title);
  // const activatedRoute = inject(ActivatedRoute);
  if (!data) return new RedirectCommand(router.parseUrl(APP_ROUTES.NOT_FOUND));
  const { category, lang } = data;
  const meta: BaseSeo = category || SERVICE_META;
  const isEn = lang === 'en';
  metaTitle.setTitle(isEn ? meta.metaTitleEn : meta.metaTitle);
  // if (!category) {
  //   (route.data ??= {})['category'] = category;
  //   activatedRoute.snapshot.data = route.data;
  // }
  return [
    {
      name: 'description',
      content: isEn ? meta.metaDescriptionEn : meta.metaDescription,
    },

    {
      property: 'og:title',
      content: isEn ? meta.metaTitleEn : meta.metaTitle,
    },
    {
      property: 'og:description',
      content: isEn ? meta.metaDescriptionEn : meta.metaDescription,
    },
    {
      property: 'og:image',
      content: isEn ? meta.metaImageUrl : meta.metaImageUrl,
    },
  ];
};
