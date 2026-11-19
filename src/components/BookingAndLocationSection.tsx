import { useEffect, useState, type FormEvent } from 'react';
import { Clock, MapPin, Phone, Trash2 } from 'lucide-react';
import { SHOP_INFO } from '../data/catalog';
import {
  formatINR,
  generateTokenId,
  validateTokenBooking,
  type TokenBookingRecord,
} from '../utils/calculator';

interface BookingAndLocationSectionProps {
  prefillServiceType: string;
  prefillNotes: string;
  prefillAmount: number | null;
}

const STORAGE_KEY = 'supreme_computer_tokens_v1';

const SERVICE_OPTIONS = [
  'सरकारी भर्ती / ऑनलाइन फॉर्म',
  'एमपी ऑनलाइन / समग्र / प्रमाण पत्र',
  'फोटोकॉपी एवं लैमिनेशन',
  'स्टाम्प सील (मुहर), बिल बुक व स्टेशनरी',
  'पैन / आधार / आयुष्मान कार्ड',
  'बैंकिंग / बिल भुगतान / टिकट बुकिंग',
];

export function BookingAndLocationSection({
  prefillServiceType,
  prefillNotes,
  prefillAmount,
}: BookingAndLocationSectionProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(prefillServiceType || SERVICE_OPTIONS[0]);
  const [notes, setNotes] = useState(prefillNotes || '');
  const [estimatedAmount, setEstimatedAmount] = useState<number | null>(prefillAmount);
  const [errors, setErrors] = useState<{
    customerName?: string;
    phone?: string;
    serviceType?: string;
  }>({});
  const [tokens, setTokens] = useState<TokenBookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as TokenBookingRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (prefillServiceType) setServiceType(prefillServiceType);
    if (prefillNotes) setNotes(prefillNotes);
    if (prefillAmount !== null) setEstimatedAmount(prefillAmount);
  }, [prefillServiceType, prefillNotes, prefillAmount]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    } catch {
      // Ignore storage quota errors
    }
  }, [tokens]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateTokenBooking({
      customerName,
      phone,
      serviceType,
      notes,
      estimatedAmount: estimatedAmount ?? undefined,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newRecord: TokenBookingRecord = {
      tokenId: generateTokenId(),
      customerName: customerName.trim(),
      phone: phone.replace(/\D/g, ''),
      serviceType,
      notes: notes.trim(),
      estimatedAmount,
      createdAt: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTokens((prev) => [newRecord, ...prev]);
    setCustomerName('');
    setPhone('');
    setNotes('');
    setEstimatedAmount(null);
    setErrors({});
  };

  const handleCancelToken = (tokenId: string) => {
    setTokens((prev) => prev.filter((t) => t.tokenId !== tokenId));
  };

  return (
    <section id="visit-us" className="py-16 lg:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Online Counter Token Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <p className="text-sm font-medium text-[#1D4ED8]">
              दुकान के लिए काउंटर टोकन बुक करें
            </p>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              बिना लाइन में लगे सुप्रीम कंप्यूटर पर अपना काम करवाएं
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              दुकान आने से पहले टोकन बुक कर लें ताकि फॉर्म भरने, सरकारी फीस जमा करने या फोटोकॉपी
              व लैमिनेशन में आपका समय बचे।
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    आपका पूरा नाम
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errors.customerName)
                        setErrors((prev) => ({ ...prev, customerName: undefined }));
                    }}
                    placeholder="जैसे: राजेश पटेल"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                  {errors.customerName && (
                    <p role="alert" className="mt-1 text-xs font-medium text-red-600">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    मोबाइल नंबर (10 अंक)
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="जैसे: 9893574866"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1 text-xs font-medium text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-service"
                  className="block text-sm font-semibold text-slate-900"
                >
                  कौन सा काम करवाना है?
                </label>
                <select
                  id="booking-service"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="mt-1.5 w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-sm font-semibold text-slate-900"
                >
                  काम का विवरण (वैकल्पिक)
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="जैसे: एमपी पुलिस फॉर्म + 2 A4 लैमिनेशन"
                  className="mt-1.5 w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
                {estimatedAmount !== null && (
                  <p className="mt-1.5 text-xs font-medium text-[#1D4ED8] font-mono tabular-nums">
                    अनुमानित शुल्क जुड़ा है: {formatINR(estimatedAmount)}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors cursor-pointer"
              >
                काउंटर टोकन प्राप्त करें
              </button>
            </form>

            {/* Saved Tokens List */}
            {tokens.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="font-display text-base font-bold text-slate-900">
                  आपके बुक किए गए टोकन ({tokens.length})
                </h3>
                <ul data-testid="active-tokens-list" className="mt-3 space-y-3">
                  {tokens.map((token) => (
                    <li
                      key={token.tokenId}
                      className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg flex items-start justify-between gap-4"
                    >
                      <div>
                        <p className="text-xs text-slate-500 font-mono">
                          {token.tokenId} · समय: {token.createdAt}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {token.customerName} — {token.serviceType}
                        </p>
                        {token.notes && (
                          <p className="mt-0.5 text-xs text-slate-600">{token.notes}</p>
                        )}
                        {token.estimatedAmount !== null && (
                          <p className="mt-1 text-xs font-mono font-semibold text-[#1D4ED8] tabular-nums">
                            अनुमानित शुल्क: {formatINR(token.estimatedAmount)}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        aria-label={`टोकन ${token.tokenId} रद्द करें`}
                        onClick={() => handleCancelToken(token.tokenId)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Shop Address & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <p className="text-xs font-medium text-[#1D4ED8]">हमारी दुकान पर पधारें</p>
              <h3 className="mt-1 font-display text-xl font-bold text-slate-900">
                {SHOP_INFO.brand} ({SHOP_INFO.domain})
              </h3>

              <div className="mt-6 space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-slate-900">{SHOP_INFO.addressLine1}</p>
                    <p className="text-slate-600 mt-0.5">{SHOP_INFO.addressLine2}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-slate-900">प्रिंट व फॉर्म के लिए कॉल / व्हाट्सएप</p>
                    <a
                      href={SHOP_INFO.phoneHref}
                      className="font-mono text-base font-semibold text-[#1D4ED8] hover:underline mt-0.5 inline-block tabular-nums"
                    >
                      {SHOP_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-slate-900">दुकान खुलने का समय</p>
                    <p className="text-slate-600 mt-0.5 tabular-nums">{SHOP_INFO.timings}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href={SHOP_INFO.phoneHref}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  कॉल करें: {SHOP_INFO.phoneRaw}
                </a>
                <a
                  href={`${SHOP_INFO.whatsappHref}?text=${encodeURIComponent(
                    'नमस्ते सुप्रीम कंप्यूटर, मुझे PDF / डॉक्यूमेंट प्रिंट निकलवाना है। मैं फाइल भेज रहा हूँ।'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap"
                >
                  व्हाट्सएप पर PDF / फाइल भेजें
                </a>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <p className="text-xs font-semibold text-slate-900">आसानी से पहुंचने का रास्ता</p>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                हमारी दुकान मुख्य मार्ग पर <strong>चौरई बस स्टैंड</strong> के पास, ठीक{' '}
                <strong>नगर पालिका परिषद चौरई</strong> के मुख्य गेट के सामने स्थित है। दुकान के
                बाहर बाइक पार्किंग की सुविधा उपलब्ध है।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
