import { Component, inject } from '@angular/core';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';
// import { FacadeService } from '@app/core/services/facade-service.service';

@Component({
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './(home).page.html',
})
export default class HomePage {
  // fs = inject(FacadeService);
  constructor() {}
  loadTranslateService() {
    // this.fs.translateService.translateWord('hello');
  }
}
