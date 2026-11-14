// Unit tests for src/lib/bookingParser.ts (item 2: "Paste booking details").
// Run with:  npm run test:parser   (plain Node ≥ 22.6 — types are stripped natively)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseBookingText, normalisePhone, findDate, findTime } from '../src/lib/bookingParser.ts';

// Saturday 14 Nov 2026, noon — anchors "tomorrow" and year-less dates.
const NOW = new Date(2026, 10, 14, 12, 0, 0);
const parse = (text) => parseBookingText(text, NOW).fields;

test('1. labelled English WhatsApp message', () => {
    const f = parse(`Name: Ahmed Ali
Phone: 0501234567
Email: Ahmed.Ali@Example.com
Pickup: King Khalid International Airport, Terminal 5
Drop-off: Four Seasons Hotel, Riyadh
Date: 15/11
Time: 3pm
Passengers: 4
Luggage: 3
Vehicle: GMC Yukon
Price: 450 SAR`);
    assert.equal(f.customer_name, 'Ahmed Ali');
    assert.equal(f.customer_phone, '+966501234567');
    assert.equal(f.customer_email, 'ahmed.ali@example.com');
    assert.equal(f.pickup_location, 'King Khalid International Airport, Terminal 5');
    assert.equal(f.dropoff_location, 'Four Seasons Hotel, Riyadh');
    assert.equal(f.travel_date, '2026-11-15');
    assert.equal(f.travel_time, '15:00');
    assert.equal(f.passengers_count, 4);
    assert.equal(f.luggage_count, 3);
    assert.equal(f.car_type, 'GMC Yukon');
    assert.equal(f.quote_amount, 450);
    assert.equal(f.currency, 'SAR');
    assert.match(f.special_notes, /Luggage: 3 bag\(s\)/);
});

test('2. emoji labels and dashes', () => {
    const f = parse(`👤 Customer - Sara Khan
📞 Mobile - +973 3312 3456
📍 From - Riyadh
📍 To - Bahrain (Manama, Seef Mall)
🗓️ Date - 20 Dec
⏰ Time - 06:30
👥 Pax - 2`);
    assert.equal(f.customer_name, 'Sara Khan');
    assert.equal(f.customer_phone, '+97333123456');
    assert.equal(f.pickup_location, 'Riyadh');
    assert.equal(f.dropoff_location, 'Bahrain (Manama, Seef Mall)');
    assert.equal(f.travel_date, '2026-12-20');
    assert.equal(f.travel_time, '06:30');
    assert.equal(f.passengers_count, 2);
});

test('3. free text: from … to …, tomorrow, pm time', () => {
    const f = parse('Hi, this is Omar. Need a car from Jeddah Airport to Makkah Hilton tomorrow at 10:30 pm, 5 passengers and 4 bags. GMC please');
    assert.equal(f.customer_name, 'Omar');
    assert.equal(f.pickup_location, 'Jeddah Airport');
    assert.equal(f.dropoff_location, 'Makkah Hilton');
    assert.equal(f.travel_date, '2026-11-15');
    assert.equal(f.travel_time, '22:30');
    assert.equal(f.passengers_count, 5);
    assert.equal(f.luggage_count, 4);
});

test('4. Arabic message with Arabic digits', () => {
    const f = parse(`الاسم: محمد العتيبي
الجوال: ٠٥٥٩٨٧٦٥٤٣
من: الرياض
إلى: الدمام
التاريخ: ١٨/١١/٢٠٢٦
الوقت: ٩ صباحاً
عدد الركاب: ٣
السعر: ٨٠٠ ريال`);
    assert.equal(f.customer_name, 'محمد العتيبي');
    assert.equal(f.customer_phone, '+966559876543');
    assert.equal(f.pickup_location, 'الرياض');
    assert.equal(f.dropoff_location, 'الدمام');
    assert.equal(f.travel_date, '2026-11-18');
    assert.equal(f.travel_time, '09:00');
    assert.equal(f.passengers_count, 3);
    assert.equal(f.quote_amount, 800);
    assert.equal(f.currency, 'SAR');
});

test('5. mixed Arabic / English free text', () => {
    const f = parse('السلام عليكم، من الرياض إلى البحرين بكرة الساعة 4 مساء، 2 ركاب. My number 00966 50 765 4321');
    assert.equal(f.pickup_location, 'الرياض');
    assert.equal(f.dropoff_location, 'البحرين');
    assert.equal(f.travel_date, '2026-11-15');
    assert.equal(f.travel_time, '16:00');
    assert.equal(f.passengers_count, 2);
    assert.equal(f.customer_phone, '+966507654321');
});

test('6. arrow route, month-first date, currency before amount', () => {
    const f = parse(`Riyadh → Al Khobar
Nov 28, 7 am
SAR 1,250
Toyota Camry`);
    assert.equal(f.pickup_location, 'Riyadh');
    assert.equal(f.dropoff_location, 'Al Khobar');
    assert.equal(f.travel_date, '2026-11-28');
    assert.equal(f.travel_time, '07:00');
    assert.equal(f.quote_amount, 1250);
    assert.equal(f.currency, 'SAR');
    assert.equal(f.car_type, 'Toyota Camry');
});

test('7. Pakistani number, BHD price, flight number not read as a price', () => {
    const f = parse(`Name: Bilal Ahmed
WhatsApp: 0326 8869669
Flight: QR 1172
Pickup: Bahrain International Airport
Drop: Dammam
Date & time: 2/12/2026 14:45
Fare: 60 BHD`);
    assert.equal(f.customer_phone, '+923268869669');
    assert.equal(f.travel_date, '2026-12-02');
    assert.equal(f.travel_time, '14:45');
    assert.equal(f.quote_amount, 60);
    assert.equal(f.currency, 'BHD');
    assert.match(f.special_notes, /Flight: QR 1172/);
});

test('8. pickup line carrying the date and time', () => {
    const f = parse(`Pickup: Movenpick Hotel Riyadh at 5pm on 1 Dec
To: KAFD`);
    assert.equal(f.pickup_location, 'Movenpick Hotel Riyadh');
    assert.equal(f.dropoff_location, 'KAFD');
    assert.equal(f.travel_date, '2026-12-01');
    assert.equal(f.travel_time, '17:00');
});

test('9. year-less date already past rolls to next year', () => {
    const f = parse('Date: 10/01\nTime: 08:00');
    assert.equal(f.travel_date, '2027-01-10');
});

test('10. only fills what is there — a greeting alone yields nothing', () => {
    const r = parseBookingText('Hi, I want to book a car please', NOW);
    assert.deepEqual(r.fields, {});
});

test('11. 8-digit local number is kept as typed, with a warning', () => {
    const r = parseBookingText('Phone: 3312 3456\nFrom: Doha\nTo: Salwa border', NOW);
    assert.equal(r.fields.customer_phone, '33123456');
    assert.equal(r.warnings.length, 1);
    assert.equal(r.fields.pickup_location, 'Doha');
});

test('12. return trip and notes collected into special notes', () => {
    const f = parse(`From: Jeddah
To: Taif
Notes: child seat needed
Return trip same evening`);
    assert.match(f.special_notes, /child seat needed/);
    assert.match(f.special_notes, /Return trip requested/);
});

test('13. markdown bold labels and 12-hour edge cases', () => {
    const f = parse(`*Name:* Fatima
*Time:* 12am
*Date:* 3rd December 2026`);
    assert.equal(f.customer_name, 'Fatima');
    assert.equal(f.travel_time, '00:00');
    assert.equal(f.travel_date, '2026-12-03');
});

test('14. email found in free text, short "A to B" line', () => {
    const f = parse(`Makkah to Madinah
contact me on fatima.q@gmail.com
3 people, Hyundai Staria`);
    assert.equal(f.pickup_location, 'Makkah');
    assert.equal(f.dropoff_location, 'Madinah');
    assert.equal(f.customer_email, 'fatima.q@gmail.com');
    assert.equal(f.passengers_count, 3);
    assert.equal(f.car_type, 'Hyundai Staria');
});

test('helpers: phone, date and time normalisation', () => {
    assert.deepEqual(normalisePhone('+966 50 123 4567'), { phone: '+966501234567', certain: true });
    assert.deepEqual(normalisePhone('00971 50 123 4567'), { phone: '+971501234567', certain: true });
    assert.equal(normalisePhone('12345'), null);
    assert.equal(findDate('15 Nov', NOW), '2026-11-15');
    assert.equal(findDate('the day after tomorrow', NOW), '2026-11-16');
    assert.equal(findDate('31/02', NOW), null);
    assert.equal(findTime('3:15 PM'), '15:15');
    assert.equal(findTime('noon'), '12:00');
    assert.equal(findTime('25:00'), null);
});
