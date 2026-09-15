# 微觀小偵探 / Microscopic Detective

**v0.1**（npm 套件版本 `0.1.0`）— 適合 7–12 歲兒童及親子科普活動的靜態教育遊戲。

React + TypeScript + Vite + 原生 CSS。沒有後端、帳號、個資表單、分析追蹤或外部字型。所有遊戲圖片都在專案內，第一版為原創 SVG 教學示意圖，並非真實顯微照片。

## 執行

需要 Node.js 22.12+（本專案已使用 Node.js 22.17 測試）與 npm。

```powershell
cd 'C:\Codex_Projects\2026_兒童科普日'
npm ci
npm run dev
```

開啟終端顯示的網址，通常是 `http://127.0.0.1:5173/`。停止伺服器按 `Ctrl+C`。

```powershell
npm test          # 題庫、答案、進度、重設與存檔檢查
npm run build    # TypeScript 檢查及正式建置
npm run preview  # 預覽 dist/ 正式版本
```

部署時上傳 `dist/` 內容到靜態網站主機。網站沒有後端路由；Vite 使用相對 base，可放在子目錄。請由 HTTP(S) 網站伺服器開啟，勿直接雙擊 `dist/index.html`。第一次載入需要可連線的靜態伺服器；這版沒有 service worker 或離線安裝功能。網站程式不要求登入，託管平台的分享／登入政策由平台另行控制。

## 遊戲流程

1. 任務入口：繁中預設，固定中文 / English 切換。
2. 肉眼：從 5 張生物卡片中選出可見整體外形的葉片、成果蠅與成體斑馬魚。
3. 光學：從 3 張有觀察方法線索的圖卡，找到一般明視野洋蔥細胞。
4. 螢光：點選「細胞 → 標記 → 適合的光 → 發光」四步驟，破解天然顏色的迷思。
5. 電子：比較整體、細胞與粒線體內部；強調分辨細節不只取決於倍率。
6. 最終挑戰：每局洗牌 5 張圖卡，逐張依文字線索選工具；涵蓋四種觀察方式。
7. 徽章完成頁：案件破解、四種工具回顧、胸章活動提示、再玩一次、回首頁。

共 **9 份證據**。沒有倒數或扣分；第二次嘗試後可選「一起找答案」，得到相同證據及徽章。答對後主動按下一步，不自動跳關。筆記本可隨時回顧已完成題目的圖像與解說。

## 專案結構

```text
public/images/       原創示意素材，可替換為適當授權的照片
  naked-eye/         葉片、成果蠅、斑馬魚
  optical/           動物細胞、細菌、洋蔥細胞示意
  fluorescence/      標記前與螢光細胞
  electron/          SEM 表面、TEM 粒線體
src/data/
  gameData.ts        關卡、題庫、正解、提示、解說、四步驟與觀察層級
  images.ts          素材路徑、替代文字、圖說、授權與來源
  types.ts           資料型別與 bi(繁中, English) 小工具
  ui.ts              入口、共用介面文字
  gameUI.ts          作答、筆記本、徽章、重設等介面文字
src/components/      GameShell、ProgressTracker、StageIntro、QuestionCard 等
src/game/
  gameState.ts       遊戲狀態、判答、洗牌、本機保存與驗證
  useWebMCP.ts       支援瀏覽器的可選唯讀進度工具
src/App.tsx          組合畫面與共用互動
src/styles.css       視覺設計、響應式與減少動態效果
tests/               自動化內容與遊戲流程檢查
docs/                素材編輯與測試紀錄
CHANGELOG.md         版本紀錄
```

## 如何更換圖片

詳細步驟與完整對照見 [docs/content-editing.md](docs/content-editing.md)。簡要流程：

1. 將自己的 PNG、WebP、JPEG 或安全 SVG 放入對應的 `public/images/` 子資料夾。
2. 在 `src/data/images.ts` 找到原來的圖片 ID。**保留 ID**，修改 `src`，例如 `images/optical/onion-real.webp`（不要加 `public/` 或開頭 `/`）。
3. 更新中英 `imageAlt`、`caption`、作者、來源與授權。真實影像設 `placeholder: false`。
4. 檢查相依題目的提示與答案是否仍符合新影像；不要只換檔案卻沿用不符合的描述。
5. 執行 `npm test`、`npm run build`，並試玩使用新圖的關卡。測試檔中的「初版全部為 SVG 佔位圖」驗證需在引入真實圖片時調整；連結／題庫與雙語檢查保留。

圖片使用等比例 `object-fit: contain`，不裁切。若需要比例尺，請使用校準正確且已嵌在原圖中的比例尺；本遊戲不自行產生數值比例尺。不同影像不能假裝是同一標本連續放大。

## 最常編輯的內容檔

| 想修改                           | 編輯檔案               |
| -------------------------------- | ---------------------- |
| 題目、選項、正解、提示、趣味知識 | `src/data/gameData.ts` |
| 圖片路徑、圖說、alt 與授權       | `src/data/images.ts`   |
| 首頁文字與按鈕                   | `src/data/ui.ts`       |
| 回饋、徽章邀請與重新開始文字     | `src/data/gameUI.ts`   |
| 配色、字級與版面                 | `src/styles.css`       |

所有教學文字透過 `bi('繁體中文', 'English')` 成對保存。UI 元件不保存題目內容。變更題目集合或正解時，提高 `gameData.ts` 的 `CONTENT_VERSION`，讓舊進度安全重置。

## 本機進度與共用裝置

- `localStorage` 鍵：`microscopic-detective:progress`，只有目前語言、題目／答案 ID、洗牌順序、提示、證據與保存時間。
- 最後操作 24 小時後，重新開啟時視為過期；題庫版本不符或資料損毀時重新開始。
- 重新整理可恢復目前畫面與作答；儲存受阻時改用本次記憶體狀態，仍能完整遊玩。
- 頂端品牌按鈕回到入口但保留這輪；可以繼續或開始新一輪。
- 遊戲中的重新開始有確認，保留目前語言；完成頁「再玩一次」也保留語言。
- 完成頁「回到首頁」清空本輪進度、恢復繁中，適合下一位孩子。
- 不使用 `localStorage.clear()`，避免清掉同網域其他程式的資料。

## Git 版本管理

第一個可玩 MVP 使用 annotated tag **`v0.1`**；`package.json` 使用三段式版本 **`0.1.0`**。

```powershell
git status
git log --oneline --decorate
git show v0.1 --stat
git diff v0.1 -- src/data/gameData.ts
```

要從 v0.1 建立新的實驗分支，先確認工作目錄的修改已妥善保存：

```powershell
git switch -c experiment-from-v0.1 v0.1
```

每次完成可檢查的小修改後 commit；發佈新版本時更新 `package.json`、lockfile 與 `CHANGELOG.md`，通過測試與建置後新增 tag，例如 `v0.2`。不重寫或覆蓋既有版本 tag。`node_modules/`、`dist/` 與本機測試產物不納入 Git。

## 下一步建議

1. 用設施影像替換示意圖，由科學人員確認標本、標記、圖例、授權及答案。
2. 邀請目標年齡兒童實際試玩，調整閱讀量、提示與 5–10 分鐘的活動節奏。
3. 加入現場離線支援及可設定的胸章製作引導，降低活動網路依賴。

此原型的瀏覽器與自動化檢查不等於真實兒童試玩、實機 iPad 測試或完整 WCAG 合規認證。
