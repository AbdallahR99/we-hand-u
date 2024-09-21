import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';

@Component({
  standalone: true,
  imports: [SHARED_MODULES],
  template: `
    <h2>Page Not Found</h2>

    <a routerLink="/">Go Back Home</a>
  `,
})
export default class PageNotFoundComponent {}
