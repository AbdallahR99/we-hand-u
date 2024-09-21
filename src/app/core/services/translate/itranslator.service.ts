import { DOCUMENT } from '@angular/common';
import {
  EventEmitter,
  forwardRef,
  inject,
  Inject,
  Injectable,
  InjectionToken,
} from '@angular/core';
import { LocalStorageKeys } from '@app/core/constants/local_storage';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslatorService } from './translator.service';
// import { HOST_LANGAUGE } from 'hosts';
export const TRANSLATOR_INJECTION_TOKEN = new InjectionToken(
  'TRANSLATOR_INJECTION_TOKEN',
  {
    factory: () => {
      const ts = inject(TranslatorService);
      return ts;
    },
  }
);
@Injectable({
  providedIn: 'root',
  useExisting: TRANSLATOR_INJECTION_TOKEN,
})
export abstract class ITranslatorService {
  abstract onLangChange(): EventEmitter<LangChangeEvent>;
  abstract getCurrentLang(): string | null;
  abstract setCurrentLang(val: string): void;
  abstract translateWord(val: string): string;
}
