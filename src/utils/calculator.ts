import type {
  ApplicantCategory,
  GovPortal,
  PortalCategory,
  VacancyItem,
} from '../data/catalog';

export interface PrintEstimateInput {
  bwPages: number;
  colorPages: number;
  a4Lamination: number;
  idLamination: number;
  spiralBinding: number;
}

export interface PrintEstimateResult {
  bwRate: number;
  bwCost: number;
  colorCost: number;
  a4LaminationCost: number;
  idLaminationCost: number;
  spiralBindingCost: number;
  bulkDiscountApplied: boolean;
  total: number;
}

export interface VacancyFeeResult {
  officialFee: number;
  portalServiceCharge: number;
  printAddonCost: number;
  total: number;
}

export interface TokenBookingInput {
  customerName: string;
  phone: string;
  serviceType: string;
  notes?: string;
  estimatedAmount?: number;
}

export interface TokenBookingRecord {
  tokenId: string;
  customerName: string;
  phone: string;
  serviceType: string;
  notes: string;
  estimatedAmount: number | null;
  createdAt: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    customerName?: string;
    phone?: string;
    serviceType?: string;
  };
}

export function clampNonNegativeInt(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.floor(value);
}

/**
 * Calculates photocopy, color print, lamination, and spiral binding costs.
 * Bulk discount: B&W photocopy drops from ₹2/page to ₹1.5/page for 50+ pages.
 */
export function calculatePrintEstimate(input: PrintEstimateInput): PrintEstimateResult {
  const bwPages = clampNonNegativeInt(input.bwPages);
  const colorPages = clampNonNegativeInt(input.colorPages);
  const a4Lamination = clampNonNegativeInt(input.a4Lamination);
  const idLamination = clampNonNegativeInt(input.idLamination);
  const spiralBinding = clampNonNegativeInt(input.spiralBinding);

  const bulkDiscountApplied = bwPages >= 50;
  const bwRate = bulkDiscountApplied ? 1.5 : 2;
  const bwCost = bwPages * bwRate;
  const colorCost = colorPages * 10;
  const a4LaminationCost = a4Lamination * 20;
  const idLaminationCost = idLamination * 15;
  const spiralBindingCost = spiralBinding * 40;

  const total = bwCost + colorCost + a4LaminationCost + idLaminationCost + spiralBindingCost;

  return {
    bwRate,
    bwCost,
    colorCost,
    a4LaminationCost,
    idLaminationCost,
    spiralBindingCost,
    bulkDiscountApplied,
    total,
  };
}

/**
 * Calculates total payable for an online government vacancy/service form.
 */
export function calculateVacancyFee(
  vacancy: VacancyItem,
  category: ApplicantCategory,
  includePrintAndScan: boolean
): VacancyFeeResult {
  const officialFee = vacancy.fees[category] ?? 0;
  const portalServiceCharge = vacancy.serviceCharge;
  const printAddonCost = includePrintAndScan ? 20 : 0;

  return {
    officialFee,
    portalServiceCharge,
    printAddonCost,
    total: officialFee + portalServiceCharge + printAddonCost,
  };
}

/**
 * Filters government portals by Hindi category and free-text query (Hindi or English).
 */
export function filterPortals(
  portals: GovPortal[],
  category: PortalCategory,
  query: string
): GovPortal[] {
  const normalizedQuery = query.trim().toLowerCase();

  return portals.filter((portal) => {
    const matchesCategory = category === 'सभी' || portal.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    return (
      portal.name.toLowerCase().includes(normalizedQuery) ||
      portal.englishTag.toLowerCase().includes(normalizedQuery) ||
      portal.domain.toLowerCase().includes(normalizedQuery) ||
      portal.description.toLowerCase().includes(normalizedQuery) ||
      portal.shopTasks.some((task) => task.toLowerCase().includes(normalizedQuery))
    );
  });
}

/**
 * Automatically hides any vacancy/admit card whose expiresOn date has passed.
 * Only currently running (active) items are returned.
 */
export function filterActiveUpdates(
  items: VacancyItem[],
  todayIso: string,
  updateType: 'सभी' | VacancyItem['updateType'] = 'सभी'
): VacancyItem[] {
  return items.filter((item) => {
    const isStillRunning = item.expiresOn >= todayIso;
    if (!isStillRunning) return false;
    if (updateType === 'सभी') return true;
    return item.updateType === updateType;
  });
}

/**
 * Validates customer token booking form inputs with Hindi error messages.
 */
export function validateTokenBooking(input: TokenBookingInput): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  const trimmedName = input.customerName.trim();
  const digitsOnlyPhone = input.phone.replace(/\D/g, '');

  if (trimmedName.length < 2) {
    errors.customerName = 'कृपया अपना पूरा नाम लिखें (कम से कम 2 अक्षर)।';
  }

  if (!/^[6-9]\d{9}$/.test(digitsOnlyPhone)) {
    errors.phone = 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।';
  }

  if (!input.serviceType.trim()) {
    errors.serviceType = 'कृपया सेवा का चयन करें।';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates a readable counter token ID like SC-2026-4821.
 */
export function generateTokenId(seedNumber?: number): string {
  const num =
    typeof seedNumber === 'number'
      ? Math.abs(Math.floor(seedNumber)) % 9000 + 1000
      : Math.floor(1000 + Math.random() * 9000);
  return `SC-2026-${num}`;
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
