import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_ROUTES, unPrefixRoute } from '@app/core/constants/routes';
import { SHARED_MODULES } from '@app/core/shared/modules/shared.module';

export const routeMeta: RouteMeta = {
  redirectTo: unPrefixRoute(APP_ROUTES.NOT_FOUND),
  pathMatch: 'full',
};
