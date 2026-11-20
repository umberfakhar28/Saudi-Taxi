import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { privateTaxi } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Car with Driver in Saudi Arabia | Hourly & Daily Hire",
    brandSuffix: false,
    description: "Rent a car with a driver in Saudi Arabia: a private car and driver by the hour, the day or per trip. Fuel included, no licence needed. Sedan to van, 24/7.",
    path: "/private-taxi",
    keywords: ["private taxi Saudi Arabia", "hire private driver Makkah", "private car hire", "private taxi Makkah"],
});

export default function PrivateTaxi() {
    return <CoreServicePage data={privateTaxi} />;
}
