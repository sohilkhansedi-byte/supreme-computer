import test from 'node:test';
import assert from 'node:assert/strict';
import { GOV_PORTALS, VACANCIES } from '../data/catalog';
import {
  calculatePrintEstimate,
  calculateVacancyFee,
  filterActiveUpdates,
  filterPortals,
  formatINR,
  generateTokenId,
  validateTokenBooking,
} from './calculator';

test('calculatePrintEstimate applies standard rate below 50 pages and bulk rate at 50+ pages', () => {
  const standard = calculatePrintEstimate({
    bwPages: 20,
    colorPages: 2,
    a4Lamination: 1,
    idLamination: 1,
    spiralBinding: 0,
  });
  assert.equal(standard.bulkDiscountApplied, false);
  assert.equal(standard.bwRate, 2);
  assert.equal(standard.bwCost, 40);
  assert.equal(standard.total, 40 + 20 + 20 + 15);

  const bulk = calculatePrintEstimate({
    bwPages: 60,
    colorPages: 0,
    a4Lamination: 2,
    idLamination: 0,
    spiralBinding: 1,
  });
  assert.equal(bulk.bulkDiscountApplied, true);
  assert.equal(bulk.bwRate, 1.5);
  assert.equal(bulk.bwCost, 90);
  assert.equal(bulk.total, 90 + 40 + 40);
});

test('calculateVacancyFee computes category-specific official fee + service charge + optional print addon', () => {
  const mpPolice = VACANCIES[0];
  const genResult = calculateVacancyFee(mpPolice, 'GEN', false);
  assert.equal(genResult.officialFee, 500);
  assert.equal(genResult.portalServiceCharge, 60);
  assert.equal(genResult.total, 560);

  const scResult = calculateVacancyFee(mpPolice, 'SC_ST', true);
  assert.equal(scResult.officialFee, 250);
  assert.equal(scResult.printAddonCost, 20);
  assert.equal(scResult.total, 330);
});

test('filterPortals filters by Hindi category and search text accurately', () => {
  const examPortals = filterPortals(GOV_PORTALS, 'भर्ती एवं परीक्षा', '');
  assert.ok(examPortals.length >= 2);
  assert.ok(examPortals.every((p) => p.category === 'भर्ती एवं परीक्षा'));

  const mpesbOnly = filterPortals(GOV_PORTALS, 'भर्ती एवं परीक्षा', 'MPESB');
  assert.equal(mpesbOnly.length, 1);
  assert.equal(mpesbOnly[0].id, 'mpesb');

  const noMatch = filterPortals(GOV_PORTALS, 'सभी', 'nonexistent-portal-xyz');
  assert.equal(noMatch.length, 0);
});

test('validateTokenBooking rejects invalid phone/name and accepts valid booking', () => {
  const invalid = validateTokenBooking({
    customerName: 'A',
    phone: '12345',
    serviceType: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.customerName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.serviceType);

  const valid = validateTokenBooking({
    customerName: 'राहुल वर्मा',
    phone: '9893574866',
    serviceType: 'फोटोकॉपी एवं लैमिनेशन',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('generateTokenId and formatINR format deterministically', () => {
  assert.equal(generateTokenId(4821), 'SC-2026-5821');
  assert.equal(formatINR(1250), '₹1,250');
  assert.equal(formatINR(90.5), '₹90.50');
});

test('filterActiveUpdates hides expired items and filters by admit cards', () => {
  const activeOnDec1 = filterActiveUpdates(VACANCIES, '2026-12-01', 'सभी');
  // Patwari expires 2026-11-28 so it must be hidden on 2026-12-01
  assert.equal(
    activeOnDec1.some((v) => v.id === 'mp-patwari-group2'),
    false
  );
  const admitCards = filterActiveUpdates(VACANCIES, '2026-11-19', 'एडमिट कार्ड');
  assert.ok(admitCards.length >= 2);
  assert.ok(admitCards.every((v) => v.updateType === 'एडमिट कार्ड'));
});
