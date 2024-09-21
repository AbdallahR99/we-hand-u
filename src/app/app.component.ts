import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/theme/flowbite.service';
import { LayoutComponent } from './core/shared/components/layout/layout.component';
// import { FacadeService } from './core/services/facade-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  host: {
    class: 'h-full w-full',
  },
  // styles: [
  //   `
  //     :host {
  //       max-width: 1280px;
  //       margin: 0 auto;
  //       padding: 2rem;
  //       text-align: center;
  //     }
  //   `,
  // ],
})
export class AppComponent implements OnInit {
  flowbiteService = inject(FlowbiteService);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite();
  }
}
