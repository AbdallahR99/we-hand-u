import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  TransferState,
} from '@angular/core';
import {
  provideClientHydration,
  withI18nSupport,
} from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { LocalStorageKeys } from '@core/constants/local_storage';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { translateBrowserLoaderFactory } from './core/shared/utils/i18n-browser-loader';
import { withComponentInputBinding } from '@angular/router';

export function tokenGetter() {
  // if (!localStorage) return null;
  // return localStorage.getItem(LocalStorageKeys.TOKEN);
}
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideAnimations(),
    provideFileRouter(withComponentInputBinding()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'ar',
        loader: {
          provide: TranslateLoader,

          // useFactory: translateBrowserLoaderFactory,
          useFactory: createTranslateLoader,
          deps: [HttpClient, TransferState],
          // deps: [HttpClient],
        },
      })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(withI18nSupport()),
    provideContent(withMarkdownRenderer()),
  ],
};
