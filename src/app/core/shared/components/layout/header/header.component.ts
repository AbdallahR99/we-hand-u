import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '@app/core/constants/routes';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [SHARED_MODULES],
})
export class HeaderComponent implements OnInit {
  // appRoutes = APP_ROUTES;

  navItems: {
    path: string;
    label: string;
  }[] = [
    {
      path: APP_ROUTES.HOME,
      label: 'Home',
    },
    {
      path: APP_ROUTES.CATALOG_LIST,
      label: 'Services',
    },
    {
      path: APP_ROUTES.BLOG,
      label: 'Blog',
    },
    {
      path: APP_ROUTES.CONTACT,
      label: 'Contact',
    },
  ];

  ngOnInit() {}
}
