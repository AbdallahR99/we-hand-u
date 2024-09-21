export enum APP_ROUTES {
  HOME = '/home',
  LOGIN = '/login',
  CATALOG_LIST = '/services',
  CATALOG_ITEM = '/service',
  BLOG = '/blog',
  BLOG_ITEM = '/post',
  CONTACT = '/contact',
  ABOUT = '/about',
  REGISTER = '/register',
  PROFILE = '/profile',
  NOT_FOUND = '/not-found',
}

export const unPrefixRoute = (route: string): string =>
  route.replace(/^\/+/, '');
