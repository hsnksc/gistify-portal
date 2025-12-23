import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageToggle from '../components/LanguageToggle';

const TermsPage = () => {
  const { t } = useTranslation();
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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
          <h1 className="text-3xl font-bold text-white mb-2">{t('terms.title')}</h1>
          <p className="text-gray-400 mb-8">{t('terms.lastUpdated')}: {today}</p>

          <div className="space-y-8 text-gray-300">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('terms.acceptance.title')}</h2>
              <p>{t('terms.acceptance.content')}</p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('terms.description.title')}</h2>
              <p>{t('terms.description.content')}</p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('terms.accounts.title')}</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('terms.accounts.item1')}</li>
                <li>{t('terms.accounts.item2')}</li>
                <li>{t('terms.accounts.item3')}</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('terms.intellectual.title')}</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('terms.intellectual.app')}</li>
                <li>{t('terms.intellectual.userContent')}</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('terms.thirdParty.title')}</h2>
              <p>{t('terms.thirdParty.content')}</p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('terms.disclaimer.title')}</h2>
              <p>{t('terms.disclaimer.content')}</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('terms.changes.title')}</h2>
              <p>{t('terms.changes.content')}</p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('terms.contact.title')}</h2>
              <p className="text-purple-400">{t('terms.contact.content')}</p>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm">
            <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
              {t('nav.privacy')}
            </Link>
            <Link to="/legal" className="text-purple-400 hover:text-purple-300 transition-colors">
              {t('nav.legal')}
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

export default TermsPage;
