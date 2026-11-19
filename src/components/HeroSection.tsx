import { useState } from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { HERO_IMAGE, SHOP_INFO } from '../data/catalog';

interface HeroSectionProps {
  onBookTokenClick: () => void;
}

export function HeroSection({ onBookTokenClick }: HeroSectionProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-600 mb-3">
              {SHOP_INFO.domain} · {SHOP_INFO.addressLine1}
            </p>

            <h1
              className="font-display font-bold tracking-tight text-slate-900 text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.18] max-w-2xl"
              style={{ textWrap: 'balance' }}
            >
              सभी सरकारी ऑनलाइन फॉर्म, फोटोकॉपी एवं लैमिनेशन — चौरई में एक ही जगह
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              यहाँ सरकारी भर्तियों की ताज़ा जानकारी, आवश्यक दस्तावेज और फीस देखें—और ऑनलाइन आवेदन,
              फीस भुगतान, फोटोकॉपी, लैमिनेशन, स्टेशनरी, स्टाम्प सील (मुहर) व बिल बुक बनवाने के लिए
              हमारी दुकान पर पधारें।
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookTokenClick}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D4ED8]"
              >
                दुकान के लिए टोकन बुक करें
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={SHOP_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
              >
                <Phone className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                कॉल करें: {SHOP_INFO.phoneRaw}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[260px] sm:min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
              {!imgFailed ? (
                <img
                  src={HERO_IMAGE}
                  alt="सुप्रीम कंप्यूटर — चौरई डिजिटल सेवा केंद्र और फोटोकॉपी काउंटर"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <MapPin className="w-10 h-10 text-[#1D4ED8] mb-3" aria-hidden="true" />
                  <p className="font-display font-semibold text-slate-900">
                    सुप्रीम कंप्यूटर — चौरई
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{SHOP_INFO.addressLine1}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quick Info Strip */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-slate-500">दुकान का पता</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              चौरई बस स्टैंड, नगर पालिका के सामने
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">दुकान का समय</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 tabular-nums">
              सुबह 9:00 – रात 8:30 (सोम – शनि)
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">फोटोकॉपी एवं लैमिनेशन</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 tabular-nums">
              ₹2/पेज · 50+ पेज पर ₹1.50/पेज
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">व्हाट्सएप एवं कॉल</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 font-mono tabular-nums">
              {SHOP_INFO.phoneDisplay}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
