# 🪙 Token Insight API

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)
![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?style=flat-square&logo=jest)

A production-ready API that aggregates CoinGecko market data and provides AI-driven insights using Llama 3 (via Groq).

Built as a submission for the **Full Stack Engineer** role at DappLooker.

---

## 🚀 Features

* **🤖 AI Integration:** Uses Llama 3 (via Groq) to analyze price trends and sentiment.
* **🛡️ Type Safety:** End-to-end typing with TypeScript.
* **🐳 Containerized:** Fully Dockerized for instant setup.
* **✅ Unit Tests:** Comprehensive testing using **Jest** with API Mocking.

---

## 🤖 AI Setup Guide

This project uses **Groq** to access the Llama 3 model. It is free, fast, and compatible with the OpenAI SDK.

1.  **Get your Free API Key:**
    * Visit [console.groq.com/keys](https://console.groq.com/keys).
    * Login/Signup and click **"Create API Key"**.
    * Copy the key (starts with `gsk_`).

2.  **Configure the Project:**
    * Create a `.env` file in the root directory.
    * Paste your key as shown below:

    ```env
    # .env
    AI_API_KEY=gsk_your_actual_api_key_here
    AI_BASE_URL=[https://api.groq.com/openai/v1](https://api.groq.com/openai/v1)
    AI_MODEL=llama-3.3-70b-versatile
    ```

---

## ⚙️ Installation & Run

You can run this project using **Docker** (Recommended) or **Manually**.

### Option A: Docker (Fastest)
*No need to install Node.js. Requires Docker.*

1.  **Clone the repository:**
    ```bash
    git clone <repo-url>
    cd dapplooker-assignment
    ```

2.  **Configure Environment:**
    Ensure your `.env` file is created with your API keys (see AI Setup above).

3.  **Run the Container:**
    ```bash
    docker-compose up --build
    ```
    *The server will start at `http://localhost:3000`.*

---

### Option B: Manual Setup (Node.js)
*Requires Node.js v18 or higher.*

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    Ensure your `.env` file is created with your API keys (see AI Setup above).

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    *The server will start at `http://localhost:3000`.*
   ```

## Test Endpoint
   ```bash
   curl -X POST http://localhost:3000/api/token/bitcoin/insight \
     -H "Content-Type: application/json" \
     -d '{ "vs_currency": "usd" }'
   ```

## 🧪 Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Docker**
- **Groq AI**

---

## 🧪 Unit Testing

This project uses **Jest** and **node-mocks-http** for Unit Testing.

We implement **Mocking** for external dependencies (Axios and OpenAI). This ensures tests are:
1.  **Fast:** No network latency.
2.  **Free:** No consumption of API credits.
3.  **Reliable:** Tests pass even without an internet connection.

### How to Run Tests
Open your terminal in the project root and run:
```bash
npm test