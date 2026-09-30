/**
 * Translation Helper
 * This file provides utility functions for managing translations across the portfolio
 */

const TranslationManager = {
  currentLanguage: localStorage.getItem('language') || 'en',
  
  translations: {
    en: {
      'nav.name': 'Bassam',
      'hero.greeting': 'Hi, I\'m',
      // Add more as needed
    },
    ar: {
      'nav.name': 'بسام',
      'hero.greeting': 'مرحباً، أنا',
      // Add more as needed
    }
  },
  
  get(key) {
    return this.translations[this.currentLanguage][key] || key;
  },
  
  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
  },
  
  getCurrentLanguage() {
    return this.currentLanguage;
  }
};
