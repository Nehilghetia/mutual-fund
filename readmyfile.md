# 📊 Mutual Fund Explorer - Project Documentation

**Mutual Fund Explorer** is a premium, data-driven financial dashboard designed to empower investors with real-time insights, comprehensive fund analysis, and smart investment simulation tools. Built with a modern tech stack (Next.js 15, MUI, MongoDB), it provides a seamless experience for tracking wealth and making informed decisions.

---

## 🚀 Technical Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Styling**: [Material UI v7](https://mui.com/), [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Hooks & LocalStorage (for Watchlist)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) & [Recharts](https://recharts.org/)
- **Backend**: Next.js API Routes (Serverless)
- **Background Tasks**: [Node-cron](https://www.npmjs.com/package/node-cron) for automated NAV data synchronization.

---

## 🗺️ Page Breakdown

### 1. 🏠 Home Page (`/`)
- Professional Hero section with a clear value proposition.
- Feature highlights (Fund Data, SIP Calculator, Smart Insights, Security).
- Modern dark-themed UI with glassmorphic elements.

### 2. 🔍 Fund Explorer (`/funds`)
- **Real-time Search**: Instant filtering by scheme name.
- **Sorting**: Options to sort funds alphabetically (A-Z, Z-A).
- **Watchlist Integration**: Toggle star icons to save/remove funds from your personal list.
- **Pagination**: Efficiently browse through thousands of fund schemes.

### 3. 🧮 Investment Calculators (`/calculator`)
Comprehensive suite of financial tools with interactive charts:
- **SIP Calculator**: Monthly Systematic Investment Plan simulations.
- **SWP Calculator**: Systematic Withdrawal Plan simulations for regular income.
- **Step-Up SIP**: Account for annual increases in investment capacity.
- **Step-Up SWP**: Adjust withdrawals to match inflation or lifestyle changes.
- **Lumpsum**: Single-time investment growth projections.
- **Visuals**: Real-time Doughnut and Pie charts showing "Invested vs Returns".

### 4. 🏆 Rankings (`/ranking`)
- Curated list of top-performing funds across categories (Large Cap, Mid Cap, Small Cap, etc.).
- **Performance Insights**: Summary of 3-year returns for top schemes.
- **Animations**: Smooth "In-View" loading effects using `react-intersection-observer`.

### 5. ⭐️ Personal Watchlist (`/watchlist`)
- Dedicated space to track saved funds.
- Persistent storage using a custom `useWatchlist` hook.
- Quick access to detailed fund metrics.

### 6. 📄 Scheme Details (`/scheme/[code]`)
- Deep dive into specific mutual fund schemes.
- Historical NAV data and return analysis (where available).

### 7. 🔐 Authentication (`/login` & `/signup`)
- Secure user onboarding and session management (integrated with MongoDB).

---

## 📦 API & Backend

- **`/api/mf`**: Fetches the master list of mutual funds.
- **`/api/scheme`**: Retrieves detailed data for specific fund codes.
- **Models**: Structured Mongoose schemas for Users and Fund data.
- **Utilities**: Centralized helper functions for data formatting and API calls.

---

## 🛠️ Developer Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

*Built with ❤️ by Nehil Ghetia*
