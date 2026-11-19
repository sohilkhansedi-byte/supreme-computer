export type PortalCategory =
  | 'सभी'
  | 'मध्य प्रदेश'
  | 'केंद्र सरकार'
  | 'भर्ती एवं परीक्षा'
  | 'पहचान व दस्तावेज';

export interface GovPortal {
  id: string;
  name: string;
  englishTag: string;
  category: Exclude<PortalCategory, 'सभी'>;
  domain: string;
  description: string;
  shopTasks: string[];
}

export type ApplicantCategory = 'GEN' | 'OBC' | 'SC_ST' | 'EWS';

export type UpdateType = 'भर्ती फॉर्म' | 'एडमिट कार्ड' | 'आने वाली भर्ती' | 'छात्रवृत्ति व योजना';

export interface VacancyItem {
  id: string;
  title: string;
  department: string;
  level: 'मध्य प्रदेश' | 'केंद्र सरकार';
  updateType: UpdateType;
  qualification: string;
  ageLimit: string;
  startDate: string;
  lastDate: string;
  /** ISO date YYYY-MM-DD — items before today are automatically hidden */
  expiresOn: string;
  status: 'आवेदन चालू' | 'जल्द बंद' | 'एडमिट कार्ड जारी' | 'जल्द शुरू';
  sourcePortal: string;
  notificationRef: string;
  officialSummary: string;
  fees: Record<ApplicantCategory, number>;
  serviceCharge: number;
  requiredDocs: string[];
}

export interface ServiceOffering {
  number: string;
  title: string;
  englishSubtitle: string;
  summary: string;
  items: string[];
  turnaround: string;
  image?: string;
  imageAlt?: string;
}

export const SHOP_INFO = {
  brand: 'सुप्रीम कंप्यूटर',
  englishBrand: 'Supreme Computer',
  domain: 'supremecomputer.com',
  addressLine1: 'चौरई बस स्टैंड, नगर पालिका के सामने',
  addressLine2: 'चौरई, जिला छिंदवाड़ा, मध्य प्रदेश — 480115',
  timings: 'सोमवार – शनिवार: सुबह 9:00 – रात 8:30 · रविवार: सुबह 10:00 – शाम 4:00',
  phoneDisplay: '+91 98935 74866',
  phoneRaw: '9893574866',
  phoneHref: 'tel:+919893574866',
  whatsappHref: 'https://wa.me/919893574866',
  email: 'help@supremecomputer.com',
};

export const HERO_IMAGE = '/src/assets/images/hero_supreme_computer_1795107166442.jpg';

export const SERVICES: ServiceOffering[] = [
  {
    number: '01',
    title: 'सरकारी एवं एमपी ऑनलाइन सेवाएं',
    englishSubtitle: 'MP Online & CSC Services',
    summary:
      'सभी सरकारी प्रमाण पत्र, ई-केवाईसी और ऑनलाइन आवेदन हमारे काउंटर पर अधिकृत एमपी ऑनलाइन एवं सीएससी पोर्टल से किए जाते हैं।',
    items: [
      'आय, जाति एवं मूल निवासी प्रमाण पत्र (लोक सेवा गारंटी)',
      'समग्र आईडी ई-केवाईसी, परिवार जोड़ना व नाम सुधार',
      'आयुष्मान भारत कार्ड एवं संबल कार्ड आवेदन',
      'खसरा, खतौनी एवं बी-1 नकल (एमपी भू-अभिलेख)',
      'नया पैन कार्ड, पैन सुधार एवं आधार प्रिंट',
      'लाड़ली बहना, पीएम किसान एवं पेंशन ई-केवाईसी',
      'सभी सरकारी विभागों के ऑफलाइन व ऑनलाइन फॉर्म उपलब्ध',
    ],
    turnaround: 'तुरंत ऑनलाइन आवेदन · पक्की रसीद काउंटर पर',
    image: '/src/assets/images/service_desk_equipment_1795107028365.jpg',
    imageAlt: 'सुप्रीम कंप्यूटर पर सरकारी ऑनलाइन फॉर्म और बायोमेट्रिक काउंटर',
  },
  {
    number: '02',
    title: 'फोटोकॉपी, लैमिनेशन, स्टेशनरी, सील व बिल बुक',
    englishSubtitle: 'Photocopy, Lamination, Stationery, Seal & Bill Book',
    summary:
      'तेज़ लेज़र फोटोकॉपी, थर्मल लैमिनेशन, ऑफिस/स्कूल स्टेशनरी, स्टाम्प पैड वाली रबर सील (मुहर) और दुकान/व्यापार के लिए बिल बुक छपाई।',
    items: [
      'A4 एवं लीगल ब्लैक एंड व्हाइट फोटोकॉपी (50+ पेज पर ₹1.50/पेज)',
      'व्हाट्सएप (9893574866), ईमेल या पेनड्राइव से HD कलर प्रिंट',
      'A4, लीगल एवं स्मार्ट आईडी कार्ड (आधार/पैन) थर्मल लैमिनेशन',
      'स्टाम्प पैड वाली सील / रबर मुहर (दुकान, ऑफिस व नाम की सील)',
      'दुकान एवं व्यापार के लिए कस्टम बिल बुक (Bill Book) प्रिंटिंग',
      'स्कूल व ऑफिस स्टेशनरी (फाइल, पेन, रजिस्टर, लिफाफे आदि) एवं स्पायरल बाइंडिंग',
    ],
    turnaround: 'काउंटर पर तुरंत डिलीवरी · सील व बिल बुक ऑर्डर पर',
    image: '/src/assets/images/service_photocopy_lamination_1795105223448.jpg',
    imageAlt: 'फोटोकॉपी मशीन और डॉक्यूमेंट लैमिनेशन मशीन',
  },
  {
    number: '03',
    title: 'सरकारी भर्ती फॉर्म, एडमिट कार्ड एवं छात्रवृत्ति',
    englishSubtitle: 'Vacancy Forms & Scholarships',
    summary:
      'बिना किसी गलती के सभी सरकारी नौकरी के फॉर्म, ऑनलाइन फीस भुगतान, एडमिट कार्ड और छात्रवृत्ति आवेदन दुकान पर करवाएं।',
    items: [
      'MPESB (व्यापम), एमपी पुलिस, पटवारी एवं MPPSC फॉर्म',
      'SSC GD/CHSL, रेलवे (RRB), अग्निवीर एवं बैंकिंग परीक्षा',
      'कॉलेज एडमिशन (ई-प्रवेश) एवं एमपी बोर्ड परीक्षा फॉर्म',
      'एमपी पोस्ट-मैट्रिक एवं राष्ट्रीय छात्रवृत्ति (NSP) आवेदन',
    ],
    turnaround: '10–15 मिनट में पूरा फॉर्म व प्रिंट स्लिप',
  },
  {
    number: '04',
    title: 'बैंकिंग, बिल भुगतान एवं टिकट बुकिंग',
    englishSubtitle: 'AEPS Banking, Bills & Tickets',
    summary:
      'आधार से नकद निकासी, बिजली-पानी बिल भुगतान और कन्फर्म ट्रेन व बस टिकट बुकिंग की सुविधा।',
    items: [
      'AEPS आधार अंगूठा लगाकर नकद निकासी एवं बैलेंस जांच',
      'बिजली बिल (MPPKVVCL), नल एवं गैस बिल भुगतान',
      'IRCTC ट्रेन टिकट एवं चौरई–छिंदवाड़ा–नागपुर बस टिकट',
      'फास्टैग (FASTag) रिचार्ज एवं मोबाइल/डीटीएच रिचार्ज',
    ],
    turnaround: 'तुरंत कन्फर्मेशन एवं रसीद',
  },
];

export const GOV_PORTALS: GovPortal[] = [
  {
    id: 'mponline',
    name: 'एमपी ऑनलाइन पोर्टल',
    englishTag: 'MP Online',
    category: 'मध्य प्रदेश',
    domain: 'mponline.gov.in',
    description: 'मध्य प्रदेश की सभी सरकारी सेवाएं, कॉलेज फॉर्म, बिजली बिल और नगर पालिका कार्य।',
    shopTasks: ['कॉलेज फॉर्म', 'बिजली बिल', 'नागरिक सेवाएं'],
  },
  {
    id: 'mpesb',
    name: 'म.प्र. कर्मचारी चयन मंडल (व्यापम)',
    englishTag: 'MPESB',
    category: 'भर्ती एवं परीक्षा',
    domain: 'esb.mp.gov.in',
    description: 'एमपी पुलिस, पटवारी, ग्रुप-2, वर्ग-1/2/3 भर्ती की जानकारी, फॉर्म और एडमिट कार्ड।',
    shopTasks: ['भर्ती फॉर्म', 'एडमिट कार्ड', 'रिजल्ट प्रिंट'],
  },
  {
    id: 'samagra',
    name: 'समग्र पोर्टल (मध्य प्रदेश)',
    englishTag: 'Samagra ID',
    category: 'मध्य प्रदेश',
    domain: 'samagra.gov.in',
    description: 'परिवार व सदस्य समग्र आईडी प्रिंट, आधार ई-केवाईसी, नाम सुधार और नया सदस्य जोड़ना।',
    shopTasks: ['समग्र ई-केवाईसी', 'परिवार आईडी', 'नाम सुधार'],
  },
  {
    id: 'mpedistrict',
    name: 'लोक सेवा गारंटी (ई-डिस्ट्रिक्ट)',
    englishTag: 'MP e-District',
    category: 'मध्य प्रदेश',
    domain: 'mpedistrict.gov.in',
    description: 'डिजिटल हस्ताक्षरित आय, जाति और मूल निवासी प्रमाण पत्र का आवेदन व डाउनलोड।',
    shopTasks: ['आय प्रमाण पत्र', 'मूल निवासी', 'जाति प्रमाण पत्र'],
  },
  {
    id: 'mpbhulekh',
    name: 'म.प्र. भू-अभिलेख (खसरा-खतौनी)',
    englishTag: 'MP Bhulekh',
    category: 'मध्य प्रदेश',
    domain: 'mpbhulekh.gov.in',
    description: 'प्रमाणित खसरा, खतौनी, बी-1 नकल और गांव का भू-नक्शा प्रिंट करवाएं।',
    shopTasks: ['खसरा / बी-1 नकल', 'भू-नक्शा', 'प्रमाणित कॉपी'],
  },
  {
    id: 'uidai',
    name: 'आधार सेवा (UIDAI)',
    englishTag: 'Aadhaar',
    category: 'पहचान व दस्तावेज',
    domain: 'myaadhaar.uidai.gov.in',
    description: 'ई-आधार प्रिंट, पीवीसी स्मार्ट आधार कार्ड ऑर्डर, पता अपडेट और बैंक सीडिंग जांच।',
    shopTasks: ['आधार प्रिंट', 'पीवीसी कार्ड', 'पता अपडेट'],
  },
  {
    id: 'nsdl-pan',
    name: 'पैन कार्ड सेवा (NSDL / UTI)',
    englishTag: 'PAN Card',
    category: 'पहचान व दस्तावेज',
    domain: 'nsdl.com',
    description: 'नया पैन कार्ड आवेदन, नाम या जन्मतिथि सुधार और खोए पैन कार्ड की रिप्रिंट कॉपी।',
    shopTasks: ['नया पैन कार्ड', 'पैन सुधार', 'ई-पैन प्रिंट'],
  },
  {
    id: 'ssc',
    name: 'कर्मचारी चयन आयोग (SSC)',
    englishTag: 'SSC Jobs',
    category: 'भर्ती एवं परीक्षा',
    domain: 'ssc.gov.in',
    description: 'SSC GD, CHSL, CGL और MTS केंद्रीय भर्तियों का वन-टाइम रजिस्ट्रेशन व आवेदन।',
    shopTasks: ['OTR रजिस्ट्रेशन', 'SSC GD / CHSL', 'एडमिट कार्ड'],
  },
  {
    id: 'nsp',
    name: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
    englishTag: 'Scholarship',
    category: 'केंद्र सरकार',
    domain: 'scholarships.gov.in',
    description: 'केंद्र व राज्य की प्री-मैट्रिक और पोस्ट-मैट्रिक छात्रवृत्ति का नया व नवीनीकरण फॉर्म।',
    shopTasks: ['छात्रवृत्ति फॉर्म', 'नवीनीकरण', 'स्टेटस जांच'],
  },
  {
    id: 'pmkisan',
    name: 'पीएम किसान सम्मान निधि',
    englishTag: 'PM-KISAN',
    category: 'केंद्र सरकार',
    domain: 'pmkisan.gov.in',
    description: 'किसान पंजीकरण, किस्त की स्थिति जांच और अनिवार्य आधार ई-केवाईसी।',
    shopTasks: ['किसान ई-केवाईसी', 'किस्त स्टेटस', 'नया पंजीकरण'],
  },
  {
    id: 'parivahan',
    name: 'परिवहन सेवा (RTO)',
    englishTag: 'Parivahan',
    category: 'केंद्र सरकार',
    domain: 'parivahan.gov.in',
    description: 'लर्निंग लाइसेंस, ड्राइविंग लाइसेंस नवीनीकरण, वाहन आरसी और ई-चालान भुगतान।',
    shopTasks: ['लर्निंग लाइसेंस', 'वाहन आरसी', 'ई-चालान'],
  },
  {
    id: 'digilocker',
    name: 'डिजिलॉकर एवं ABC आईडी',
    englishTag: 'DigiLocker',
    category: 'पहचान व दस्तावेज',
    domain: 'digilocker.gov.in',
    description: '10वीं/12वीं की मार्कशीट, कॉलेज की ABC आईडी और सत्यापित दस्तावेज प्राप्त करें।',
    shopTasks: ['ABC आईडी कार्ड', 'मार्कशीट डाउनलोड', 'दस्तावेज सत्यापन'],
  },
];

export const VACANCIES: VacancyItem[] = [
  {
    id: 'mp-police-constable',
    title: 'म.प्र. पुलिस आरक्षक (Constable) भर्ती',
    department: 'MPESB (व्यापम) · गृह विभाग',
    level: 'मध्य प्रदेश',
    updateType: 'भर्ती फॉर्म',
    qualification: '10वीं / 12वीं पास',
    ageLimit: '18 – 33 वर्ष (आरक्षित वर्ग को छूट)',
    startDate: '10 नवंबर 2026',
    lastDate: '15 दिसंबर 2026',
    expiresOn: '2026-12-15',
    status: 'आवेदन चालू',
    sourcePortal: 'MPESB पोर्टल अपडेट',
    notificationRef: 'MPESB/2026/POL-CONSTABLE',
    officialSummary:
      'मध्य प्रदेश पुलिस आरक्षक (GD एवं रेडियो) के पदों पर ऑनलाइन आवेदन चालू हैं। लिखित परीक्षा व शारीरिक दक्षता परीक्षा के आधार पर चयन होगा।',
    fees: { GEN: 500, OBC: 250, SC_ST: 250, EWS: 250 },
    serviceCharge: 60,
    requiredDocs: ['आधार कार्ड', '10वीं / 12वीं मार्कशीट', 'समग्र आईडी', 'पासपोर्ट फोटो व हस्ताक्षर', 'रोजगार पंजीयन'],
  },
  {
    id: 'mp-patwari-group2',
    title: 'म.प्र. ग्रुप-2 (सब ग्रुप-4) एवं पटवारी भर्ती',
    department: 'MPESB · राजस्व विभाग',
    level: 'मध्य प्रदेश',
    updateType: 'भर्ती फॉर्म',
    qualification: 'स्नातक (Graduation)',
    ageLimit: '18 – 40 वर्ष',
    startDate: '01 नवंबर 2026',
    lastDate: '28 नवंबर 2026',
    expiresOn: '2026-11-28',
    status: 'जल्द बंद',
    sourcePortal: 'MPESB पोर्टल अपडेट',
    notificationRef: 'MPESB/2026/GRP2-SUB4',
    officialSummary:
      'पटवारी, सहायक संपरीक्षक एवं समकक्ष पदों के लिए आधिकारिक नियमपुस्तिका जारी हो चुकी है। अंतिम तिथि से पहले दुकान पर आवेदन करवाएं।',
    fees: { GEN: 500, OBC: 250, SC_ST: 250, EWS: 250 },
    serviceCharge: 60,
    requiredDocs: ['स्नातक मार्कशीट', 'आधार कार्ड', 'जाति व मूल निवासी प्रमाण पत्र', 'पासपोर्ट फोटो'],
  },
  {
    id: 'mpesb-admit-card-2026',
    title: 'MPESB ग्रुप-4 एवं सहायक ग्रेड-3 एडमिट कार्ड',
    department: 'MPESB (व्यापम) · परीक्षा प्रवेश पत्र',
    level: 'मध्य प्रदेश',
    updateType: 'एडमिट कार्ड',
    qualification: 'आवेदन नंबर व जन्मतिथि',
    ageLimit: 'लागू नहीं',
    startDate: 'जारी',
    lastDate: 'परीक्षा तिथि तक',
    expiresOn: '2026-12-25',
    status: 'एडमिट कार्ड जारी',
    sourcePortal: 'MPESB पोर्टल अपडेट',
    notificationRef: 'MPESB/2026/GRP4-TAC',
    officialSummary:
      'परीक्षा का प्रवेश पत्र (Admit Card) जारी हो गया है। परीक्षा केंद्र पर ले जाने के लिए साफ प्रिंटआउट हमारी दुकान से प्राप्त करें।',
    fees: { GEN: 0, OBC: 0, SC_ST: 0, EWS: 0 },
    serviceCharge: 20,
    requiredDocs: ['आवेदन क्रमांक (Application No.)', 'जन्म तिथि', 'आधार कार्ड'],
  },
  {
    id: 'mp-forest-guard-upcoming',
    title: 'म.प्र. वनरक्षक एवं क्षेत्ररक्षक भर्ती (आने वाली)',
    department: 'MPESB · वन विभाग मध्य प्रदेश',
    level: 'मध्य प्रदेश',
    updateType: 'आने वाली भर्ती',
    qualification: '10वीं पास',
    ageLimit: '18 – 33 वर्ष',
    startDate: '05 दिसंबर 2026 (संभावित)',
    lastDate: '04 जनवरी 2027',
    expiresOn: '2027-01-04',
    status: 'जल्द शुरू',
    sourcePortal: 'MPESB परीक्षा कैलेंडर',
    notificationRef: 'MPESB/2026/FOREST-CAL',
    officialSummary:
      'वनरक्षक व जेल प्रहरी की आधिकारिक अधिसूचना परीक्षा कैलेंडर में घोषित हो चुकी है। दस्तावेज (रोजगार पंजीयन व प्रोफाइल) अभी से तैयार करवा लें।',
    fees: { GEN: 500, OBC: 250, SC_ST: 250, EWS: 250 },
    serviceCharge: 60,
    requiredDocs: ['10वीं मार्कशीट', 'आधार कार्ड', 'समग्र आईडी', 'रोजगार पंजीयन'],
  },
  {
    id: 'ssc-gd-2026',
    title: 'SSC GD कांस्टेबल (CAPF, NIA, SSF) भर्ती',
    department: 'कर्मचारी चयन आयोग (SSC)',
    level: 'केंद्र सरकार',
    updateType: 'भर्ती फॉर्म',
    qualification: '10वीं पास',
    ageLimit: '18 – 23 वर्ष',
    startDate: '12 नवंबर 2026',
    lastDate: '20 दिसंबर 2026',
    expiresOn: '2026-12-20',
    status: 'आवेदन चालू',
    sourcePortal: 'SSC पोर्टल अपडेट',
    notificationRef: 'SSC/2026/CT-GD',
    officialSummary:
      'BSF, CISF, CRPF, SSB, ITBP और असम राइफल्स में कांस्टेबल (GD) भर्ती के लिए OTR एवं ऑनलाइन आवेदन चालू हैं।',
    fees: { GEN: 100, OBC: 100, SC_ST: 0, EWS: 100 },
    serviceCharge: 50,
    requiredDocs: ['10वीं मार्कशीट', 'आधार कार्ड', 'लाइव फोटो (दुकान पर ली जाएगी)', 'हस्ताक्षर'],
  },
  {
    id: 'ssc-chsl-admit-card',
    title: 'SSC CHSL टियर-1 परीक्षा एडमिट कार्ड',
    department: 'कर्मचारी चयन आयोग (SSC)',
    level: 'केंद्र सरकार',
    updateType: 'एडमिट कार्ड',
    qualification: 'रजिस्ट्रेशन नंबर व DOB',
    ageLimit: 'लागू नहीं',
    startDate: 'जारी',
    lastDate: 'परीक्षा तिथि तक',
    expiresOn: '2026-12-18',
    status: 'एडमिट कार्ड जारी',
    sourcePortal: 'SSC पोर्टल अपडेट',
    notificationRef: 'SSC/2026/CHSL-T1-AC',
    officialSummary:
      'SSC CHSL टियर-1 परीक्षा के लिए शहर की जानकारी (City Intimation) एवं एडमिट कार्ड जारी हो चुके हैं।',
    fees: { GEN: 0, OBC: 0, SC_ST: 0, EWS: 0 },
    serviceCharge: 20,
    requiredDocs: ['SSC रजिस्ट्रेशन नंबर', 'जन्म तिथि', 'पहचान पत्र'],
  },
  {
    id: 'rrb-ntpc',
    title: 'रेलवे RRB NTPC भर्ती (12वीं एवं स्नातक)',
    department: 'रेलवे भर्ती बोर्ड (RRB)',
    level: 'केंद्र सरकार',
    updateType: 'भर्ती फॉर्म',
    qualification: '12वीं / स्नातक',
    ageLimit: '18 – 33 वर्ष',
    startDate: '05 नवंबर 2026',
    lastDate: '10 दिसंबर 2026',
    expiresOn: '2026-12-10',
    status: 'आवेदन चालू',
    sourcePortal: 'रेलवे पोर्टल अपडेट',
    notificationRef: 'CEN/RRB/NTPC-2026',
    officialSummary:
      'भारतीय रेलवे में स्टेशन मास्टर, क्लर्क एवं कमर्शियल अप्रेंटिस पदों हेतु आधिकारिक आवेदन चालू हैं।',
    fees: { GEN: 500, OBC: 500, SC_ST: 250, EWS: 250 },
    serviceCharge: 60,
    requiredDocs: ['12वीं / डिग्री मार्कशीट', 'आधार कार्ड', 'जाति प्रमाण पत्र', 'बैंक पासबुक (रिफंड हेतु)'],
  },
  {
    id: 'mp-scholarship-2026',
    title: 'म.प्र. पोस्ट-मैट्रिक छात्रवृत्ति (SC/ST/OBC)',
    department: 'जनजातीय एवं पिछड़ा वर्ग कल्याण',
    level: 'मध्य प्रदेश',
    updateType: 'छात्रवृत्ति व योजना',
    qualification: 'कॉलेज छात्र',
    ageLimit: 'लागू नहीं',
    startDate: '01 नवंबर 2026',
    lastDate: '30 दिसंबर 2026',
    expiresOn: '2026-12-30',
    status: 'आवेदन चालू',
    sourcePortal: 'MPTAAS पोर्टल अपडेट',
    notificationRef: 'MPTAAS/2026/PMS',
    officialSummary:
      'कॉलेज विद्यार्थियों के लिए MPTAAS पोर्टल पर नया एवं नवीनीकरण छात्रवृत्ति आवेदन चालू है।',
    fees: { GEN: 0, OBC: 0, SC_ST: 0, EWS: 0 },
    serviceCharge: 50,
    requiredDocs: ['समग्र आईडी', 'आय एवं जाति प्रमाण पत्र', 'कॉलेज फीस रसीद', 'आधार लिंक बैंक खाता'],
  },
];
