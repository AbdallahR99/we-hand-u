import { cities } from '../data/cities';
import { LocalStorageKeys } from './local_storage';

export const APP_SETTINGS = {
  defaultLanguage: 'ar',
  currentCity:
    localStorage.getItem(LocalStorageKeys.CITY) ?? cities['dubai'].nameAr,
};
