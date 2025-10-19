import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { LinkMetadata } from "@/lib/type";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Fetch HTML
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 10000, // 10 seconds timeout
    });

    const $ = cheerio.load(response.data);

    // Extract metadata
    const metadata: LinkMetadata = {
      title:
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("title").text() ||
        "No title",

      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "",

      image:
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content") ||
        "",

      favicon:
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        "/favicon.ico",
    };

    // Fix relative URLs
    const urlObj = new URL(url);

    if (metadata.favicon && !metadata.favicon.startsWith("http")) {
      metadata.favicon = metadata.favicon.startsWith("/")
        ? urlObj.origin + metadata.favicon
        : urlObj.origin + "/" + metadata.favicon;
    }

    if (metadata.image && !metadata.image.startsWith("http")) {
      metadata.image = metadata.image.startsWith("/")
        ? urlObj.origin + metadata.image
        : urlObj.origin + "/" + metadata.image;
    }

    return NextResponse.json(metadata);
  } catch (error: any) {
    console.error("Scrape error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch website metadata" },
      { status: 500 }
    );
  }
}
