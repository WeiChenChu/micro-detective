# 微觀小偵探 / Microscopic Detective

**v0.24-dev**（npm 套件版本 `0.24.0-dev`；開發分支 `dev/v0.24`）— 適合國小高年級至國中及親子科普活動的靜態教育遊戲。

React + TypeScript + Vite + 原生 CSS。沒有後端、帳號、個資表單、分析追蹤或外部字型。沿用 v0.1 的所有本機原創 SVG 教學示意圖，並非真實顯微照片。架構檢查、重用元件、風險與實作順序見 [v0.2 遷移分析](docs/v0.2-migration.md)。

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
npm run lint     # ESLint 靜態規則檢查
npm run build    # TypeScript 檢查及正式建置
npm run preview  # 預覽 dist/ 正式版本
```

正式部署目標為 GitHub Pages 自訂網域 `https://micro.weichenchu.com/`（根路徑 `/`，與主網站分開）。詳見 [部署步驟](docs/github-pages.md)。部署時上傳 `dist/` 內容到靜態網站主機。網站沒有後端路由；Vite 使用相對 base，可放在子目錄。請由 HTTP(S) 網站伺服器開啟，勿直接雙擊 `dist/index.html`。第一次載入需要可連線的靜態伺服器；這版沒有 service worker 或離線安裝功能。網站程式不要求登入，託管平台的分享／登入政策由平台另行控制。

## v0.24-dev 學習流程

首頁提供「🎓 小偵探課程」與「🕵️ 小偵探任務」兩個入口。推薦第一次先學課程，但任務沒有修課門檻。繁中預設，保留完整英語切換。

**小偵探課程：** 先用約 30 秒的工具地圖建立概念，再沿著「樣品 → 限制 → 需求 → 工具 → 操作 → 發現」探索六站。四站以操作完成，光學與電子兩站在探索後各保留一個簡短概念確認。首頁只保留雙入口，完整能力整理放在課程完成後。

- 肉眼：從成魚到果蠅，再靠近果蠅，比較「找到輪廓」與「分辨翅膀細線」的需求。
- 放大鏡：拖曳、方向鍵或方向按鈕掃描果蠅，找到翅膀、眼睛或腳；也能換葉片。
- 解剖顯微鏡：切換低／中／高倍率，左右、上下移動視野；看過高倍率局部再回到低倍率完整外形，完成比較。
- 複式光學顯微鏡：對焦滑桿改變模糊程度；10×／20×／40×比較視野，明示數位放大不增加解析度；概念確認聚焦薄樣品、透光與細胞邊界。
- 螢光顯微鏡：標記 ON/OFF、適當照明 ON/OFF、雙標記疊合；先找到訊號，再關閉照明比較消失，操作後直接收藏。
- 電子顯微鏡：比較 SEM 表面與 TEM 內部；概念確認聚焦 TEM 薄切片、特殊處理與活體限制。

四個操作課程達成觀察後即可收藏；光學需清楚對焦並完成概念確認，電子需比較後完成概念確認。放大鏡仍需掃到一處線索。重看不會重複增加收藏。所有圖像仍為明確標示的教學示意，非校準顯微鏡模擬或真實照片。

**選工具小遊戲：** 四題重用既有作答與回饋元件；仔細觀察完整果蠅以解剖顯微鏡為最佳答案，戶外稍微放大葉脈則選放大鏡。肉眼可以發現成體果蠅，並不代表適合仔細觀察牠的細節。完成技能可在筆記本複習，並繼續原本任務。

**任務：**

1. 誰需要顯微鏡？— 比較成魚、成體果蠅、細胞與細菌。
2. 找出微觀線索 — 選擇能讓細胞核更明顯的標記方法。
3. 神秘影像 — 四份複式光學顯微鏡、螢光、SEM、TEM 示意，先讀可見證據；SEM／TEM 的儀器機制延後到第二層提示／觀察記錄。
4. 幫科學家選工具 — 針對蛋白質位置、細微膜構造與成魚游動，選合適工具。
5. 微觀案件調查 — 固定「問題 → 選工具 → 新影像證據 → 新問題」；依序揭露細胞輪廓、蛋白質 X 訊號、TEM 內部皺摺。使用既有合成示意，明示另行樣品準備；不是同一真實樣品連續放大。

共 **12 份任務證據 + 6 張課程知識卡 + 選工具技能**。沒有扣分、倒數、生命值或失敗狀態。第二次答錯會直接顯示更強提示，並提供協助完成；答對或得到協助後都有原因解說。所有玩家得到相同徽章。

筆記本能借閱尚未收藏的知識卡；完成相應課程後加上收藏標記，也保留每題證據與解說。完成頁與課程總結一致使用「看見／尋找／深入」，強調根據科學問題選工具。

## 專案結構

```text
public/images/       保留原創示意素材
  microscopy/        人工確認授權的真實影像預留位置
  naked-eye/         葉片、成體果蠅、斑馬魚
  optical/           動物細胞、細菌、洋蔥細胞示意
  fluorescence/      標記前與螢光細胞
  electron/          SEM 表面、TEM 粒線體
src/data/
  academyData.ts     六個探索課程、知識卡、尺度與三種能力
  academyExtensions.ts 新增放大鏡與解剖顯微鏡課程
  observationData.ts 選工具練習、替代答案、觀察操作文案及熱點
  academyUI.ts       課程、雙入口及共用教育介面文案
  missionData.ts     任務、工具取捨回饋、兩層提示、固定最終案件
  investigationData.ts Final Case 的前次觀察、新證據、樣品處理與下一個問題
  gameData.ts        v0.1 原題庫參照；保留共用螢光四步驟與生物選項
  images.ts          素材路徑、替代文字、圖說、授權與來源
  types.ts           資料型別與 bi(繁中, English) 小工具
  ui.ts              入口、共用介面文字
  gameUI.ts          作答、筆記本、徽章、重設等介面文字
src/components/      GameShell、ProgressTracker、StageIntro、QuestionCard 等
src/game/
  gameState.ts       遊戲與課程導航、判答、收藏、本機保存與版本驗證
  useWebMCP.ts       支援瀏覽器的可選唯讀進度工具
src/App.tsx          組合畫面與共用互動
src/styles.css       視覺設計、響應式與減少動態效果
tests/               自動化內容與遊戲流程檢查
docs/                素材編輯與測試紀錄
CHANGELOG.md         版本紀錄
```

## 如何更換圖片

詳細步驟與完整對照見 [docs/content-editing.md](docs/content-editing.md)。簡要流程：

1. 保留既有 SVG 與 ID；把人工確認過授權的照片放在 `public/images/microscopy/`。
2. 在 `images.ts` 新增獨立 ID，設定 `type: "real"`、`placeholder: false`、中英 `imageAlt`／`caption`，以及作者、來源、license、sourceUrl、licenseUrl（適用時）和實際修改。
3. 在 `realImageExamples` 設定對應示意圖的 `imageId`。尚未配置的區塊只顯示「真實影像準備中」，不發出失效 URL 請求。
4. `MicroscopyImage` 會在真實影像旁顯示圖說與可展開的「圖片來源 / 授權」。不同樣品須明示，不能暗示是連續放大。
5. 執行 `npm test`、`npm run lint`、`npm run build` 並試玩。素材測試同時支援示意圖與真實影像，原 SVG 安全驗證保留。

圖片使用等比例 `object-fit: contain`，不裁切。若需要比例尺，請使用校準正確且已嵌在原圖中的比例尺；本遊戲不自行產生數值比例尺。不同影像不能假裝是同一標本連續放大。

## 最常編輯的內容檔

| 想修改                           | 編輯檔案               |
| -------------------------------- | ---------------------- |
| 任務、選項、正解、提示、趣味知識 | `src/data/missionData.ts` |
| 探索課程、知識卡與概念說明 | `src/data/academyData.ts` |
| 圖片路徑、圖說、alt 與授權       | `src/data/images.ts`   |
| 首頁、課程文字與按鈕 | `src/data/academyUI.ts`、`src/data/ui.ts` |
| 回饋、徽章邀請與重新開始文字     | `src/data/gameUI.ts`   |
| 配色、字級與版面                 | `src/styles.css`       |

所有教學文字透過 `bi('繁體中文', 'English')` 成對保存。UI 元件不保存題目內容。變更題目集合或正解時，提高 `missionData.ts` 的 `CONTENT_VERSION`，讓舊進度安全重置。

## 本機進度與共用裝置

- v0.24-dev 延用 v0.2 鍵：`microscopic-detective:progress:v2`，schema 2、content 3、academyRevision 2。本次保留 v0.22／v0.23 的任務、練習、課程 ID、正解與儲存格式；v0.22／v0.23 存檔在原有 24 小時效期內可直接續玩。較舊 v0.2／v0.21 的內容版本仍依既有規則重置。只保存這台裝置的語言、任務作答、課程頁與收藏。
- 原 v0.1 鍵 `microscopic-detective:progress` 保留不動；只接續語言，新任務由頭開始，並顯示版本提醒。不能把舊題答案當作新題通關。
- 保留 v0.1 的 24 小時閒置失效規則（包括這次課程收藏）；損毀或不相容的 v0.2 存檔安全重置。
- 重新整理恢復任務作答、提示及課程頁／已收藏卡片。未完成課程的探索操作會從該模組觀察頁重開，不影響已收藏卡片。
- 課程與任務之間移動會保留當前任務選項。回首頁保留進度；「重新偵查／再玩一次」保留語言與課程卡，清空本輪任務。
- 「重新開始」對話框中的「下一位小偵探」清空 v0.2 任務與課程收藏，回到繁中首頁。
- 儲存受阻時仍可在記憶體內完整遊玩，畫面會提示關閉後可能無法保存。
- 不使用 `localStorage.clear()`，不清掉其他網站資料或 v0.1 原存檔。

## Git 版本管理

第一個可玩 MVP 以 annotated tag **`v0.1`** 保留；當時的套件版本為 **`0.1.0`**。本次工作目錄已更新為 **`0.24.0-dev`**（顯示 v0.24-dev），尚未新增版本 tag 或發布線上版本。

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

1. 補入設施真實影像，保留示意圖；由科學人員確認標本、標記、圖例、授權及影像解讀。
2. 邀請目標年齡兒童實際試玩，調整閱讀量、提示與各模組 1–2 分鐘的活動節奏。
3. 加入現場離線支援及可設定的胸章製作引導，降低活動網路依賴。

此原型的瀏覽器與自動化檢查不等於真實兒童試玩、實機 iPad 測試或完整 WCAG 合規認證。

## v0.24 驗證與待補素材

詳見 [v0.24 驗證紀錄](docs/v0.24-validation.md)。本次沒有下載或發布真實顯微影像。既有 `source_images/bioart/` 為儀器插圖，`image_credits/IMAGE_CREDIT.md` 為使用者提供的候選素材紀錄，尚不等於網站已載入或已逐項驗證。
