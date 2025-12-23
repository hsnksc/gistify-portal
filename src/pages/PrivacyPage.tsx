import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageToggle from '../components/LanguageToggle';

const PrivacyPage = () => {
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
          <h1 className="text-3xl font-bold text-white mb-2">{t('privacy.title')}</h1>
          <p className="text-gray-400 mb-8">{t('privacy.lastUpdated')}: {today}</p>

          <div className="space-y-8 text-gray-300">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.intro.title')}</h2>
              <p>{t('privacy.intro.content')}</p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.collection.title')}</h2>
              <p className="mb-4">{t('privacy.collection.content')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.collection.personal')}</li>
                <li>{t('privacy.collection.userContent')}</li>
                <li>{t('privacy.collection.deviceData')}</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.usage.title')}</h2>
              <p className="mb-4">{t('privacy.usage.content')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.usage.item1')}</li>
                <li>{t('privacy.usage.item2')}</li>
                <li>{t('privacy.usage.item3')}</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.sharing.title')}</h2>
              <p className="mb-4">{t('privacy.sharing.content')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.sharing.github')}</li>
                <li>{t('privacy.sharing.analytics')}</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.retention.title')}</h2>
              <p className="mb-4">{t('privacy.retention.content')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.retention.inApp')}</li>
                <li>{t('privacy.retention.webRequest')}</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.security.title')}</h2>
              <p>{t('privacy.security.content')}</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.contact.title')}</h2>
              <p className="mb-2">{t('privacy.contact.content')}</p>
              <p className="text-purple-400">{t('privacy.contact.email')}</p>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm">
            <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
              {t('nav.terms')}
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

export default PrivacyPage;
