function detectLanguage(text: string): 'Arabic' | 'English' | 'Mixed or Other' {
  const arabicRegex = /[\u0600-\u06FF]/g;
  const englishRegex = /[a-zA-Z]/g;

  const arabicMatches = text.match(arabicRegex) || [];
  const englishMatches = text.match(englishRegex) || [];

  const arabicCount = arabicMatches.length;
  const englishCount = englishMatches.length;

  if (arabicCount > englishCount) {
    return 'Arabic';
  } else if (englishCount > arabicCount) {
    return 'English';
  } else {
    return 'Mixed or Other';
  }
}
