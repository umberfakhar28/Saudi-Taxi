import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import HotelPage from "@/components/HotelPage";
import { allHotels, getHotel } from "@/lib/hotelData";

// Dynamic, data-driven route — matches the pattern already used by
// /destinations/[slug]. Adding a future hotel only means adding an entry to
// allHotels; no new route file is needed.
export function generateStaticParams() {
  return allHotels.map((h) => ({ city: h.citySlug, hotel: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; hotel: string }> }) {
  const { city, hotel } = await params;
  const data = getHotel(hotel);
  if (!data || data.citySlug !== city) {
    return generatePageMetadata({ title: "Hotel Not Found", description: "This hotel transfer page could not be found.", path: `/hotels/${city}/${hotel}`, noindex: true });
  }

  return generatePageMetadata({
    title: `${data.hotelName} Taxi & Airport Transfer`,
    description: data.intro,
    path: `/hotels/${data.citySlug}/${data.slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ city: string; hotel: string }> }) {
  const { city, hotel } = await params;
  const data = getHotel(hotel);
  if (!data || data.citySlug !== city) notFound();

  return <HotelPage data={data} />;
}
