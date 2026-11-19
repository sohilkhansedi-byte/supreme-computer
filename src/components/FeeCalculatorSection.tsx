import { useMemo, useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { SHOP_INFO, VACANCIES, type ApplicantCategory, type VacancyItem } from '../data/catalog';
import {
  calculatePrintEstimate,
  calculateVacancyFee,
  formatINR,
} from '../utils/calculator';

interface FeeCalculatorSectionProps {
  selectedVacancyId: string;
  onSelectVacancyId: (id: string) => void;
  onBookWithEstimate: (summary: string, amount: number, serviceType: string) => void;
}

const CATEGORY_LABELS: { value: ApplicantCategory; label: string }[] = [
  { value: 'GEN', label: 'सामान्य (GEN)' },
  { value: 'OBC', label: 'ओबीसी (OBC)' },
  { value: 'SC_ST', label: 'SC / ST' },
  { value: 'EWS', label: 'EWS' },
];

export function FeeCalculatorSection({
  selectedVacancyId,
  onSelectVacancyId,
  onBookWithEstimate,
}: FeeCalculatorSectionProps) {
  const [mode, setMode] = useState<'vacancy' | 'print'>('vacancy');

  // Vacancy fee state
  const [applicantCategory, setApplicantCategory] = useState<ApplicantCategory>('GEN');
  const [includePrintAndScan, setIncludePrintAndScan] = useState(true);

  // Print & Lamination state
  const [bwPages, setBwPages] = useState(20);
  const [colorPages, setColorPages] = useState(0);
  const [a4Lamination, setA4Lamination] = useState(1);
  const [idLamination, setIdLamination] = useState(0);
  const [spiralBinding, setSpiralBinding] = useState(0);

  const activeVacancy: VacancyItem = useMemo(
    () => VACANCIES.find((v) => v.id === selectedVacancyId) ?? VACANCIES[0],
    [selectedVacancyId]
  );

  const vacancyResult = useMemo(
    () => calculateVacancyFee(activeVacancy, applicantCategory, includePrintAndScan),
    [activeVacancy, applicantCategory, includePrintAndScan]
  );

  const printResult = useMemo(
    () =>
      calculatePrintEstimate({
        bwPages,
        colorPages,
        a4Lamination,
        idLamination,
        spiralBinding,
      }),
    [bwPages, colorPages, a4Lamination, idLamination, spiralBinding]
  );

  const handleBookVacancy = () => {
    const summary = `${activeVacancy.title} (${applicantCategory}) — सरकारी फीस ${formatINR(
      vacancyResult.officialFee
    )} + सेवा शुल्क ${formatINR(vacancyResult.portalServiceCharge)}`;
    onBookWithEstimate(summary, vacancyResult.total, 'सरकारी भर्ती / ऑनलाइन फॉर्म');
  };

  const handleBookPrint = () => {
    const parts: string[] = [];
    if (bwPages > 0) parts.push(`${bwPages} B&W पेज`);
    if (colorPages > 0) parts.push(`${colorPages} कलर पेज`);
    if (a4Lamination > 0) parts.push(`${a4Lamination} A4 लैमिनेशन`);
    if (idLamination > 0) parts.push(`${idLamination} ID लैमिनेशन`);
    if (spiralBinding > 0) parts.push(`${spiralBinding} स्पायरल बाइंडिंग`);
    const summary = parts.length > 0 ? parts.join(', ') : 'फोटोकॉपी एवं लैमिनेशन';
    onBookWithEstimate(summary, printResult.total, 'फोटोकॉपी एवं लैमिनेशन');
  };

  return (
    <section id="calculator" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1D4ED8]">
              शुल्क एवं प्रिंट कैलकुलेटर
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">
              दुकान आने से पहले अपनी कुल फीस जानें
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              किसी भी सरकारी भर्ती फॉर्म, फोटोकॉपी या लैमिनेशन का पूरा खर्च पहले से देखें और
              सीधे काउंटर पर भुगतान करने के लिए टोकन बुक करें।
            </p>
          </div>

          <div
            role="tablist"
            aria-label="कैलकुलेटर प्रकार चुनें"
            className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit shrink-0"
          >
            <button
              role="tab"
              type="button"
              aria-selected={mode === 'vacancy'}
              onClick={() => setMode('vacancy')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'vacancy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              भर्ती व फॉर्म फीस
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={mode === 'print'}
              onClick={() => setMode('print')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'print'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              फोटोकॉपी व लैमिनेशन
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 sm:p-8">
            {mode === 'vacancy' ? (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="vacancy-select"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    सरकारी भर्ती / योजना चुनें
                  </label>
                  <select
                    id="vacancy-select"
                    value={activeVacancy.id}
                    onChange={(e) => onSelectVacancyId(e.target.value)}
                    className="mt-2 w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  >
                    {VACANCIES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.title} ({v.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-slate-900">
                    आवेदक की श्रेणी (Category)
                  </span>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CATEGORY_LABELS.map((cat) => {
                      const active = applicantCategory === cat.value;
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setApplicantCategory(cat.value)}
                          className={`px-3 py-2.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="flex items-start gap-3 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePrintAndScan}
                    onChange={(e) => setIncludePrintAndScan(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1D4ED8] focus:ring-[#1D4ED8]"
                  />
                  <span className="text-sm text-slate-700">
                    दस्तावेज स्कैनिंग, फोटो-साइन रिसाइज एवं प्रिंट रसीद शामिल करें (+₹20)
                  </span>
                </label>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-700">
                    सुप्रीम कंप्यूटर काउंटर पर साथ लाने वाले जरूरी दस्तावेज:
                  </p>
                  <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeVacancy.requiredDocs.map((doc) => (
                      <li key={doc} className="text-xs text-slate-600 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="bw-pages" className="block text-sm font-semibold text-slate-900">
                    ब्लैक एंड व्हाइट फोटोकॉपी (पेज)
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">₹2/पेज · 50+ पेज पर ₹1.50/पेज</p>
                  <input
                    id="bw-pages"
                    type="number"
                    min={0}
                    max={5000}
                    value={bwPages}
                    onChange={(e) => setBwPages(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-2 w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="color-pages"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    कलर प्रिंटआउट (पेज)
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">₹10/पेज (A4 HD लेज़र प्रिंट)</p>
                  <input
                    id="color-pages"
                    type="number"
                    min={0}
                    max={1000}
                    value={colorPages}
                    onChange={(e) => setColorPages(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-2 w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="a4-lamination"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    A4 डॉक्यूमेंट लैमिनेशन
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">₹20 प्रति शीट (मजबूत पाउच)</p>
                  <input
                    id="a4-lamination"
                    type="number"
                    min={0}
                    max={200}
                    value={a4Lamination}
                    onChange={(e) => setA4Lamination(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-2 w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="id-lamination"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    आईडी कार्ड लैमिनेशन
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">₹15 प्रति कार्ड (आधार / पैन / वोटर)</p>
                  <input
                    id="id-lamination"
                    type="number"
                    min={0}
                    max={200}
                    value={idLamination}
                    onChange={(e) => setIdLamination(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-2 w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="spiral-binding"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    स्पायरल बाइंडिंग (नोट्स / प्रोजेक्ट)
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">₹40 प्रति बुक (कवर सहित)</p>
                  <input
                    id="spiral-binding"
                    type="number"
                    min={0}
                    max={100}
                    value={spiralBinding}
                    onChange={(e) => setSpiralBinding(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-2 w-full sm:w-1/2 px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 sm:p-8">
            <p className="text-xs font-medium text-slate-400">दुकान पर कुल अनुमानित शुल्क</p>
            <p
              data-testid="calculator-total"
              className="mt-2 font-mono text-4xl font-bold tracking-tight tabular-nums"
            >
              {mode === 'vacancy' ? formatINR(vacancyResult.total) : formatINR(printResult.total)}
            </p>

            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3 text-sm">
              {mode === 'vacancy' ? (
                <>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">सरकारी पोर्टल फीस ({applicantCategory})</span>
                    <span className="font-mono tabular-nums">{formatINR(vacancyResult.officialFee)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">एमपी ऑनलाइन / काउंटर शुल्क</span>
                    <span className="font-mono tabular-nums">
                      {formatINR(vacancyResult.portalServiceCharge)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">स्कैनिंग, रिसाइज व प्रिंट रसीद</span>
                    <span className="font-mono tabular-nums">
                      {formatINR(vacancyResult.printAddonCost)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">
                      B&amp;W फोटोकॉपी ({bwPages} × ₹{printResult.bwRate})
                    </span>
                    <span className="font-mono tabular-nums">{formatINR(printResult.bwCost)}</span>
                  </div>
                  {printResult.bulkDiscountApplied && (
                    <p className="text-xs text-emerald-400">
                      थोक छूट लागू: 50+ पेज पर ₹1.50 प्रति पेज
                    </p>
                  )}
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">कलर प्रिंट ({colorPages} × ₹10)</span>
                    <span className="font-mono tabular-nums">{formatINR(printResult.colorCost)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">
                      लैमिनेशन ({a4Lamination} A4, {idLamination} ID)
                    </span>
                    <span className="font-mono tabular-nums">
                      {formatINR(printResult.a4LaminationCost + printResult.idLaminationCost)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">स्पायरल बाइंडिंग ({spiralBinding} × ₹40)</span>
                    <span className="font-mono tabular-nums">
                      {formatINR(printResult.spiralBindingCost)}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={mode === 'vacancy' ? handleBookVacancy : handleBookPrint}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer"
            >
              इसके लिए दुकान का टोकन बुक करें
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            {mode === 'print' && (
              <a
                href={`${SHOP_INFO.whatsappHref}?text=${encodeURIComponent(
                  `नमस्ते सुप्रीम कंप्यूटर, मुझे प्रिंट/PDF निकलवाना है — ${bwPages} B&W पेज, ${colorPages} कलर पेज, ${a4Lamination} A4 लैमिनेशन, ${idLamination} ID लैमिनेशन (अनुमानित शुल्क: ${formatINR(
                    printResult.total
                  )})। मैं फाइल भेज रहा हूँ।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                व्हाट्सएप पर PDF / फाइल भेजें (9893574866)
              </a>
            )}

            <p className="mt-3 text-xs text-slate-400 text-center">
              भुगतान सीधे सुप्रीम कंप्यूटर काउंटर पर नकद या UPI से करें।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
