import { BatteryProduct } from '../types';

export const batteryProducts: BatteryProduct[] = [
  {
    id: 'bp-spark',
    name: 'Pointo Spark',
    voltage: '51.2 V',
    capacity: '30Ah',
    range: '80–90 km',
    chargeTime: '3–4 hours',
    cycleLife: '2000+ cycles',
    weight: '12 kg',
    warranty: '3 Years Battery Warranty',
    price: 55000,
    emiPrice: 2500,
    tag: 'Best Seller',
    description: 'Practical lithium power for daily city rides.',
    chargerName: 'Charger Basic',
    chargerSpecs: [
      'Standard EV charger',
      'Charging time: 3–4 hours',
      'Compact & Portable'
    ],
    chargerWarranty: '1 Year',
  },
  {
    id: 'bp-ultra',
    name: 'Pointo Ultra',
    voltage: '51.2 V',
    capacity: '42Ah',
    range: '110–120 km',
    chargeTime: '2.5–3 hours',
    cycleLife: '2500+ cycles',
    weight: '15 kg',
    warranty: '4 Years Battery Warranty',
    price: 75000,
    emiPrice: 3200,
    tag: 'Most Popular',
    description: 'High-performance lithium upgrade with smart features.',
    chargerName: 'Charger Advance',
    chargerSpecs: [
      'Fast charging supported',
      'IP Rated weather protection',
      'Charging time: 2.5–3 hours',
      'Smart BMS connectivity'
    ],
    chargerWarranty: '3 Years',
  },
];
