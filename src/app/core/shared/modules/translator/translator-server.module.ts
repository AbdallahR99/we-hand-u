import { importProvidersFrom, TransferState } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslateServerLoader } from '@core/shared/utils/i18n.utils/i18n-server-loader';
import { PlatformService } from '@core/services/platform/platform.service';
import { APP_SETTINGS } from '@app/core/constants/app-settings.constants';

export const provideServerTranslatorModule = () =>
  importProvidersFrom(
    TranslateModule.forRoot({
      isolate: true,
      defaultLanguage: APP_SETTINGS.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useClass: TranslateServerLoader,
        // useFactory: translateBrowserLoaderFactory,
        // useFactory: createTranslateLoader,
        deps: [TransferState, PlatformService],
        // deps: [HttpClient],
      },
    })
  );
