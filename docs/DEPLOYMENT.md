# WoCalc Deployment Guide

## 部署資訊

### Production URL
🌐 **https://wocalc-wuzs2fxlr-sammys-projects-34ff7f13.vercel.app**

### Deployment Platform
- **平台**: Vercel
- **專案名稱**: wocalc
- **Framework**: Vite + React
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`

---

## Makefile 指令

我們使用 Makefile 來管理專案的常用指令。使用 `make help` 可以查看所有可用指令。

### 開發指令

```bash
make install      # 安裝專案依賴
make dev          # 啟動開發伺服器
make build        # 建置生產版本
make preview      # 預覽生產版本
```

### 程式碼品質

```bash
make test         # 執行測試
make lint         # 執行 linter
make format       # 格式化程式碼
```

### 部署指令

```bash
make deploy       # 部署到 Vercel（預覽環境）
make deploy-prod  # 部署到 Vercel（正式環境）
make status       # 檢查部署狀態
make logs         # 查看部署日誌
```

### 維護指令

```bash
make clean        # 清理建置檔案
```

---

## 環境變數設定

### 本地開發

在專案根目錄建立 `.env` 檔案：

```bash
# Analytics Configuration
VITE_ANALYTICS_ENDPOINT=https://your-umami-instance.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id-here

# Amplitude Analytics
VITE_AMPLITUDE_API_KEY=your-amplitude-api-key-here
```

### Vercel 環境變數

在 Vercel Dashboard 中設定以下環境變數：

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇 wocalc 專案
3. 進入 Settings → Environment Variables
4. 新增以下變數：

| 變數名稱 | 說明 | 環境 |
|---------|------|------|
| `VITE_AMPLITUDE_API_KEY` | Amplitude API Key | Production, Preview |
| `VITE_ANALYTICS_ENDPOINT` | Umami Analytics Endpoint | Production, Preview |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami Website ID | Production, Preview |

---

## Git Workflow

### 提交變更

```bash
# 檢查狀態
git status

# 新增檔案
git add .

# 提交變更
git commit -m "feat: your feature description"

# 推送到遠端
git push origin main
```

### 提交訊息格式

我們遵循 Conventional Commits 格式：

- `feat:` 新功能
- `fix:` 修復 bug
- `docs:` 文件更新
- `style:` 程式碼格式調整
- `refactor:` 重構程式碼
- `test:` 測試相關
- `chore:` 雜項更新

---

## 部署流程

### 自動部署

當推送到 `main` 分支時，Vercel 會自動建置並部署到正式環境。

### 手動部署

使用 Makefile 指令：

```bash
# 部署到預覽環境
make deploy

# 部署到正式環境
make deploy-prod
```

或直接使用 Vercel CLI：

```bash
# 預覽部署
vercel

# 正式部署
vercel --prod
```

---

## Amplitude Analytics 設定

### 功能特性

我們整合了 Amplitude Analytics，具備以下自動追蹤功能：

- ✅ Attribution tracking（來源追蹤）
- ✅ File downloads（檔案下載）
- ✅ Form interactions（表單互動）
- ✅ Page views（頁面瀏覽）
- ✅ Sessions（使用者工作階段）
- ✅ Element interactions（元素互動）

### 使用方式

```typescript
import { trackEvent, setUserProperties, trackPageView } from '@/lib/amplitude';

// 追蹤自訂事件
trackEvent('Button Clicked', { buttonName: 'Calculate' });

// 設定使用者屬性
setUserProperties({ plan: 'premium' });

// 追蹤頁面瀏覽
trackPageView('Home Page');
```

---

## 疑難排解

### 部署失敗

如果部署失敗，檢查：

1. 建置是否成功：`make build`
2. 環境變數是否正確設定
3. 檢查 Vercel 部署日誌：`make logs`

### 本地開發問題

```bash
# 清理快取和重新安裝
make clean
make install

# 重啟開發伺服器
make dev
```

---

## 相關連結

- 📦 [Vercel Dashboard](https://vercel.com/dashboard)
- 📊 [Amplitude Dashboard](https://analytics.amplitude.com/)
- 📚 [專案 GitHub Repository](#)（待補充）
- 🎨 [Figma 設計稿](#)（待補充）

---

**最後更新**: 2025-12-02
