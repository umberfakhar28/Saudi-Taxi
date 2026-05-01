import { NextResponse } from "next/server";

const INDEXNOW_KEY = "995aadf700384f5c8ef4ad71bc79ab65";
const HOST = "gulftripservice.com";
const BASE_URL = `https://${HOST}`;

// All public URLs to submit to Bing IndexNow
const ALL_URLS = [
  BASE_URL,
  `${BASE_URL}/about-us`,
  `${BASE_URL}/contact-us`,
  `${BASE_URL}/our-services`,
  `${BASE_URL}/fleet`,
  `${BASE_URL}/faqs`,
  `${BASE_URL}/testimonials`,
  `${BASE_URL}/our-gallery`,
  `${BASE_URL}/privacy-policy`,
  `${BASE_URL}/book-online`,
  `${BASE_URL}/quote`,
  // Airport transfers
  `${BASE_URL}/airport-transfers`,
  `${BASE_URL}/jeddah-airport-taxi-service`,
  `${BASE_URL}/riyadh-airport-taxi-service`,
  `${BASE_URL}/madina-airport-taxi-service`,
  `${BASE_URL}/abha-airport-taxi-service`,
  `${BASE_URL}/dammam-airport-taxi-service`,
  `${BASE_URL}/taif-airport-taxi-service`,
  `${BASE_URL}/airport-transfer-for-umrah`,
  // Services
  `${BASE_URL}/umrah-taxi-services`,
  `${BASE_URL}/umrah-transport-package`,
  `${BASE_URL}/hotel-transfers`,
  `${BASE_URL}/private-taxi`,
  `${BASE_URL}/corporate-transportation-services`,
  `${BASE_URL}/wedding-transportation`,
  `${BASE_URL}/school-buses-services`,
  `${BASE_URL}/educational-tours-transport`,
  // Border crossings
  `${BASE_URL}/border-crossing`,
  `${BASE_URL}/saudi-arabia-to-bahrain-taxi-service`,
  `${BASE_URL}/saudi-arabia-to-qatar-taxi-service`,
  `${BASE_URL}/saudi-arabia-to-uae-taxi-service`,
  `${BASE_URL}/saudi-arabia-to-jordan-land-transfer`,
  // City tours
  `${BASE_URL}/jeddah-city-tour-services-in-saudi-arabia`,
  `${BASE_URL}/jeddah-to-makkah-taxi-service`,
  `${BASE_URL}/makkah-to-madinah-taxi-service`,
  `${BASE_URL}/taif-ziyarat-taxi-service`,
  `${BASE_URL}/ziyarat-services-in-saudi-arabia`,
  `${BASE_URL}/reliable-alula-tour-taxi-service-in-saudi-arabia`,
];

export async function POST() {
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: ALL_URLS,
      }),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${ALL_URLS.length} URLs to Bing IndexNow`,
        urlCount: ALL_URLS.length,
        status: response.status,
      });
    }

    const errorText = await response.text();
    return NextResponse.json(
      {
        success: false,
        message: "IndexNow submission failed",
        status: response.status,
        error: errorText,
      },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to reach IndexNow API",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// GET to check current status
export async function GET() {
  return NextResponse.json({
    message: "IndexNow submission endpoint",
    urlCount: ALL_URLS.length,
    host: HOST,
    usage: "Send a POST request to this endpoint to submit all URLs to Bing IndexNow",
  });
}
