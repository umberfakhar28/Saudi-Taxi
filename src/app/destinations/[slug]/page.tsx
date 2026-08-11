import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import DestinationPage from "@/components/DestinationPage";
import { DESTINATION_DETAILS, getDestinationDetail } from "@/lib/destinationData";

export function generateStaticParams() {
  return Object.keys(DESTINATION_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getDestinationDetail(slug);
  if (!data) return generatePageMetadata({ title: "Destination Not Found", description: "This destination page could not be found.", path: `/destinations/${slug}`, noindex: true });

  return generatePageMetadata({
    title: data.seoTitle,
    description: data.metaDescription,
    path: `/destinations/${data.slug}`,
    ogImage: data.imagePending ? undefined : data.heroImage,
    ogImageAlt: data.heroImageAlt,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getDestinationDetail(slug);
  if (!data) notFound();

  return <DestinationPage data={data} />;
}
