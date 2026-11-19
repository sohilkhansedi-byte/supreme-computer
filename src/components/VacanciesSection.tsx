import { useMemo, useState } from 'react';
import { ArrowRight, Calculator, Check, FileText, X } from 'lucide-react';
import { type UpdateType, type VacancyItem } from '../data/catalog';
import { filterActiveUpdates, formatINR } from '../utils/calculator';

interface VacanciesSectionProps {
  vacancies: VacancyItem[];
  onSelectVacancyForFee: (vacancy: VacancyItem) => void;
  onBookVacancyAtShop: (vacancy: VacancyItem) => void;
}

const UPDATE_TABS: ('सभी' | UpdateType)[] = [
  'सभी',
  'भर्ती फॉर्म',
  'एडमिट कार्ड',
  'आने वाली भर्ती',
  'छात्रवृत्ति व योजना',
];

export function VacanciesSection({
  vacancies,
  onSelectVacancyForFee,
  onBookVacancyAtShop,
}: VacanciesSectionProps) {
  const [activeTab, setActiveTab] = useState<'सभी' | UpdateType>('सभी');
  const [selectedNotification, setSelectedNotification] = useState<VacancyItem | null>(null);

  // Automatically hide expired/closed vacancies & admit cards based on today's date
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const filtered = useMemo(
    () => filterActiveUpdates(vacancies, todayIso, activeTab),
    [vacancies, todayIso, activeTab]
  );

  return (
    <section id="vacancies" className="py-16 lg:py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1D4ED8]">
              आधिकारिक नोटिफिकेशन · केवल चालू एवं आने वाले अपडेट
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">
              चालू सरकारी भर्तियां, एडमिट कार्ड एवं आने वाली भर्तियां
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              किसी भी भर्ती या एडमिट कार्ड की पूरी आधिकारिक जानकारी (योग्यता, आयु सीमा, तिथियां और
              दस्तावेज) यहीं देखें—और आवेदन के लिए सुप्रीम कंप्यूटर काउंटर पर पधारें।
            </p>
          </div>

          <div
            role="tablist"
            aria-label="चालू अपडेट चुनें"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg w-fit shrink-0"
          >
            {UPDATE_TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="py-3.5 px-5">चालू भर्ती / एडमिट कार्ड</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">योग्यता</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">अंतिम तिथि</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">सरकारी फीस</th>
                  <th className="py-3.5 px-5 text-right whitespace-nowrap">आधिकारिक विवरण व आवेदन</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filtered.map((vacancy) => (
                  <tr key={vacancy.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5">
                      <p className="font-display font-semibold text-slate-900">{vacancy.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {vacancy.updateType} · {vacancy.department}
                      </p>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-xs font-medium text-slate-700">
                      {vacancy.qualification}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-slate-900 tabular-nums">
                        {vacancy.lastDate}
                      </span>
                      {vacancy.status === 'जल्द बंद' && (
                        <p className="text-xs font-semibold text-amber-700 mt-0.5">जल्द बंद</p>
                      )}
                      {vacancy.status === 'एडमिट कार्ड जारी' && (
                        <p className="text-xs font-semibold text-[#1D4ED8] mt-0.5">
                          एडमिट कार्ड जारी
                        </p>
                      )}
                      {vacancy.status === 'जल्द शुरू' && (
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">जल्द शुरू</p>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-slate-800 tabular-nums">
                      {vacancy.updateType === 'एडमिट कार्ड'
                        ? 'प्रिंट ₹20'
                        : `${formatINR(vacancy.fees.GEN)} / ${formatINR(vacancy.fees.SC_ST)}`}
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedNotification(vacancy)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
                          नोटिफिकेशन देखें
                        </button>
                        <button
                          type="button"
                          onClick={() => onBookVacancyAtShop(vacancy)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {vacancy.updateType === 'एडमिट कार्ड'
                            ? 'दुकान पर प्रिंट लें'
                            : 'दुकान पर भरवाएं'}
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Official Notification Full Details Modal */}
      {selectedNotification && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedNotification.title}
          className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-mono text-slate-500">
                  {selectedNotification.notificationRef} · {selectedNotification.sourcePortal}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-slate-900">
                  {selectedNotification.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="विवरण बंद करें"
                onClick={() => setSelectedNotification(null)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-700 leading-relaxed">
              {selectedNotification.officialSummary}
            </p>

            <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[#F8FAFC] p-4 rounded-lg border border-slate-200">
              <div>
                <dt className="text-xs text-slate-500">विभाग / बोर्ड</dt>
                <dd className="font-semibold text-slate-900 mt-0.5">
                  {selectedNotification.department}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">योग्यता</dt>
                <dd className="font-semibold text-slate-900 mt-0.5">
                  {selectedNotification.qualification}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">आयु सीमा</dt>
                <dd className="font-semibold text-slate-900 mt-0.5">
                  {selectedNotification.ageLimit}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">महत्वपूर्ण तिथियां</dt>
                <dd className="font-semibold text-slate-900 mt-0.5 tabular-nums">
                  {selectedNotification.startDate} से {selectedNotification.lastDate}
                </dd>
              </div>
            </dl>

            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-700">
                दुकान पर साथ लाने वाले जरूरी दस्तावेज:
              </p>
              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedNotification.requiredDocs.map((doc) => (
                  <li key={doc} className="text-xs text-slate-700 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
              {selectedNotification.updateType !== 'एडमिट कार्ड' && (
                <button
                  type="button"
                  onClick={() => {
                    const item = selectedNotification;
                    setSelectedNotification(null);
                    onSelectVacancyForFee(item);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
                  कुल फीस कैलकुलेट करें
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  const item = selectedNotification;
                  setSelectedNotification(null);
                  onBookVacancyAtShop(item);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg cursor-pointer"
              >
                दुकान पर आवेदन के लिए टोकन लें
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
