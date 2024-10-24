import { CanActivateFn } from '@angular/router';
import { injectActiveCatalogAttributes } from '../utils/get-catalog-attributes';

export const catalogGaurdResolver: CanActivateFn = (route, state) => {
  const postAttributes = injectActiveCatalogAttributes(route);
  if (!postAttributes) return false;
  return true;
};
