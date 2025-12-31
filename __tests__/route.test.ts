// __tests__/route.test.ts
import { POST } from '@/app/api/token/[id]/insight/route';
import { getAIInsight } from '@/lib/ai';
import axios from 'axios';

// 1. Mock External Dependencies
// We tell Jest: "Don't actually call CoinGecko or the AI"
jest.mock('axios');
jest.mock('@/lib/ai', () => ({
  getAIInsight: jest.fn(),
}));

describe('POST /api/token/[id]/insight', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- TEST CASE 1: SUCCESS ---
  it('should return 200 and combined data when successful', async () => {
    // A. Setup Mock Data (Fake CoinGecko Response)
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        market_data: {
          current_price: { usd: 50000 },
          market_cap: { usd: 1000000 },
          total_volume: { usd: 500000 },
          price_change_percentage_24h: 5.5
        }
      }
    });

    // B. Setup Mock AI Response
    (getAIInsight as jest.Mock).mockResolvedValue({
      reasoning: "Test reasoning",
      sentiment: "Bullish"
    });

    // C. Create a Fake Request
    // We simulate a request coming to your API
    const requestObj = new Request('http://localhost:3000/api/token/bitcoin/insight', {
        method: 'POST',
        body: JSON.stringify({ vs_currency: 'usd' })
    });

    // D. Call Your Function
    const response = await POST(requestObj, { params: { id: 'bitcoin' } });
    const json = await response.json();

    // E. Verify Results
    expect(response.status).toBe(200);
    expect(json.source).toBe('coingecko');
    expect(json.token.name).toBe('Bitcoin'); // Came from axios mock
    expect(json.insight.sentiment).toBe('Bullish'); // Came from AI mock
  });

  // --- TEST CASE 2: FAILURE ---
  it('should handle CoinGecko errors gracefully', async () => {
    // Simulate CoinGecko crashing
    (axios.get as jest.Mock).mockRejectedValue({
      response: { status: 404 }
    });

    const requestObj = new Request('http://localhost:3000/api/token/bad-id/insight', {
        method: 'POST'
    });

    const response = await POST(requestObj, { params: { id: 'bad-id' } });
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.error).toBeDefined();
  });
});