import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { GOV_PORTALS, type GovPortal, type PortalCategory } from '../data/catalog';
import { filterPortals } from '../utils/calculator';

interface PortalsSectionProps {
  onSelectPortalForShop: (portal: GovPortal) => void;
}

const CATEGORIES: PortalCategory[] = [
  'सभी',
  'मध्य प्रदेश',
  'केंद्र सरकार',
  'भर्ती एवं परीक्षा',
  'पहचान व दस्तावेज',
];

export function PortalsSection({ onSelectPortalForShop }: PortalsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<PortalCategory>('सभी');
  const [searchQuery, setSearchQuery] = useState('');

  const visiblePortals = useMemo(
    () => filterPortals(GOV_PORTALS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  return (
    <section id="portals" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1D4ED8]">
              जुड़े सरकारी पोर्टल · हमारे काउंटर पर उपलब्ध
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">
              इन सभी सरकारी पोर्टल का काम हमारी दुकान पर किया जाता है
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              आपको खुद परेशान होने की जरूरत नहीं है। नीचे दिए गए किसी भी पोर्टल से जुड़ा फॉर्म,
              ई-केवाईसी या प्रिंट करवाने के लिए सीधे दुकान का टोकन बुक करें।
            </p>
          </div>

          {/* Search input */}
          <div className="w-full lg:w-80">
            <label htmlFor="portal-search" className="sr-only">
              सरकारी पोर्टल या काम खोजें
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="portal-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="खोजें: MPESB, समग्र, पैन, आधार..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Interactive filter tabs */}
        <div
          role="tablist"
          aria-label="श्रेणी के अनुसार पोर्टल चुनें"
          className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-fit"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Portal Grid — Shop-assisted cards (no direct external self-apply redirect) */}
        {visiblePortals.length === 0 ? (
          <div className="mt-8 p-10 text-center bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm font-medium text-slate-900">
              &ldquo;{searchQuery}&rdquo; से जुड़ा कोई पोर्टल नहीं मिला।
            </p>
            <p className="mt-1 text-xs text-slate-500">
              कृपया खोज बदलें या &ldquo;सभी&rdquo; श्रेणी चुनें।
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('सभी');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#1D4ED8] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              सभी पोर्टल दिखाएं
            </button>
          </div>
        ) : (
          <div
            data-testid="portals-grid"
            className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visiblePortals.map((portal) => (
              <article
                key={portal.id}
                className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs text-slate-500">
                    {portal.category} · {portal.englishTag}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-slate-900">
                    {portal.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {portal.description}
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    मुख्य कार्य: {portal.shopTasks.join(' · ')}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-slate-500 truncate">{portal.domain}</span>
                  <button
                    type="button"
                    onClick={() => onSelectPortalForShop(portal)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] hover:text-[#1E40AF] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    दुकान पर करवाएं
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
