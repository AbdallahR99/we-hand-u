export interface CityData {
  nameAr: string;
  nameEn: string;
  slugAr: string;
  slugEn: string;
}

export const cities: {
  [slug: string]: CityData;
} = {
  dubai: {
    nameAr: 'دبي',
    nameEn: 'Dubai',
    slugAr: 'دبي',
    slugEn: 'dubai',
  },
  'abu-dhabi': {
    nameAr: 'أبو ظبي',
    nameEn: 'Abu Dhabi',
    slugAr: 'أبو-ظبي',
    slugEn: 'abu-dhabi',
  },
  sharjah: {
    nameAr: 'الشارقة',
    nameEn: 'Sharjah',
    slugAr: 'الشارقة',
    slugEn: 'sharjah',
  },
  ajman: {
    nameAr: 'عجمان',
    nameEn: 'Ajman',
    slugAr: 'عجمان',
    slugEn: 'ajman',
  },
  'umm-al-quwain': {
    nameAr: 'أم القيوين',
    nameEn: 'Umm Al Quwain',
    slugAr: 'أم-القيوين',
    slugEn: 'umm-al-quwain',
  },
  'ras-al-khaimah': {
    nameAr: 'رأس الخيمة',
    nameEn: 'Ras Al Khaimah',
    slugAr: 'رأس-الخيمة',
    slugEn: 'ras-al-khaimah',
  },
  fujairah: {
    nameAr: 'الفجيرة',
    nameEn: 'Fujairah',
    slugAr: 'الفجيرة',
    slugEn: 'fujairah',
  },
};

export const citiesAr: {
  [slugAr: string]: CityData;
} = {
  دبي: cities['dubai'],
  'أبو-ظبي': cities['abu-dhabi'],
  الشارقة: cities['sharjah'],
  عجمان: cities['ajman'],
  'أم-القيوين': cities['umm-al-quwain'],
  'رأس-الخيمة': cities['ras-al-khaimah'],
  الفجيرة: cities['fujairah'],
};
