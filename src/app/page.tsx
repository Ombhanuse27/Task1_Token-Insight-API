export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>🚀 Token Insight API is Running</h1>
      <p>Send a POST request to:</p>
      <pre style={{ background: "#eee", padding: "10px", borderRadius: "5px" }}>
        POST /api/token/[id]/insight
      </pre>
    </div>
  );
}
