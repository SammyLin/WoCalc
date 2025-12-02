# GitHub Actions CI/CD 設定指南

本專案已配置 GitHub Actions 自動部署到 Vercel。

## 設定步驟

### 1. 取得 Vercel Token

1. 前往 [Vercel Token 設定頁面](https://vercel.com/account/tokens)
2. 點擊 "Create Token"
3. 輸入 token 名稱（例如：`github-actions`）
4. 選擇 scope（建議選擇特定專案）
5. 複製產生的 token

### 2. 取得 Vercel 專案資訊

在專案根目錄執行以下指令：

```bash
# 安裝 Vercel CLI（如果還沒安裝）
pnpm add -g vercel

# 登入 Vercel
vercel login

# 連結專案
vercel link
```

執行 `vercel link` 後，會在 `.vercel` 目錄產生 `project.json` 檔案，包含：
- `projectId`: 你的專案 ID
- `orgId`: 你的組織 ID

### 3. 在 GitHub 設定 Secrets

前往你的 GitHub 儲存庫設定：`Settings` → `Secrets and variables` → `Actions`

新增以下 secrets：

#### 必要的 Secrets：
- `VERCEL_TOKEN`: 步驟 1 中取得的 token
- `VERCEL_ORG_ID`: 從 `.vercel/project.json` 中的 `orgId`
- `VERCEL_PROJECT_ID`: 從 `.vercel/project.json` 中的 `projectId`

#### 選用的環境變數（如果需要）：
- `VITE_ANALYTICS_ENDPOINT`: 分析服務端點
- `VITE_ANALYTICS_WEBSITE_ID`: 網站 ID
- `VITE_AMPLITUDE_API_KEY`: Amplitude API Key

### 4. 觸發部署

設定完成後，以下操作會自動觸發部署：

- 推送程式碼到 `main` 或 `master` 分支
- 建立針對 `main` 或 `master` 分支的 Pull Request

## Workflow 說明

`.github/workflows/deploy.yml` 檔案包含以下步驟：

1. **Checkout code**: 檢出程式碼
2. **Setup pnpm**: 安裝 pnpm 套件管理器
3. **Setup Node.js**: 設定 Node.js 環境
4. **Install Vercel CLI**: 安裝 Vercel CLI
5. **Pull Vercel Environment**: 拉取 Vercel 環境設定
6. **Build Project**: 建置專案
7. **Deploy to Vercel**: 部署到 Vercel

## 查看部署狀態

- 在 GitHub 儲存庫的 `Actions` 標籤頁查看 workflow 執行狀態
- 在 Vercel 控制台查看部署詳情

## 故障排除

### 部署失敗

1. 檢查 GitHub Secrets 是否正確設定
2. 確認 Vercel token 有效且有足夠權限
3. 查看 Actions 日誌取得詳細錯誤資訊

### 環境變數問題

如果建置時需要環境變數，確保在 GitHub Secrets 中新增，並在 workflow 的 `Build Project Artifacts` 步驟中的 `env` 部分引用。

## 本地測試

在推送到 GitHub 之前，可以本地測試建置：

```bash
# 安裝相依套件
pnpm install

# 建置專案
pnpm build

# 預覽建置結果
pnpm preview
```
