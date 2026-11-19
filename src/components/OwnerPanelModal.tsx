import { useState, type FormEvent } from 'react';
import { Bell, Lock, MessageCircle, Plus, Trash2, X } from 'lucide-react';
import { SHOP_INFO, type UpdateType, type VacancyItem } from '../data/catalog';

interface OwnerPanelModalProps {
  open: boolean;
  onClose: () => void;
  vacancies: VacancyItem[];
  onAddVacancy: (item: VacancyItem) => void;
  onDeleteVacancy: (id: string) => void;
  shopNotice: string;
  onUpdateShopNotice: (notice: string) => void;
}

const OWNER_PIN = '4866';

export function OwnerPanelModal({
  open,
  onClose,
  vacancies,
  onAddVacancy,
  onDeleteVacancy,
  shopNotice,
  onUpdateShopNotice,
}: OwnerPanelModalProps) {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState('');

  // New notification form state
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('MPESB (व्यापम)');
  const [updateType, setUpdateType] = useState<UpdateType>('भर्ती फॉर्म');
  const [qualification, setQualification] = useState('10वीं / 12वीं पास');
  const [ageLimit, setAgeLimit] = useState('18 – 33 वर्ष');
  const [lastDate, setLastDate] = useState('31 दिसंबर 2026');
  const [expiresOn, setExpiresOn] = useState('2026-12-31');
  const [genFee, setGenFee] = useState(500);
  const [scFee, setScFee] = useState(250);
  const [officialSummary, setOfficialSummary] = useState('');
  const [formError, setFormError] = useState('');

  if (!open) return null;

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (pin.trim() === OWNER_PIN) {
      setUnlocked(true);
      setPinError('');
    } else {
      setPinError('गलत पिन। सही मालिक पिन दर्ज करें (4866)।');
    }
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setFormError('कृपया भर्ती या एडमिट कार्ड का पूरा नाम लिखें।');
      return;
    }

    const newItem: VacancyItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      department: department.trim() || 'सरकारी विभाग',
      level: department.toLowerCase().includes('ssc') || department.includes('रेलवे')
        ? 'केंद्र सरकार'
        : 'मध्य प्रदेश',
      updateType,
      qualification: qualification.trim() || 'आधिकारिक नोटिफिकेशन अनुसार',
      ageLimit: ageLimit.trim() || '18 – 35 वर्ष',
      startDate: 'जारी',
      lastDate: lastDate.trim() || 'अंतिम तिथि तक',
      expiresOn: expiresOn || '2026-12-31',
      status:
        updateType === 'एडमिट कार्ड'
          ? 'एडमिट कार्ड जारी'
          : updateType === 'आने वाली भर्ती'
          ? 'जल्द शुरू'
          : 'आवेदन चालू',
      sourcePortal: 'आधिकारिक नोटिफिकेशन (Owner Verified)',
      notificationRef: `SC-NOTIF-${new Date().getFullYear()}`,
      officialSummary:
        officialSummary.trim() ||
        'आधिकारिक नोटिफिकेशन जारी हो चुका है। आवेदन व फीस भुगतान के लिए सुप्रीम कंप्यूटर काउंटर पर पधारें।',
      fees: { GEN: genFee, OBC: scFee, SC_ST: scFee, EWS: scFee },
      serviceCharge: updateType === 'एडमिट कार्ड' ? 20 : 60,
      requiredDocs: ['आधार कार्ड', 'मार्कशीट', 'समग्र आईडी', 'फोटो व हस्ताक्षर'],
    };

    onAddVacancy(newItem);
    setTitle('');
    setOfficialSummary('');
    setFormError('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="दुकान मालिक नोटिफिकेशन पैनल"
      className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
            <h3 className="font-display text-lg font-bold text-slate-900">
              दुकान मालिक (Owner) नोटिफिकेशन पैनल
            </h3>
          </div>
          <button
            type="button"
            aria-label="पैनल बंद करें"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!unlocked ? (
          <form onSubmit={handleUnlock} className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">
              नई सरकारी भर्ती, एडमिट कार्ड या आधिकारिक नोटिफिकेशन जोड़ने/हटाने के लिए मालिक पिन
              (4866) दर्ज करें।
            </p>
            <div>
              <label htmlFor="owner-pin" className="block text-sm font-semibold text-slate-900">
                मालिक पिन (Owner PIN)
              </label>
              <div className="mt-1.5 flex gap-3">
                <input
                  id="owner-pin"
                  type="password"
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="4 अंकों का पिन"
                  className="flex-1 px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg cursor-pointer"
                >
                  <Lock className="w-4 h-4" aria-hidden="true" />
                  खोलें
                </button>
              </div>
              {pinError && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                  {pinError}
                </p>
              )}
            </div>
          </form>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Shop Open / Closed & Holiday Notice */}
            <div className="space-y-3 bg-amber-50/70 p-4 rounded-lg border border-amber-200">
              <p className="text-sm font-bold text-slate-900">
                दुकान खुलने / बंद रहने की सूचना (1–2 दिन पहले अपडेट करें)
              </p>
              <input
                type="text"
                aria-label="दुकान खुलने या छुट्टी की सूचना"
                value={shopNotice}
                onChange={(e) => onUpdateShopNotice(e.target.value)}
                placeholder="जैसे: कल रविवार को दुकान बंद रहेगी / आज दुकान खुली है (9:00 AM – 8:30 PM)"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateShopNotice('')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md cursor-pointer"
                >
                  सामान्य समय (खुली है)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateShopNotice('सूचना: कल सुप्रीम कंप्यूटर की दुकान अवकाश के कारण बंद रहेगी।')
                  }
                  className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 border border-amber-300 rounded-md cursor-pointer"
                >
                  कल दुकान बंद रहेगी
                </button>
                <a
                  href={`${SHOP_INFO.whatsappHref}?text=${encodeURIComponent(
                    shopNotice || 'सुप्रीम कंप्यूटर आज खुला है (सुबह 9:00 – रात 8:30)।'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#15803D] rounded-md"
                >
                  व्हाट्सएप पर सूचना भेजें
                </a>
              </div>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 bg-[#F8FAFC] p-4 rounded-lg border border-slate-200">
              <p className="text-sm font-bold text-slate-900">
                नया आधिकारिक नोटिफिकेशन / एडमिट कार्ड जोड़ें
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="notif-title" className="block text-xs font-semibold text-slate-700">
                    भर्ती / एडमिट कार्ड का नाम
                  </label>
                  <input
                    id="notif-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="जैसे: एमपी वनरक्षक भर्ती 2026 या MPPSC एडमिट कार्ड"
                    className="mt-1 w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="notif-type" className="block text-xs font-semibold text-slate-700">
                    श्रेणी
                  </label>
                  <select
                    id="notif-type"
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value as UpdateType)}
                    className="mt-1 w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  >
                    <option value="भर्ती फॉर्म">भर्ती फॉर्म</option>
                    <option value="एडमिट कार्ड">एडमिट कार्ड</option>
                    <option value="आने वाली भर्ती">आने वाली भर्ती</option>
                    <option value="छात्रवृत्ति व योजना">छात्रवृत्ति व योजना</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notif-dept" className="block text-xs font-semibold text-slate-700">
                    विभाग / बोर्ड
                  </label>
                  <input
                    id="notif-dept"
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="notif-qual" className="block text-xs font-semibold text-slate-700">
                    योग्यता
                  </label>
                  <input
                    id="notif-qual"
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="notif-age" className="block text-xs font-semibold text-slate-700">
                    आयु सीमा
                  </label>
                  <input
                    id="notif-age"
                    type="text"
                    value={ageLimit}
                    onChange={(e) => setAgeLimit(e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="notif-lastdate" className="block text-xs font-semibold text-slate-700">
                    अंतिम तिथि (दिखाने हेतु)
                  </label>
                  <input
                    id="notif-lastdate"
                    type="text"
                    value={lastDate}
                    onChange={(e) => setLastDate(e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="notif-expires" className="block text-xs font-semibold text-slate-700">
                    ऑटो-हाइड तारीख (YYYY-MM-DD)
                  </label>
                  <input
                    id="notif-expires"
                    type="date"
                    value={expiresOn}
                    onChange={(e) => setExpiresOn(e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="notif-genfee" className="block text-xs font-semibold text-slate-700">
                    सामान्य फीस (₹)
                  </label>
                  <input
                    id="notif-genfee"
                    type="number"
                    min={0}
                    value={genFee}
                    onChange={(e) => setGenFee(Number(e.target.value) || 0)}
                    className="mt-1 w-full px-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="notif-scfee" className="block text-xs font-semibold text-slate-700">
                    OBC / SC-ST फीस (₹)
                  </label>
                  <input
                    id="notif-scfee"
                    type="number"
                    min={0}
                    value={scFee}
                    onChange={(e) => setScFee(Number(e.target.value) || 0)}
                    className="mt-1 w-full px-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notif-summary" className="block text-xs font-semibold text-slate-700">
                    आधिकारिक नोटिफिकेशन विवरण
                  </label>
                  <textarea
                    id="notif-summary"
                    rows={2}
                    value={officialSummary}
                    onChange={(e) => setOfficialSummary(e.target.value)}
                    placeholder="पदों की संख्या, परीक्षा तिथि व मुख्य शर्तें..."
                    className="mt-1 w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {formError && (
                <p role="alert" className="text-xs font-medium text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  वेबसाइट पर पब्लिश करें
                </button>

                <a
                  href={`${SHOP_INFO.whatsappHref}?text=${encodeURIComponent(
                    `सुप्रीम कंप्यूटर नया अपडेट: ${title || 'नई सरकारी भर्ती/एडमिट कार्ड'} (${updateType}) — अंतिम तिथि: ${lastDate}।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  व्हाट्सएप (9893574866) पर अलर्ट भेजें
                </a>
              </div>
            </form>

            <div>
              <p className="text-xs font-semibold text-slate-700 mb-2">
                वेबसाइट पर मौजूद नोटिफिकेशन ({vacancies.length})
              </p>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {vacancies.map((v) => (
                  <li
                    key={v.id}
                    className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{v.title}</p>
                      <p className="text-slate-500">
                        {v.updateType} · अंतिम तिथि: {v.lastDate}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`${v.title} हटाएं`}
                      onClick={() => onDeleteVacancy(v.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
