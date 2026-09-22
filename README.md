# 微觀小偵探 / Microscopic Detective

**v0.30 開發版** · 套件 `0.30.0` · 分支 `dev/v0.30`

給國小到國中學生與家長一起探索的雙語顯微科學網站，主要用於中研院 Open House／兒童科普日的共用電腦，以及掃 QR code 進入的手機。React + TypeScript + Vite + 原生 CSS；免登入，沒有後端、個資表單、分數排行榜或分析追蹤。

## 學習原則

**先想知道什麼，再選適合的觀察工具。**

**Think about what you want to know first, then choose the appropriate observation tool.**

看得到，不一定看得清楚；看得清楚，也不一定看得到你想找的線索。倍率更高不一定更好，拉大同一張圖片不會增加解析度。不同工具能提供不同證據，也需要適合的樣品與準備方式。

## 工具與學習流程

| 工具 | 主要觀察用途 |
| --- | --- |
| 肉眼 / Naked eye | 大小、位置、整體外觀 |
| 放大鏡 / Magnifying glass | 讓可見物體更容易辨認 |
| 解剖顯微鏡 / Stereomicroscope | 小型完整樣品與較細的外部構造 |
| 複式光學顯微鏡 / Compound light microscope | 細胞形狀、適合的薄樣品 |
| 螢光顯微鏡 / Fluorescence microscope | 搭配標記找特定構造的位置 |
| SEM（掃描式電子顯微鏡）/ Scanning electron microscope | 細緻表面形狀與紋路；常有立體感，單張照片不是 3D 模型 |
| TEM（穿透式電子顯微鏡）/ Transmission electron microscope | 很薄樣品或薄切片內部的超微結構 |

SEM／TEM 同屬「電子顯微鏡」，保留在同一課程與工具卡中，分別列出用途。解剖與螢光也屬光學顯微鏡；上述是教學觀察分類，不是互斥技術分類或能力排行榜。

首頁可自由進入課程或任務，不強制先修課。六站課程依序是肉眼、放大鏡、解剖、複式光學、螢光、電子。完成主要操作即可前進並收藏知識卡；額外挑戰可略過。課後回顧六張工具卡，再進入任務。

任務共有 **12 份證據**：尺度複選、標記比較、四張真實神秘影像、三題選工具、三步最終案件（細胞輪廓 → 蛋白質位置 → 內部細微構造）。單選立即回饋；先觀察再選工具。「給我一點線索 / Give me a hint」提供一個可選提示；第一次不合適的選擇也顯示提示，第二次提供較強提示及協助完成。延伸知識在回答後自由展開，不新增年齡或難度模式。

## 示意圖與真實顯微影像

網站刻意結合簡化教學示意圖與 **8 張獨立來源的真實影像**。真實照片不是示意圖的連續放大，也不預期形狀、位置或配色完全相同。

- 課程：洋蔥表皮、三色螢光細胞、果蠅複眼 SEM、粒線體 TEM。照片直接顯示，附短版「🔎 偵探觀察 / Detective Observation」及圖說。洋蔥站完整說明不同樣品，後續使用小標籤提醒。
- 任務：血球、螢光細胞、紫背萬年青花粉 SEM、衣藻 TEM。初始題幹與替代文字描述可見線索，方法記錄留在提示／解答；來源原始標題隨時可查。
- 課程照片紅色代表肌動蛋白細胞骨架，不是互動示意圖的細胞邊界。兩張螢光照片也使用不同的顏色對照。不能只憑彩色判定螢光。
- 作者和授權保持可見，完整來源、原始標題（有記錄時）、標記記錄及修改狀態可展開。任務來源放在作答區後；課程有往下繼續的連結。完整照片採 `contain`，保留比例尺與視野。

## 圖片與程式結構

| 路徑 | 用途 |
| --- | --- |
| `source_images/{optical,fluorescence,sem,tem}/` | 課程來源 JPG；追溯用，正式網站不讀取 |
| `source_images/missions/` | 任務來源 JPG／PNG |
| `public/images/microscopy/{optical,fluorescence,sem,tem}/` | 課程最佳化 WebP |
| `public/images/microscopy/missions/` | 任務最佳化 WebP |
| `public/images/{naked-eye,optical,fluorescence,electron}/` | 本機教學 SVG、對齊螢光圖層 |
| `src/assets/tools/`、`src/data/toolIllustrations.ts` | 六張工具插圖及簡介 |
| `src/data/images.ts` | 圖片 ID、路徑、尺寸、雙語 alt／caption／observationClue、完整 credit；`realImageExamples` 配對課程 |
| `src/data/missionData.ts`、`investigationData.ts` | 任務、提示、解答、最終案件證據 |
| `src/data/academyData.ts`、`academyExtensions.ts`、`academyFlow.ts` | 課程、知識卡、SEM／TEM 子項、非阻擋挑戰與回顧 |
| `src/data/observationData.ts`、`fluorescenceData.ts` | 互動資料、熱點、螢光訊號；部分原練習題重用於課程挑戰 |
| `src/components/` | `RealImageExample`、`MicroscopyImage`、`ImageAttribution`、課程、任務與筆記本元件 |
| `src/game/gameState.ts` | 判答、導航、本機保存與重置 |
| `src/App.tsx`、`src/styles.css` | 畫面組合、響應式與減少動態效果 |
| `tests/`、`docs/` | 自動化驗證、內容編輯與發布檢查 |

來源／授權的 UI 唯一資料來源是 `images.ts`，包括 Public Domain、CC0、CC BY 2.0／4.0 的個別記錄，不把它們一律改稱「免費圖片」。`source_images/bioart/` 和 `image_credits/IMAGE_CREDIT.md` 是歷史候選素材，未啟用者不能當作目前網站的授權清單。詳細維護方式見 [內容編輯指南](docs/content-editing.md)。

## 開發與驗證

使用 Node.js 22.12+ 與 npm，在 repository 根目錄執行：

```sh
npm ci
npm run dev       # 本機開發，依終端顯示的 URL 開啟
npm test          # tsx + node:test
npm run lint
npm run typecheck
npm run build     # TypeScript + Vite，輸出 dist/
npm run preview   # 正式建置的本機預覽
```

沒有配置 `test:e2e`。既有本機 Playwright／Edge 驗證方式與發布清單見 [docs/validation.md](docs/validation.md)。開啟 HTTP(S) 預覽，不要直接雙擊 `dist/index.html`。沒有 service worker 或離線安裝功能。

## 共用裝置與本機進度

使用 `microscopic-detective:progress:v2`，schema 2、content 4、academyRevision 2，沿用 24 小時閒置失效。v0.30 沒有改變題目 ID、正解或 schema，有效 v0.29 進度仍可續用；v0.28 以前 content 3 的進度不相容。舊 `practice` 畫面讀取後回到課程首頁。

重新整理保存語言、任務答案、提示及課程收藏；未完成的課程操作會重開。回首頁保留進度，「再玩一次」只重玩任務並保留課程卡與語言。

完成頁直接提供 **下一位小偵探 / Next Detective**：重用 `RESET` + `createGame()`，清空任務、課程、練習、提示及筆記本一次性狀態，回到繁中首頁。保存新空白狀態，重新整理不會帶回前一位玩家進度。既有重新開始對話框也重用相同動作；正常課程不新增突出的清除按鈕。只改本專案進度鍵，不使用 `localStorage.clear()`，不清其他資料或 v0.1 原存檔。儲存受阻仍可在記憶體遊玩，會顯示提醒。

## 版本與部署

`package.json.version` 是程式版本唯一來源，頁尾自動取 major/minor 顯示 `v0.30`；已移除手動 `displayVersion` 欄位。發布時同步 lockfile、README 與 CHANGELOG。`CONTENT_VERSION` 是存檔相容版本，不隨純文案版本升號。

正式站：[micro.weichenchu.com](https://micro.weichenchu.com/)。GitHub Pages workflow `.github/workflows/deploy-pages.yml` 在 push `main` 或手動執行時，`npm ci` → `npm test` → `npm run build`，只部署 `dist/`。`public/CNAME` 保留自訂網域；Vite `base: "./"`。詳見 [部署文件](docs/github-pages.md)。

v0.30 停留開發分支，沒有合併 main、推送、建立 tag 或部署。近期歷史與 v0.28／v0.29 合併提交的限制見 [CHANGELOG](CHANGELOG.md)。活動前仍需兒童試玩、科學人員審閱，以及實機手機／Safari 和活動網路測試。
