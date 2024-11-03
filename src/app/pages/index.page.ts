import { RouteMeta } from '@analogjs/router';
import { APP_SETTINGS } from '@app/core/constants/app-settings.constants';

export const routeMeta: RouteMeta = {
  redirectTo: `/${APP_SETTINGS.currentCity}`,
  pathMatch: 'full',
};
