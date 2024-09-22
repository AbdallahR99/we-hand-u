import { Component, inject } from '@angular/core';
import { CATEGORIES } from '@app/core/data/categories';
import { Category } from '@app/core/models/repository/catalog/category.model';
import { TranslatorService } from '@app/core/services/translate/translator.service';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';
import { Guid } from 'guid-ts';
// import { FacadeService } from '@app/core/services/facade-service.service';

@Component({
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './(home).page.html',
  host: {
    ngSkipHydration: '',
  },
})
export default class HomePage {
  translatorService = inject(TranslatorService);

  categories: Category[] = CATEGORIES;
  get isEn(): boolean {
    return this.translatorService.getCurrentLang() === 'en';
  }
  // fs = inject(FacadeService);
  constructor() {}
  loadTranslateService() {
    // this.fs.translateService.translateWord('hello');
  }
}
