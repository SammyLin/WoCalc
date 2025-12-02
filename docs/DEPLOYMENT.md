# WoCalc Deployment Guide

## 部署資訊

### Deployment Platform
- **平台**: Cloudflare Pages
- **專案名稱**: wocalc
- **Framework**: Vite + React
- **Build Command**: `pnpm build`
- **Output Directory**: `dist/public`
- **預設 URL**: https://wocalc.pages.dev

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
make deploy       # 部署到 Cloudflare Pages
make cf-dev       # 本地預覽 Cloudflare Pages 環境
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
# Analytics Configuration (Optional)
VITE_ANALYTICS_ENDPOINT=https://your-umami-instance.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Amplitude Analytics (Optional)
VITE_AMPLITUDE_API_KEY=your-amplitude-key
```

### Cloudflare Pages 環境變數

1. 前往 [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. 選擇你的專案
3. 進入 Settings → Environment Variables
4. 新增所需的環境變數

**注意**: 所有 Vite 環境變數必須以 `VITE_` 開頭

---

## Git Workflow

### 提交變更

```bash
git status
git add .
git commit -m "feat: your feature description"
git push origin main
```

### 提交訊息格式

遵循 Conventional Commits 格式：

- `feat:` 新功能
- `fix:` 修復 bug
- `docs:` 文件更新
- `style:` 程式碼格式調整
- `refactor:` 重構程式碼
- `test:` 測試相關
- `chore:` 雜項更新

---

## 部署流程

### 自動部署（推薦）

當推送到 `main` 分支時，GitHub Actions 會自動建置並部署到 Cloudflare Pages。

**設定步驟**：參考 [GitHub Actions Setup](./GITHUB_ACTIONS_SETUP.md)

### 手動部署

#### 方法 1: 使用 Makefile

```bash
make deploy
```

#### 方法 2: 使用 npm script

```bash
pnpm deploy
```

#### 方法 3: 使用 wrangler CLI

```bash
# 首次登入
pnpm wrangler login

# 建置專案
pnpm build

# 部署
pnpm wrangler pages deploy dist/public --project-name=wocalc
```

---

## 自訂網域設定

### 設定步驟

1. 前往 Cloudflare Pages Dashboard
2. 選擇專案
3. 點擊「Custom domains」
4. 添加你的網域（例如：`app.yourdomain.com`）
5. 設定 DNS CNAME 記錄：
   - Name: `app`（或你的子網域）
   - Target: `wocalc.pages.dev`
6. 等待 DNS 生效（5-10 分鐘）

### 驗證設定

```bash
# 檢查 DNS
dig your-domain.com CNAME +short
```

---

## Amplitude Analytics 整合

### 功能特性

本專案整合了 Amplitude Analytics，具備以下自動追蹤：

- ✅ 來源追蹤
- ✅ 檔案下載
- ✅ 表單互動
- ✅ 頁面瀏覽
- ✅ 使用者工作階段
- ✅ 元素互動

### 使用方式

```typescript
import { trackEvent, setUserProperties, trackPageView } from '@/lib/amplitude';

// 追蹤事件
trackEvent('Button Clicked', { buttonName: 'Calculate' });

// 設定使用者屬性
setUserProperties({ plan: 'premium' });

// 追蹤頁面
trackPageView('Home Page');
```

---

## 疑難排解

### 部署失敗

1. 檢查本地建置：`make build`
2. 確認 GitHub Secrets 設定正確
3. 查看 GitHub Actions 日誌
4. 檢查 Cloudflare Pages Dashboard

### 本地開發問題

```bash
# 清理並重新安裝
make clean
make install
make dev
```

### 環境變數未生效

- 環境變數名稱必須以 `VITE_` 開頭
- 環境變數在建置時注入（非運行時）
- 修改後需要重新建置

---

## 相關連結

- 📦 [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
- 📚 [GitHub Actions Setup](./GITHUB_ACTIONS_SETUP.md)
- 📖 [Cloudflare Pages 文件](https://developers.cloudflare.com/pages/)
- 📖 [Wrangler CLI 文件](https://developers.cloudflare.com/workers/wrangler/)

---

**最後更新**: 2025-12-02
**部署平台**: Cloudflare Pages
