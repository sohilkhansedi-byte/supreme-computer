import { useState } from 'react';
import { FileText } from 'lucide-react';
import { SERVICES, SHOP_INFO, type ServiceOffering } from '../data/catalog';

function ServiceCardImage({ service }: { service: ServiceOffering }) {
  const [failed, setFailed] = useState(false);

  if (!service.image) return null;

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3]">
      {!failed ? (
        <img
          src={service.image}
          alt={service.imageAlt || service.title}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100">
          <FileText className="w-8 h-8 text-slate-400 mb-2" aria-hidden="true" />
          <span className="text-xs font-medium text-slate-600">{service.title}</span>
        </div>
      )}
    </div>
  );
}

export function ServicesSection() {
  const featured = SERVICES.slice(0, 2);
  const secondary = SERVICES.slice(2);

  return (
    <section id="services" className="py-16 lg:py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#1D4ED8]">हमारी सेवाएं · Our Services</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">
            सभी सरकारी फॉर्म, फोटोकॉपी व लैमिनेशन एक ही काउंटर पर
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            चाहे सरकारी भर्ती का फॉर्म भरवाना हो, आय-जाति प्रमाण पत्र बनवाना हो या तुरंत फोटोकॉपी व
            लैमिनेशन करवाना हो—हमारे यहां हर काम सही और पक्की रसीद के साथ किया जाता है।
          </p>
        </div>

        {/* Featured 2-column visual row */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featured.map((service) => (
            <article
              key={service.number}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {service.number}. {service.englishSubtitle}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  {service.items.map((item) => (
                    <li key={item} className="text-sm text-slate-700 flex items-start gap-2.5">
                      <span className="text-[#1D4ED8] font-semibold" aria-hidden="true">
                        –
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <ServiceCardImage service={service} />
                <p className="mt-4 text-xs font-medium text-slate-500">{service.turnaround}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Secondary 2-column compact row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {secondary.map((service) => (
            <article
              key={service.number}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8"
            >
              <p className="text-xs font-medium text-slate-500">
                {service.number}. {service.englishSubtitle}
              </p>
              <h3 className="mt-1.5 font-display text-xl font-bold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.summary}</p>
              <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {service.items.map((item) => (
                  <li key={item} className="text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="text-[#1D4ED8] font-semibold" aria-hidden="true">
                      –
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium text-slate-500">{service.turnaround}</p>
            </article>
          ))}
        </div>

        {/* How Customers Can Avail These Services */}
        <div className="mt-10 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <p className="text-xs font-medium text-[#1D4ED8]">सेवा कैसे प्राप्त करें</p>
          <h3 className="mt-1 font-display text-xl font-bold text-slate-900">
            सुप्रीम कंप्यूटर पर काम करवाने के 3 आसान चरण
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-slate-100">
            <div>
              <p className="font-mono text-xs font-semibold text-[#1D4ED8]">01.</p>
              <p className="mt-1 font-display font-semibold text-slate-900">
                जानकारी देखें व दस्तावेज लाएं
              </p>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                वेबसाइट पर भर्ती की तारीख और जरूरी दस्तावेज देखें। अपने मूल दस्तावेज (आधार, समग्र,
                मार्कशीट) लेकर दुकान आएं या प्रिंट के लिए फाइल व्हाट्सएप करें:{' '}
                <span className="font-mono font-semibold text-slate-900">{SHOP_INFO.phoneRaw}</span>
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold text-[#1D4ED8]">02.</p>
              <p className="mt-1 font-display font-semibold text-slate-900">
                दुकान पर ऑनलाइन फॉर्म व फीस भुगतान
              </p>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                चौरई बस स्टैंड, नगर पालिका के सामने स्थित हमारे काउंटर पर पधारें। हमारे ऑपरेटर
                आपके सामने स्क्रीन पर फॉर्म भरकर सरकारी फीस का सुरक्षित भुगतान करेंगे।
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold text-[#1D4ED8]">03.</p>
              <p className="mt-1 font-display font-semibold text-slate-900">
                पक्की रसीद व लैमिनेटेड कॉपी लें
              </p>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                आवेदन पूरा होते ही प्रिंट की हुई पक्की रसीद, फोटोकॉपी या लैमिनेटेड दस्तावेज तुरंत
                काउंटर से प्राप्त करें।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
