import { injectContentFiles } from '@analogjs/content';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Category } from '@app/core/models/repository/catalog/category.model';

export let catalogAttributes: Category | undefined;
export function injectActiveCatalogAttributes(
  route: ActivatedRouteSnapshot
): Category {
  if (catalogAttributes) {
    if (catalogAttributes.slug === route.params['slug']) {
      return catalogAttributes;
    }
  }
  const slug = route.params['slug'];
  const catalogPost = injectContentFiles<Category>(
    (contentFile) =>
      contentFile.filename.includes('/catalog/') &&
      contentFile.attributes.slug === slug
  )[0];
  return (catalogAttributes = catalogPost?.attributes);
}
