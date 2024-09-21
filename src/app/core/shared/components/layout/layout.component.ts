import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlatformService } from '@app/core/services/platform/platform.service';
import { DOCUMENT, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  host: {
    class: 'h-full w-full flex flex-col',
  },
  imports: [HeaderComponent, FooterComponent, NgStyle, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements AfterViewInit {
  // navHeight = signal(72);
  platformService = inject(PlatformService);
  document = inject(DOCUMENT);
  ngAfterViewInit(): void {
    // this.platformService.runIfBrowser(() => {
    //   const mainNavEl = this.document.querySelector('.main-nav');
    //   if (mainNavEl) {
    //     this.navHeight.update((v) => mainNavEl.clientHeight);
    //   }
    // });
  }
}
