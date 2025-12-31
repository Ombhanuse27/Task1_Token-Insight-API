import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: process.env.AI_BASE_URL || "https://api.groq.com/openai/v1",
});

export const getAIInsight = async (tokenData: any) => {
  const prompt = `
    Analyze this crypto token data:
    Name: ${tokenData.name}
    Price: ${tokenData.market_data.current_price_usd}
    24h Change: ${tokenData.market_data.price_change_percentage_24h}%
    Volume: ${tokenData.market_data.total_volume_usd}

    Return strict JSON with fields:
    - "reasoning": A single sentence explanation of the price action.
    - "sentiment": "Bullish", "Bearish", or "Neutral".
  `;

  try {
    const completion = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a JSON-only API." },
        { role: "user", content: prompt }
      ],
      model: process.env.AI_MODEL || "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    return JSON.parse(completion.choices[0].message.content || "{}");
  } catch (error) {
    console.error("AI Error:", error);
    return { reasoning: "AI unavailable", sentiment: "Neutral" };
  }
};
