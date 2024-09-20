import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
  TransferState,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

import { appConfig } from './app.config';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateServerLoaderFactory } from './core/shared/utils/i18n-server-loader';
import { HttpClient } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'ar',
        loader: {
          provide: TranslateLoader,
          useFactory: translateServerLoaderFactory,
          deps: [HttpClient, TransferState],
          // deps: [HttpClient],
        },
      })
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
