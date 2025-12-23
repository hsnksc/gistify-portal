import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm transition-all"
      title={t('common.language')}
    >
      <span className="text-lg">{i18n.language === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
      <span>{i18n.language === 'tr' ? t('common.turkish') : t('common.english')}</span>
    </button>
  );
};

export default LanguageToggle;
