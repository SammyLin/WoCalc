# Logo 更新記錄

## 更新日期
2025-12-02

## 原始檔案
- **來源**: `Gemini_Generated_Image_eh54keh54keh54ke.png`
- **尺寸**: 2048x2080 px
- **設計元素**:
  - 🌈 溫暖彩虹（象徵希望與溫暖）
  - 🏠 房屋圖示（購屋主題）
  - 💰 金錢符號（財務計算）
  - 窩算算 WoCalc 品牌文字

## 處理流程

### 1. 裁切處理
- 使用 ImageMagick 進行中心裁切
- 將 2048x2080 裁切為正方形 2048x2048

### 2. 生成檔案

| 檔案名稱 | 尺寸 | 用途 | 檔案大小 |
|---------|------|------|---------|
| `logo.png` | 512x512 | 網頁主要 Logo | 281KB |
| `pwa-192x192.png` | 192x192 | PWA 小圖示 | 48KB |
| `pwa-512x512.png` | 512x512 | PWA 大圖示 | 281KB |
| `apple-touch-icon.png` | 180x180 | Apple 裝置圖示 | 43KB |
| `favicon.ico` | 32x32 | 瀏覽器標籤頁圖示 | 4.2KB |
| `favicon-32x32.png` | 32x32 | 備用 Favicon | 3.0KB |

### 3. HTML 更新
在 `client/index.html` 中新增：
```html
<!-- Favicons -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

<!-- PWA -->
<meta name="theme-color" content="#5F9EA0" />
```

### 4. PWA Manifest
PWA 圖示配置已在 `vite.config.ts` 中設定：
- 使用 `pwa-192x192.png` 和 `pwa-512x512.png`
- 主題色：`#5F9EA0` (Cadet Blue)

## 使用位置

### 網頁顯示
- Header 區域：`/logo.png`（透過 `<img src="/logo.png" alt="窩算算" />`）

### 瀏覽器
- 標籤頁圖示：`/favicon.ico`
- 高解析度：`/favicon-32x32.png`

### 行動裝置
- iOS Safari 新增至主畫面：`/apple-touch-icon.png`
- Android Chrome PWA：`/pwa-192x192.png` 和 `/pwa-512x512.png`

## 設計特色

這個 logo 完美體現「窩算算 WoCalc」的品牌核心價值：

1. **彩虹元素**：
   - 象徵希望與夢想
   - 柔和的配色（藍、沙、黃、粉、綠）
   - 呼應品牌「溫暖成家」的理念

2. **房屋圖示**：
   - 清晰表達購屋主題
   - 藍色調呼應品牌主色 Cadet Blue
   - 立體感設計增加質感

3. **金錢符號**：
   - 橙色 $ 符號突出財務主題
   - 與房屋結合表達「房貸試算」
   - 清晰易識別

4. **中英文雙語**：
   - 窩算算（親切溫暖）
   - WoCalc（國際化、專業）
   - 黑色文字確保可讀性

## 清理說明

處理完成後可刪除以下檔案：
- `Gemini_Generated_Image_eh54keh54keh54ke.png`（原始檔案）
- `process_logo.sh`（處理腳本）
- `process_logo.py`（未使用的 Python 腳本）

建議保留原始檔案作為備份。

## 驗證清單

- [x] Logo 正確裁切為正方形
- [x] 生成所有需要的尺寸
- [x] HTML 中新增 favicon 連結
- [x] PWA manifest 配置正確
- [x] 主題色設定 (#5F9EA0)
- [x] 檔案大小合理（最大 281KB）
- [x] 圖片清晰無失真

## 下次更新

如需更新 logo，請：
1. 替換原始高解析度圖檔
2. 執行 `./process_logo.sh`
3. 檢查生成的所有尺寸
4. 測試在各裝置上的顯示效果
