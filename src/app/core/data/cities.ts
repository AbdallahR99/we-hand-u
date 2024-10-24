export const cities: { [slug: string]: { nameAr: string; nameEn: string } } = {
  dubai: {
    nameAr: 'دبي',
    nameEn: 'Dubai',
  },
  'abu-dhabi': {
    nameAr: 'أبو ظبي',
    nameEn: 'Abu Dhabi',
  },
  sharjah: {
    nameAr: 'الشارقة',
    nameEn: 'Sharjah',
  },
  ajman: {
    nameAr: 'عجمان',
    nameEn: 'Ajman',
  },
  'umm-al-quwain': {
    nameAr: 'أم القيوين',
    nameEn: 'Umm Al Quwain',
  },
  'ras-al-khaimah': {
    nameAr: 'رأس الخيمة',
    nameEn: 'Ras Al Khaimah',
  },
  fujairah: {
    nameAr: 'الفجيرة',
    nameEn: 'Fujairah',
  },
};

export const citiesAr: {
  [slugAr: string]: { nameAr: string; nameEn: string };
} = {
  دبي: cities['dubai'],
  'أبو-ظبي': cities['abu-dhabi'],
  الشارقة: cities['sharjah'],
  عجمان: cities['ajman'],
  'أم-القيوين': cities['umm-al-quwain'],
  'رأس-الخيمة': cities['ras-al-khaimah'],
  الفجيرة: cities['fujairah'],
};
