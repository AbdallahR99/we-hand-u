// import { inject, Injectable, Injector, ProviderToken } from '@angular/core';
// import { FlowbiteService } from './theme/flowbite.service';
// import 'reflect-metadata';
// import { TranslatorService } from './translate/translator.service';
// import {
//   ITranslatorService,
//   TRANSLATOR_INJECTION_TOKEN,
// } from './translate/itranslator.service';

// export const Decorate = (): ClassDecorator => {
//   return (target: Function) => {
//     Reflect.metadata('metadataKey', 'hello class')(target.prototype);
//   };
// };

// // facade registration decorator
// export function RegisterService(serviceToRegister: () => Object) {
//   return (target: FacadeService, propertyKey: string) => {
//     Object.defineProperty(target, propertyKey, {
//       get: function () {
//         const privateProperty = `_${propertyKey}`;
//         if (!this[privateProperty]) {
//           this[privateProperty] = this.inject.get(serviceToRegister());
//         }
//         return this[privateProperty];
//       },
//       enumerable: true,
//       configurable: true,
//     });
//   };
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class FacadeService {
//   public inject = inject(Injector);

//   @RegisterService(() => FlowbiteService) flowbiteService!: FlowbiteService;
//   @RegisterService(() => typeof ITranslatorService)
//   translateService!: TranslatorService;
// }
