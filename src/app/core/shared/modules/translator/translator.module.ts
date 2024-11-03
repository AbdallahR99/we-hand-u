import { importProvidersFrom, TransferState } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../../utils/i18n.utils/translator.utils';
import { HttpClient } from '@angular/common/http';
import { TranslateBrowserLoader } from '@core/shared/utils/i18n.utils/i18n-browser-loader';
import { APP_SETTINGS } from '@app/core/constants/app-settings.constants';

export const provideClientTranslatorModule = () =>
  importProvidersFrom(
    TranslateModule.forRoot({
      defaultLanguage: APP_SETTINGS.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useClass: TranslateBrowserLoader,
        // useFactory: translateBrowserLoaderFactory,
        // useFactory: createTranslateLoader,
        deps: [HttpClient, TransferState],
        // deps: [HttpClient],
      },
    })
  );
