import { serviceSchema, breadcrumbSchema, faqSchema, jsonLd } from "@/lib/jsonld";
export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({ name: "Umrah Transport Package", description: "All-inclusive Umrah transport packages including airport pickup, Makkah–Madinah transfers, and daily Haram transfers. Book one package for your entire pilgrimage.", url: "/umrah-transport-package", areaServed: ["Makkah", "Madinah", "Jeddah"] }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Umrah Services", path: "/umrah-taxi-services" }, { name: "Umrah Transport Package", path: "/umrah-transport-package" }]),
        faqSchema([
            { question: "Can the package be customized?", answer: "Yes! We can tailor any package to fit your specific travel dates, group size and preferences. Contact us for a custom quote." },
            { question: "How many people does the package cover?", answer: "Our standard packages cover 1-4 passengers. For larger groups, we offer minivans and multiple vehicle options — please request a group quote." },
            { question: "What if my flight is delayed?", answer: "We monitor all arriving flights and adjust your pickup time accordingly at no extra charge." },
            { question: "Do you provide child seats?", answer: "Yes, child seats are available upon request. Please mention this when booking." },
            { question: "What payment methods do you accept?", answer: "We accept cash (local currency), bank transfer and major credit cards. Payment can be made upon arrival or in advance." },
        ]),
    ];
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />{children}</>;
}
