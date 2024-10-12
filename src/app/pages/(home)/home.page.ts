import { injectContentFiles } from '@analogjs/content';
import { Component, inject } from '@angular/core';
// import { CATEGORIES } from '@app/core/data/categories';
import { Category } from '@app/core/models/repository/catalog/category.model';
import { TranslatorService } from '@app/core/services/translate/translator.service';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';

@Component({
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './home.page.html',
})
export default class IndexPage {
  translatorService = inject(TranslatorService);

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
  constructor() {
    console.log(this.categories);
  }
  loadTranslateService() {
    // this.fs.translateService.translateWord('hello');
  }
}
