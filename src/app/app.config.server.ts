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
import { provideServerTranslatorModule } from '@core/shared/modules/translator/translator-server.module';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideServerTranslatorModule()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
