// Minimalist Language Switcher (EN default, optional KO)
(function() {
  const STORAGE_KEY = 'lmind_preferred_lang';
  
  function getInitialLang() {
    // Default is strictly English per requirement, unless previously chosen by user
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ko' || saved === 'en') {
      return saved;
    }
    return 'en';
  }

  function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);

    // Update switcher button states
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      const target = btn.getAttribute('data-lang-target');
      if (target === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // Execute immediately to prevent flash of wrong language
  const initialLang = getInitialLang();
  document.documentElement.setAttribute('lang', initialLang);

  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(initialLang);

    // Attach click listeners to language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = btn.getAttribute('data-lang-target');
        if (targetLang) {
          setLanguage(targetLang);
        }
      });
    });
  });
})();
