## Try the app here
https://pointo-app.vercel.app/

# ⚡ Pointo – Smart Lithium Upgrade & Battery Management App

Pointo is a modern, mobile-first web application designed to facilitate the transition of Electric Vehicle (EV) drivers and fleet operators to high-efficiency lithium-ion batteries. The app provides a seamless interface for checking financing eligibility, scheduling professional battery installations, tracking real-time battery analytics (IoT), and earning rewards through a community-driven referral program.

---

## 📱 User Profiles & States

Pointo is built with a state-aware architecture that dynamically shapes the user experience based on the user's current lifecycle stage:

### 1. Guest Mode
*   **Upgrade Exploration:** Allows prospective customers to browse different premium lithium battery packs.
*   **Eligibility Engine:** A quick eligibility check tool that prompts users for vehicle, usage details, and financing preferences.
*   **Social Proof & Community Stories:** Highlights real success stories from over 2,400+ upgraded riders.

### 2. Logged-In Lead Mode
*   **Onboarding:** Guides users to complete their verification, upload required documents, and choose their desired battery specifications.
*   **Direct Access:** Quick links to check eligibility or inspect catalog details.

### 3. Approved Mode
*   **Financing Dashboard:** View details on EMI plans (e.g., starting at ₹499/month), chosen battery, and the assigned local dealer.
*   **Installation Scheduler:** Allows the user to schedule battery installation at their preferred date, time, and service dealer.
*   **Dealer Communications:** Direct CTA to contact the assigned dealer.

### 4. Installed Mode (Active Customer)
*   **Real-Time Dashboard (IoT):** Real-time monitoring of battery metrics including State of Charge (SOC), State of Health (SOH) (%), battery voltage, temperature, and remaining range estimate (in km).
*   **Financial & Payments Panel:** Monitor upcoming EMI cycles, track payment history, view invoices/receipts, and clear outstanding balances.
*   **Dues & Grace Period Recovery Handling:** Automatic user restriction flow if payments are defaulted, with grace period countdowns, penalty calculation, and support ticket coordination to reclaim recovered batteries.

---

## 🛠️ Tech Stack & Features

*   **Framework:** React 19 (TypeScript)
*   **Build Tool:** Vite 6
*   **Styling:** Tailwind CSS v4 & Lucide Icons
*   **Routing:** React Router v7
*   **State & Localization:** 
    *   `UserContext` for global application state handling (Guest, Lead, Approved, Installed states).
    *   `LanguageContext` for localized UI elements (multilingual support).

---

## 📂 Project Structure

```
pointo-app/
├── public/                 # Static assets
└── src/
    ├── components/         # Shared presentation components (BottomNav, Header, etc.)
    ├── context/            # Global React Contexts (User, Language/i18n)
    ├── data/               # Mock data & state payloads for testing
    ├── screens/            # Application views (Home, Explore, MyBattery, Support, etc.)
    ├── types/              # TypeScript type definitions
    ├── App.tsx             # Main routing layout and state switcher
    └── main.tsx            # Application entrypoint
```

---

## 🚀 Getting Started

To run the application locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd pointo-app
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build the application for production:
   ```bash
   npm run build
   ```

---

## 🌟 Key Application Screens

*   **Home Screen (`HomeScreen.tsx`):** Adapts dynamically to guest, logged-in, approved, or installed states.
*   **Explore Screen (`ExploreScreen.tsx`):** A marketplace for battery models, capacity details, and charger accessories.
*   **My Battery (`MyBatteryScreen.tsx`):** The core telemetry and battery health dashboard.
*   **Financing Flow (`FinancingFlow.tsx`):** Step-by-step credit assessment and financing application flow.
*   **Referral Dashboard (`ReferralDashboard.tsx`):** Track referral links, referred friends, pending payouts, and rewards.
*   **Service & Support (`Support.tsx` / `ServiceRequests.tsx`):** Interface for logging technical support issues, viewing installation status, or requesting a replacement.
