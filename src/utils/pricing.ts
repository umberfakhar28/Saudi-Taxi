export interface PricingInput {
  vehicleType: string;
  distanceKm: number;
  travelDate?: string;
  travelTime?: string;
}

export interface PricingResult {
  baseFare: number;
  perKmCost: number;
  surchargeAmount: number;
  surchargeReasons: string[];
  total: number;
}

const FALLBACK_RATES: Record<string, { base: number; perKm: number }> = {
  'Sedan':   { base: 50,  perKm: 3.5 },
  'SUV':     { base: 80,  perKm: 5.0 },
  'Luxury':  { base: 150, perKm: 8.0 },
  'Van':     { base: 100, perKm: 4.5 },
  'Minibus': { base: 120, perKm: 5.5 },
};

export function calculateQuotePrice(input: PricingInput, rules: any[] = []): PricingResult {
  const { vehicleType, distanceKm, travelDate, travelTime } = input;
  const fallback = FALLBACK_RATES[vehicleType] ?? FALLBACK_RATES['Sedan'];

  // Get base fare from DB rules or fallback
  let baseFare = fallback.base;
  let perKmRate = fallback.perKm;
  const baseRule = rules.find(r => r.rule_type === 'base_fare' && r.is_active && r.conditions?.vehicle_type === vehicleType);
  if (baseRule) baseFare = baseRule.value;
  const kmRule = rules.find(r => r.rule_type === 'distance_slab' && r.is_active && r.conditions?.per_km && r.conditions?.vehicle_type === vehicleType);
  if (kmRule) perKmRate = kmRule.value;

  const perKmCost = Math.round(distanceKm * perKmRate * 100) / 100;
  const subTotal = baseFare + perKmCost;

  let surchargePct = 0;
  const surchargeReasons: string[] = [];

  rules.filter(r => r.is_active).forEach(rule => {
    if (rule.rule_type === 'weekend_surcharge' && travelDate) {
      const day = new Date(travelDate).getDay();
      if ((rule.conditions?.days ?? [5, 6]).includes(day)) {
        surchargePct += rule.value;
        surchargeReasons.push(`${rule.name} (+${rule.value}%)`);
      }
    }
    if (rule.rule_type === 'night_charge' && travelTime) {
      const h = parseInt(travelTime.split(':')[0] ?? '0');
      if (h >= (rule.conditions?.start_hour ?? 22) || h < (rule.conditions?.end_hour ?? 6)) {
        surchargePct += rule.value;
        surchargeReasons.push(`${rule.name} (+${rule.value}%)`);
      }
    }
    if (rule.rule_type === 'distance_slab' && !rule.conditions?.per_km) {
      const minKm = rule.conditions?.min_km;
      if (minKm && distanceKm >= minKm) {
        surchargePct += rule.value;
        surchargeReasons.push(`${rule.name} (${rule.value > 0 ? '+' : ''}${rule.value}%)`);
      }
    }
  });

  // Fallback rules when DB has none
  if (rules.length === 0 && travelDate) {
    const day = new Date(travelDate).getDay();
    if (day === 5 || day === 6) { surchargePct += 15; surchargeReasons.push('Weekend +15%'); }
    if (travelTime) {
      const h = parseInt(travelTime.split(':')[0] ?? '0');
      if (h >= 22 || h < 6) { surchargePct += 20; surchargeReasons.push('Night Charge +20%'); }
    }
    if (distanceKm >= 100) { surchargePct -= 10; surchargeReasons.push('Long Distance -10%'); }
  }

  const surchargeAmount = Math.round((subTotal * surchargePct) / 100 * 100) / 100;
  const total = Math.round(Math.max(subTotal + surchargeAmount, baseFare) * 100) / 100;

  return { baseFare, perKmCost, surchargeAmount, surchargeReasons, total };
}

export function formatSAR(amount: number) {
  return `SAR ${amount.toLocaleString('en-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
