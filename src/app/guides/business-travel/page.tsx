import { generatePageMetadata } from "@/lib/seo";
import GuidePage from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Business Travel Guide in Saudi Arabia | Executive Transport | Gulf Trip Service",
  description: "Guide for business travelers in Saudi Arabia — Riyadh, Jeddah, Dammam corporate transport, KAFD, Aramco, and Vision 2030 project logistics.",
  path: "/guides/business-travel",
  keywords: ["business travel Saudi Arabia", "corporate taxi Riyadh", "executive transfer Saudi Arabia", "KAFD corporate transport"],
});

const data = {
  title: "Business Travel Guide in Saudi Arabia",
  subtitle: "Everything corporate travelers need to know about getting around Saudi Arabia efficiently — from Riyadh KAFD to Aramco HQ in Dhahran.",
  eyebrow: "Business Travel Guide",
  sections: [
    { heading: "Saudi Arabia's Business Travel Landscape", content: "Saudi Arabia is one of the world's fastest-growing business destinations, driven by Vision 2030 mega-investments. Riyadh's KAFD, Jeddah's commercial waterfront, the Eastern Province oil sector, and NEOM attract tens of thousands of international executives annually." },
    { heading: "Riyadh for Business Travelers", content: "Most corporate activity sits in the Olaya district, KAFD, and the diplomatic quarter. King Khalid International Airport (RUH) is 35km from downtown. Traffic peaks 7–9am and 4–7pm. Pre-booking airport transfers that depart outside these windows saves 30–45 minutes per journey." },
    { heading: "Eastern Province: Dammam, Khobar & Jubail", content: "The Eastern Province hosts Saudi Aramco, SABIC, and hundreds of energy contractors. The tri-city Dammam–Khobar–Dhahran area is car-dependent. We offer monthly corporate accounts for Eastern Province businesses with dedicated vehicles for executive airport runs and inter-office transfers." },
    { heading: "Corporate Account Features", content: "Gulf Trip Service offers monthly invoiced billing, a dedicated account manager, 24/7 priority booking line, named driver assignment for repeat executives, and executive vehicle guarantee (Mercedes E-Class or equivalent). Contact our business team to set up your account." },
    { heading: "Business Travel Tips for Saudi Arabia", content: "Always pre-book airport transfers. Prayer times affect traffic — Friday noon prayers (12:30–2pm) create a brief lull. Ramadan shifts working hours significantly with most meetings after Iftar. During peak Hajj/Umrah months, Jeddah airport and roads to Makkah experience significant congestion." },
  ],
  faqs: [
    { q: "Do you offer monthly corporate accounts?", a: "Yes — invoiced monthly accounts for businesses with recurring transport needs. Contact our corporate team for a custom quote." },
    { q: "Can you provide the same driver for a multi-day visit?", a: "Yes — named driver assignment is available for premium bookings across multi-day executive itineraries." },
    { q: "Do you have executive-grade vehicles?", a: "Yes — Mercedes E-Class, BMW 5 Series, and Lexus ES are available for client-facing transfers." },
    { q: "How do I arrange transfers for a team of 10+ executives?", a: "Contact our operations team with flight details and group size. We coordinate multi-vehicle arrivals." },
  ],
  ctaText: "Set Up a Corporate Account",
  ctaLink: "/contact-us",
};

export default function BusinessTravelGuide() {
  return <GuidePage data={data} />;
}
