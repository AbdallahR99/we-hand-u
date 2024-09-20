import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { LocalStorageKeys } from '@app/core/constants/local_storage';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
// import { HOST_LANGAUGE } from 'hosts';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) // @Optional() @Inject(HOST_LANGAUGE) private lang: string,
  {}
  onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translate.onLangChange;
  }
  langOb = this.translate.onLangChange.asObservable();
  getCurrentLang(): string | null {
    // const isServer = isPlatformServer(this.platformId);
    // if (isServer) {
    //   return this.lang;
    // }

    // this.activatedRoute.snapshot.queryParamMap?.get(GlobalNames.langaugeParam)
    return localStorage.getItem(LocalStorageKeys.LANG);
  }

  setCurrentLang(val: string): void {
    if (!val) {
      val = 'ar';
    }

    this.translate.use(val);
    this.translate.setDefaultLang(val);
    this.translate.currentLang = val;
    localStorage.setItem('Lang', val);
    if (val === 'ar') {
      // this.setLangagueQueryParam('ar');
      this.document.documentElement.setAttribute('dir', 'rtl');
      this.document.documentElement.lang = 'ar';
      this.document.getElementsByTagName('html')[0]?.setAttribute('lang', 'ar');
      this.document.getElementsByTagName('html')[0]?.setAttribute('dir', 'rtl');
      this.document.getElementsByTagName('body')[0]?.setAttribute('dir', 'rtl');
      this.document
        .getElementsByTagName('body')[0]
        ?.setAttribute('class', 'rtl');
    }
    if (val === 'en') {
      // this.setLangagueQueryParam('en');
      this.document.documentElement.setAttribute('dir', 'ltr');
      this.document.documentElement.lang = 'en';
      this.document.getElementsByTagName('html')[0]?.setAttribute('lang', 'en');
      this.document.getElementsByTagName('html')[0]?.removeAttribute('dir');
      this.document.getElementsByTagName('body')[0]?.removeAttribute('dir');
      this.document.getElementsByTagName('body')[0]?.removeAttribute('class');
      this.document.getElementsByTagName('html')[0]?.setAttribute('dir', 'ltr');
      this.document.getElementsByTagName('body')[0]?.setAttribute('dir', 'ltr');
      this.document
        .getElementsByTagName('body')[0]
        ?.setAttribute('class', 'ltr');
    }
    localStorage.setItem(LocalStorageKeys.LANG, val);
  }

  // setLangagueQueryParam(value: 'ar' | 'en'): void {
  //   if (value != 'ar' && value != 'en') return;
  //   this.router.navigate([], {
  //     // relativeTo: this.activatedRoute,
  //     queryParams: {
  //       [GlobalNames.langaugeParam]: value == 'en' ? 'en' : null,
  //     },
  //     queryParamsHandling: 'merge',
  //   });
  //   // console.log('i18n', this.activatedRoute.snapshot);

  //   // console.log(this.activatedRoute.snapshot.queryParamMap);
  // }

  translateWord(val: string): string {
    return this.translate?.instant(val || '  ');
  }
}
