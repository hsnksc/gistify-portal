import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageToggle from '../components/LanguageToggle';

const LegalPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            ✨ Gistify
          </Link>
          <LanguageToggle />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold text-white mb-8">{t('legal.title')}</h1>

          <div className="space-y-8 text-gray-300">
            {/* Publisher Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('legal.publisher.title')}</h2>
              <div className="space-y-1">
                <p className="font-medium text-purple-400">{t('legal.publisher.name')}</p>
                <p>{t('legal.publisher.location')}</p>
                <p>{t('legal.publisher.email')}</p>
              </div>
            </section>

            {/* Copyright Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('legal.copyright.title')}</h2>
              <p>{t('legal.copyright.content')}</p>
            </section>

            {/* External Links Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('legal.externalLinks.title')}</h2>
              <p>{t('legal.externalLinks.content')}</p>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm">
            <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
              {t('nav.privacy')}
            </Link>
            <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
              {t('nav.terms')}
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
