import { X } from 'lucide-react';
import { SHOP_INFO } from '../data/catalog';

export type LegalTab = 'privacy' | 'terms' | null;

interface LegalModalProps {
  activeTab: LegalTab;
  onClose: () => void;
}

export function LegalModal({ activeTab, onClose }: LegalModalProps) {
  if (!activeTab) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeTab === 'privacy' ? 'गोपनीयता नीति (Privacy Policy)' : 'नियम एवं संपर्क'}
      className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <h3 className="font-display text-lg font-bold text-slate-900">
            {activeTab === 'privacy'
              ? 'गोपनीयता नीति (Privacy Policy) — supremecomputer.com'
              : 'नियम, शर्तें एवं संपर्क (Terms & Contact)'}
          </h3>
          <button
            type="button"
            aria-label="बंद करें"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {activeTab === 'privacy' ? (
          <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>सुप्रीम कंप्यूटर ({SHOP_INFO.domain})</strong> आपकी निजता (Privacy) का पूरा
              सम्मान करता है। यह वेबसाइट चौरई के नागरिकों को सरकारी भर्ती जानकारी, शुल्क अनुमान और
              दुकान पर काउंटर टोकन बुकिंग की सुविधा देने के लिए बनाई गई है।
            </p>
            <div>
              <h4 className="font-display font-semibold text-slate-900">
                1. व्यक्तिगत जानकारी एवं दस्तावेज सुरक्षा
              </h4>
              <p className="mt-1">
                इस वेबसाइट पर आपसे कोई भी आधार नंबर, पैन नंबर, बैंक पासवर्ड या मूल दस्तावेज अपलोड
                नहीं करवाया जाता। सभी सरकारी फॉर्म और दस्तावेज केवल दुकान के काउंटर पर आपकी मौजूदगी
                में भरे जाते हैं।
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-slate-900">
                2. टोकन बुकिंग डेटा
              </h4>
              <p className="mt-1">
                टोकन बुक करते समय दिया गया नाम और मोबाइल नंबर केवल आपके ब्राउज़र के लोकल स्टोरेज में
                सहेजा जाता है ताकि दुकान पर आपका समय बच सके। इसे किसी तीसरे पक्ष को नहीं बेचा जाता।
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-slate-900">
                3. कुकीज़ और Google AdSense विज्ञापन
              </h4>
              <p className="mt-1">
                भविष्य में वेबसाइट पर Google AdSense या अन्य तृतीय-पक्ष विज्ञापन दिखाए जा सकते हैं,
                जो बेहतर अनुभव के लिए कुकीज़ (Cookies) का उपयोग कर सकते हैं। आप अपने ब्राउज़र की
                सेटिंग से कुकीज़ नियंत्रित कर सकते हैं।
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-slate-900">4. संपर्क जानकारी</h4>
              <p className="mt-1">
                किसी भी प्रश्न के लिए संपर्क करें: {SHOP_INFO.brand}, {SHOP_INFO.addressLine1},{' '}
                {SHOP_INFO.addressLine2} · फोन: {SHOP_INFO.phoneDisplay} · ईमेल: {SHOP_INFO.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>अस्वीकरण (Disclaimer):</strong> {SHOP_INFO.domain} एक निजी नागरिक सेवा एवं
              कंप्यूटर केंद्र ({SHOP_INFO.brand}, चौरई) की आधिकारिक वेबसाइट है। यह किसी सरकारी
              विभाग की आधिकारिक वेबसाइट नहीं है।
            </p>
            <div>
              <h4 className="font-display font-semibold text-slate-900">
                1. भर्ती व शुल्क जानकारी
              </h4>
              <p className="mt-1">
                वेबसाइट पर दिखाई गई सरकारी भर्तियां, तिथियां और फीस आधिकारिक नोटिफिकेशन पर आधारित
                हैं। अंतिम आवेदन से पहले दुकान काउंटर पर आधिकारिक पोर्टल से सत्यापन किया जाता है।
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-slate-900">
                2. दुकान का पता व संपर्क (Contact Page)
              </h4>
              <ul className="mt-1.5 space-y-1">
                <li>
                  <strong>दुकान का नाम:</strong> {SHOP_INFO.brand} ({SHOP_INFO.englishBrand})
                </li>
                <li>
                  <strong>पता:</strong> {SHOP_INFO.addressLine1}, {SHOP_INFO.addressLine2}
                </li>
                <li>
                  <strong>मोबाइल / व्हाट्सएप:</strong> {SHOP_INFO.phoneDisplay}
                </li>
                <li>
                  <strong>ईमेल:</strong> {SHOP_INFO.email}
                </li>
                <li>
                  <strong>समय:</strong> {SHOP_INFO.timings}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
