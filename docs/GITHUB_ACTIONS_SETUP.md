# GitHub Actions CI/CD 設定指南

本專案已配置 GitHub Actions 自動部署到 Cloudflare Pages。

## 設定步驟

### 1. 取得 Cloudflare API Token

1. 前往 [Cloudflare API Tokens 頁面](https://dash.cloudflare.com/profile/api-tokens)
2. 點擊「Create Token」
3. 選擇「Edit Cloudflare Workers」模板，或自訂權限：
   - **Permissions**:
     - Account > Cloudflare Pages > Edit
   - **Account Resources**:
     - Include > Your Account
4. 點擊「Continue to summary」
5. 點擊「Create Token」
6. **複製並妥善保存這個 Token**（只會顯示一次）

### 2. 取得 Cloudflare Account ID

1. 前往 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇任一網站或在首頁
3. 右側可以看到「Account ID」，複製它

或者，使用 wrangler CLI：

```bash
pnpm wrangler whoami
```

### 3. 在 GitHub 設定 Secrets

前往你的 GitHub 儲存庫設定：`Settings` → `Secrets and variables` → `Actions`

新增以下 secrets：

#### 必要的 Secrets：

| Secret 名稱 | 說明 | 如何取得 |
|------------|------|---------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token | 步驟 1 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID | 步驟 2 |

#### 選用的環境變數（如果需要分析工具）：

| Secret 名稱 | 說明 |
|------------|------|
| `VITE_ANALYTICS_ENDPOINT` | 分析服務端點 |
| `VITE_ANALYTICS_WEBSITE_ID` | 網站 ID |
| `VITE_AMPLITUDE_API_KEY` | Amplitude API Key |

### 4. 建立 Cloudflare Pages 專案（首次部署）

#### 方法 1: 使用 wrangler CLI（推薦）

```bash
pnpm wrangler login
pnpm wrangler pages project create wocalc --production-branch=main
```

#### 方法 2: 透過 Dashboard

1. 前往 [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. 點擊「Create a project」
3. 選擇「Upload assets」或「Connect to Git」
4. 專案名稱輸入：`wocalc`

### 5. 觸發部署

設定完成後，以下操作會自動觸發部署：

- 推送程式碼到 `main` 或 `master` 分支（生產環境）
- 建立針對 `main` 或 `master` 分支的 Pull Request（預覽環境）

## Workflow 說明

`.github/workflows/deploy.yml` 檔案包含以下步驟：

1. **Checkout code**: 檢出程式碼
2. **Setup pnpm**: 安裝 pnpm 套件管理器
3. **Setup Node.js**: 設定 Node.js 環境（使用 pnpm cache）
4. **Install dependencies**: 安裝專案依賴
5. **Build project**: 建置專案（注入環境變數）
6. **Deploy to Cloudflare Pages**: 使用 `cloudflare/pages-action` 部署

## 查看部署狀態

- **GitHub Actions**: 在儲存庫的 `Actions` 標籤頁查看 workflow 執行狀態
- **Cloudflare Dashboard**: 在 [Cloudflare Pages](https://dash.cloudflare.com/pages) 查看部署詳情
- **部署 URL**: 每次部署會自動產生預覽 URL，顯示在 GitHub Actions 日誌中

## 故障排除

### 部署失敗：API Token 權限不足

**錯誤訊息**：`Authentication error` 或 `Insufficient permissions`

**解決方案**：
1. 確認 API Token 有「Cloudflare Pages - Edit」權限
2. 檢查 Token 是否已過期
3. 重新建立 Token 並更新 GitHub Secret

### 部署失敗：找不到專案

**錯誤訊息**：`Project not found`

**解決方案**：
1. 確認專案名稱在 workflow 中設定正確（`wocalc`）
2. 使用 wrangler 建立專案：
   ```bash
   pnpm wrangler pages project create wocalc --production-branch=main
   ```

### 部署失敗：建置錯誤

**錯誤訊息**：建置過程中出現錯誤

**解決方案**：
1. 本地測試建置：`pnpm build`
2. 檢查環境變數是否正確設定
3. 查看 GitHub Actions 日誌獲取詳細錯誤訊息

### 環境變數未生效

**問題**：部署成功但功能異常

**解決方案**：
1. 確認環境變數在 GitHub Secrets 中正確設定
2. 環境變數名稱必須以 `VITE_` 開頭
3. 檢查 workflow 中的 `env` 部分是否引用正確
4. 環境變數在建置時注入，修改後需要重新觸發部署

## 本地測試

在推送到 GitHub 之前，建議本地測試：

```bash
# 安裝依賴
pnpm install

# 建置專案
pnpm build

# 本地預覽 Cloudflare Pages 環境
pnpm cf:dev
```

## 進階設定

### 自訂建置指令

修改 `.github/workflows/deploy.yml` 中的建置步驟：

```yaml
- name: Build project
  run: pnpm build
  env:
    NODE_ENV: production
    YOUR_CUSTOM_VAR: ${{ secrets.YOUR_CUSTOM_VAR }}
```

### 分支部署策略

- `main` 分支：自動部署到生產環境
- Pull Request：自動建立預覽環境
- 其他分支：不自動部署（可手動觸發）

### 快取優化

Workflow 已啟用 pnpm cache，加快安裝速度：

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'pnpm'
```

## 相關連結

- 📦 [Cloudflare Pages 文件](https://developers.cloudflare.com/pages/)
- 🔧 [Cloudflare Pages GitHub Action](https://github.com/cloudflare/pages-action)
- 📚 [GitHub Actions 文件](https://docs.github.com/actions)
- 🛠️ [Wrangler CLI 文件](https://developers.cloudflare.com/workers/wrangler/)

---

**最後更新**: 2025-12-02
