import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { BookingAndLocationSection } from './components/BookingAndLocationSection';
import { FeeCalculatorSection } from './components/FeeCalculatorSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LegalModal, type LegalTab } from './components/LegalModal';
import { Navbar } from './components/Navbar';
import { OwnerPanelModal } from './components/OwnerPanelModal';
import { PortalsSection } from './components/PortalsSection';
import { ServicesSection } from './components/ServicesSection';
import { VacanciesSection } from './components/VacanciesSection';
import { SHOP_INFO, VACANCIES, type GovPortal, type VacancyItem } from './data/catalog';

const WHATSAPP_PREFILL_URL = `${SHOP_INFO.whatsappHref}?text=${encodeURIComponent(
  'नमस्ते सुप्रीम कंप्यूटर, मुझे सरकारी फॉर्म और जरूरी दस्तावेज के बारे में जानकारी चाहिए।'
)}`;

const VACANCIES_STORAGE_KEY = 'supreme_computer_vacancies_v1';
const NOTICE_STORAGE_KEY = 'supreme_computer_shop_notice_v1';

export default function App() {
  const [vacancies, setVacancies] = useState<VacancyItem[]>(() => {
    try {
      const saved = localStorage.getItem(VACANCIES_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as VacancyItem[]) : VACANCIES;
    } catch {
      return VACANCIES;
    }
  });
  const [shopNotice, setShopNotice] = useState<string>(() => {
    try {
      return localStorage.getItem(NOTICE_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [selectedVacancyId, setSelectedVacancyId] = useState(VACANCIES[0].id);
  const [prefillServiceType, setPrefillServiceType] = useState('');
  const [prefillNotes, setPrefillNotes] = useState('');
  const [prefillAmount, setPrefillAmount] = useState<number | null>(null);
  const [ownerPanelOpen, setOwnerPanelOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>(null);

  useEffect(() => {
    try {
      localStorage.setItem(VACANCIES_STORAGE_KEY, JSON.stringify(vacancies));
    } catch {
      // Ignore storage quota errors
    }
  }, [vacancies]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTICE_STORAGE_KEY, shopNotice);
    } catch {
      // Ignore storage quota errors
    }
  }, [shopNotice]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVacancyForFee = (vacancy: VacancyItem) => {
    setSelectedVacancyId(vacancy.id);
    scrollToSection('calculator');
  };

  const handleBookVacancyAtShop = (vacancy: VacancyItem) => {
    setPrefillServiceType('सरकारी भर्ती / ऑनलाइन फॉर्म');
    setPrefillNotes(`${vacancy.title} (${vacancy.sourcePortal})`);
    setPrefillAmount(null);
    scrollToSection('visit-us');
  };

  const handleSelectPortalForShop = (portal: GovPortal) => {
    setPrefillServiceType('एमपी ऑनलाइन / समग्र / प्रमाण पत्र');
    setPrefillNotes(`${portal.name} (${portal.shopTasks.join(', ')})`);
    setPrefillAmount(null);
    scrollToSection('visit-us');
  };

  const handleBookWithEstimate = (summary: string, amount: number, serviceType: string) => {
    setPrefillServiceType(serviceType);
    setPrefillNotes(summary);
    setPrefillAmount(amount);
    scrollToSection('visit-us');
  };

  const handleAddVacancy = (item: VacancyItem) => {
    setVacancies((prev) => [item, ...prev]);
  };

  const handleDeleteVacancy = (id: string) => {
    setVacancies((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar onBookTokenClick={() => scrollToSection('visit-us')} />
      {shopNotice && (
        <div
          role="status"
          className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-xs sm:text-sm font-semibold text-amber-900"
        >
          {shopNotice}
        </div>
      )}
      <main className="flex-1">
        <HeroSection onBookTokenClick={() => scrollToSection('visit-us')} />
        <ServicesSection />
        <VacanciesSection
          vacancies={vacancies}
          onSelectVacancyForFee={handleSelectVacancyForFee}
          onBookVacancyAtShop={handleBookVacancyAtShop}
        />
        <PortalsSection onSelectPortalForShop={handleSelectPortalForShop} />
        <FeeCalculatorSection
          selectedVacancyId={selectedVacancyId}
          onSelectVacancyId={setSelectedVacancyId}
          onBookWithEstimate={handleBookWithEstimate}
        />
        <BookingAndLocationSection
          prefillServiceType={prefillServiceType}
          prefillNotes={prefillNotes}
          prefillAmount={prefillAmount}
        />
      </main>
      <Footer
        onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
        onOpenLegal={(tab) => setLegalTab(tab)}
      />

      <OwnerPanelModal
        open={ownerPanelOpen}
        onClose={() => setOwnerPanelOpen(false)}
        vacancies={vacancies}
        onAddVacancy={handleAddVacancy}
        onDeleteVacancy={handleDeleteVacancy}
        shopNotice={shopNotice}
        onUpdateShopNotice={setShopNotice}
      />

      <LegalModal activeTab={legalTab} onClose={() => setLegalTab(null)} />

      {/* Mobile-only Floating WhatsApp Action Button */}
      <a
        href={WHATSAPP_PREFILL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="व्हाट्सएप पर दस्तावेज की जानकारी पूछें (9893574866)"
        className="md:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-full shadow-lg transition-transform active:scale-95 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#15803D]"
      >
        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>व्हाट्सएप पूछें</span>
      </a>
    </div>
  );
}
