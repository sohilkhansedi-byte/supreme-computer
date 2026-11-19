import { SHOP_INFO } from '../data/catalog';

import type { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenOwnerPanel: () => void;
  onOpenLegal: (tab: Exclude<LegalTab, null>) => void;
}

export function Footer({ onOpenOwnerPanel, onOpenLegal }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-base font-bold text-slate-900">
            {SHOP_INFO.brand} ({SHOP_INFO.englishBrand})
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {SHOP_INFO.addressLine1} · {SHOP_INFO.phoneDisplay}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-600">
          <a href="#services" className="hover:text-slate-900">
            सेवाएं
          </a>
          <a href="#vacancies" className="hover:text-slate-900">
            सरकारी भर्ती
          </a>
          <a href="#visit-us" className="hover:text-slate-900">
            पता व संपर्क
          </a>
          <button
            type="button"
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-slate-900 cursor-pointer"
          >
            गोपनीयता नीति (Privacy Policy)
          </button>
          <button
            type="button"
            onClick={() => onOpenLegal('terms')}
            className="hover:text-slate-900 cursor-pointer"
          >
            नियम व संपर्क
          </button>
          <button
            type="button"
            onClick={onOpenOwnerPanel}
            className="text-[#1D4ED8] hover:underline cursor-pointer"
          >
            दुकान मालिक पैनल
          </button>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} {SHOP_INFO.domain} · सर्वाधिकार सुरक्षित।
        </p>
      </div>
    </footer>
  );
}
