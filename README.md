# 窩算算 (WoCalc)

> 溫暖成家，理性規劃 🏠💙

專業的房貸試算與收支比分析工具，幫助您理性規劃購屋計畫。

## 專案簡介

窩算算 (WoCalc) 是一個現代化的房貸計算工具，採用 Neumorphism (新擬態) 設計風格，提供溫暖、專業的使用體驗。不同於傳統冷冰冰的銀行工具，我們致力於讓複雜的財務規劃變得親切易懂。

### 核心特色

- 🎯 **精準的收支比分析**：基於真實銀行審核標準
- 💼 **保證人/配偶擔保支援**：彈性的收入合併計算
- 📊 **即時視覺化回饋**：直觀的財務健康度顯示
- 💾 **自動儲存功能**：資料自動存於瀏覽器，重新整理不遺失
- 🎨 **溫暖的視覺設計**：Neumorphism + 晨霧藍配色
- 📱 **PWA 支援**：可安裝為獨立應用程式

## 技術架構

### 前端技術

- **React 19** - UI 框架
- **TypeScript** - 類型安全
- **Vite** - 快速建構工具
- **Tailwind CSS** - 樣式框架
- **Shadcn UI** - UI 元件庫
- **Framer Motion** - 動畫效果

### 設計理念

採用 **Neumorphism (新擬態)** 設計風格：
- 🌫️ **晨霧藍 (Morning Mist Blue)**：理性冷靜的基調
- 🏖️ **溫暖沙色 (Warm Sand)**：家的包容感
- 💫 **軟浮雕效果**：觸覺般的實體按鈕
- 🌊 **流體動畫**：柔和的過渡與呼吸感

### 字體系統

- **標題**：Noto Serif TC (宋體) - 人文與信賴感
- **內文/數據**：Nunito / Varela Round - 圓潤無襯線，減少金額壓力感

## 開發指南

### 環境需求

- Node.js >= 18 (建議使用 v23+)
- pnpm >= 9 (建議使用 v9.15+)

### 安裝與啟動

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 建構生產版本
pnpm build

# 預覽生產版本
pnpm preview
```

### 專案結構

```
WoCalc/
├── .github/
│   └── workflows/       # GitHub Actions CI/CD
│       └── deploy.yml   # 自動部署至 Cloudflare Pages
├── client/              # 前端應用程式
│   ├── public/          # 靜態資源
│   │   ├── logo.png
│   │   ├── pwa-*.png   # PWA 圖示
│   │   └── images/
│   └── src/
│       ├── components/  # React 元件
│       │   ├── ui/      # Shadcn UI 元件
│       │   ├── NeuCard.tsx
│       │   ├── NeuButton.tsx
│       │   └── NeuInput.tsx
│       ├── contexts/    # React Context
│       ├── hooks/       # Custom Hooks
│       ├── lib/         # 工具函式
│       │   └── mortgage-calculator.ts  # 核心計算邏輯
│       ├── pages/       # 頁面元件
│       │   └── Home.tsx
│       ├── App.tsx
│       └── main.tsx
├── docs/                # 專案文件
│   ├── CHANGELOG.md
│   ├── DEPLOYMENT.md
│   └── GITHUB_ACTIONS_SETUP.md
├── server/              # 後端服務 (Express)
│   └── index.ts
├── shared/              # 共享代碼
│   └── const.ts
├── wrangler.toml        # Cloudflare Pages 配置
└── vite.config.ts       # Vite 配置
```

## 計算邏輯

### 收支比定義

```
收支比 = (總月收入 / 總月支出) × 100%
```

- **總月收入**：借款人月收入 + 保證人月收入
- **總月支出**：本案房貸月付金 + 現有貸款月付金 + 基本生活費 + 保證人支出

### 核貸成數調整規則

| 收支比範圍 | 核貸成數調整 | 財務狀態 |
|-----------|------------|---------|
| ≥ 200% | 正常核貸 (首購8成/二戶5成) | 🟢 健康 |
| 180% ~ 200% | 成數減少 0.5 成 | 🟡 警告 |
| 160% ~ 180% | 成數減少 1 成 | 🟠 注意 |
| 140% ~ 160% | 首購降至6成 / 二戶降至3成 | 🔴 危險 |

### 關鍵參數

- **首購基礎成數**：80%
- **第二戶基礎成數**：50%
- **寬限期**：0-5年 (只繳息期間)
- **貸款年限**：20-40年

## 部署

### GitHub Actions 自動部署 (推薦)

本專案已設定 GitHub Actions 自動部署至 Cloudflare Pages：

- 推送至 `main` 分支時自動觸發生產環境部署
- Pull Request 時建立預覽環境
- 需要在 GitHub Secrets 設定：
  - `CLOUDFLARE_API_TOKEN`：Cloudflare API Token
  - `CLOUDFLARE_ACCOUNT_ID`：Cloudflare Account ID

詳細設定說明請參考 [`docs/GITHUB_ACTIONS_SETUP.md`](docs/GITHUB_ACTIONS_SETUP.md)

### 手動部署至 Cloudflare Pages

#### 首次部署

1. 登入 Cloudflare 並取得 API Token：
   ```bash
   pnpm wrangler login
   ```

2. 部署專案：
   ```bash
   pnpm deploy
   ```

#### 本地預覽 Cloudflare Pages

建構後在本地測試 Cloudflare Pages 環境：

```bash
pnpm build
pnpm cf:dev
```

### PWA 支援

本應用支援 PWA (Progressive Web App)，使用者可以：
- 在瀏覽器中點選「加入主畫面」
- 作為獨立應用程式使用
- 離線瀏覽基本功能

### 資料儲存

- 所有表單資料自動儲存於瀏覽器的 localStorage
- 重新整理或關閉瀏覽器後資料不會遺失
- 適合反覆試算不同金額組合的使用情境
- 資料僅存於本地，完全不會上傳至伺服器

## 授權

MIT License © 2024 WoCalc Team

---

**本工具試算結果僅供參考，實際核貸條件以銀行最終審核為準。**
