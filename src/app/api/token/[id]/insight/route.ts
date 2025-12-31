import { NextResponse } from "next/server";
import axios from "axios";
import { getAIInsight } from "@/lib/ai";

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let body = { vs_currency: "usd", history_days: 30 };
    try {
      const json = await request.json();
      if (json) body = { ...body, ...json };
    } catch (e) {
    }

    const tokenId = params.id;
    const { vs_currency } = body;

    // Fetch CoinGecko
    const cgUrl = `https://api.coingecko.com/api/v3/coins/${tokenId}`;
    const cgRes = await axios.get(cgUrl, {
      params: { 
        localization: false, 
        tickers: false, 
        community_data: false, 
        developer_data: false, 
        sparkline: false 
      },
      timeout: 5000
    });

    const data = cgRes.data;

    // Format Data
    const marketData = {
      current_price_usd: data.market_data.current_price[vs_currency] || 0,
      market_cap_usd: data.market_data.market_cap[vs_currency] || 0,
      total_volume_usd: data.market_data.total_volume[vs_currency] || 0,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h || 0
    };

    const tokenObj = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      market_data: marketData
    };

    // Get AI Insight
    const insight = await getAIInsight(tokenObj);

    // Return Response
    return NextResponse.json({
      source: "coingecko",
      token: tokenObj,
      insight: insight,
      model: { 
        provider: "groq", 
        model: process.env.AI_MODEL || "llama-3.3-70b-versatile" 
      }
    });

  } catch (error: any) {
    const status = error.response?.status || 500;
    return NextResponse.json(
      { error: "Token not found or API error", details: error.message },
      { status }
    );
  }
}
