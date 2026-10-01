# 微觀小偵探 / Microscopic Detective

**dev/v0.35 — Mission Flow Simplification** · v0.33 基準 · 套件維持 `0.33.0` · 分支 `dev/v0.35`

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

首頁可自由進入課程或任務，不強制先修課。五個探索階段依序是肉眼＋放大鏡、解剖、複式光學、螢光、電子。完成主要操作即可前進並收藏知識卡；額外挑戰可略過。課後回顧六張工具卡，再進入任務。

第一階段從肉眼看果蠅、稍微靠近，到拿起放大鏡，使用同一個場景與座標系。拿起鏡片時底圖位置與大小不變，只有鏡片內約 2.5 倍放大；找到頭、身體、翅膀或腳後可前進，並一次收藏肉眼與放大鏡兩張卡。葉片保留為發現後的自由探索。解剖顯微鏡繼續觀察果蠅外部；複式光學階段明確轉問「細胞長什麼樣？」並換洋蔥表皮。

六種觀察工具仍各自獨立，筆記本、回顧與任務選項不合併肉眼和放大鏡。每個主要觀察區使用 `ObservationView` 顯示「現在使用 / Using now」與工具名稱，重用 `toolIllustrations.ts` 及 Notebook 的六張 SVG，沒有新增儀器圖檔。桌面插圖約 112px、位於視野右側；680px 以下改為上方橫排、插圖 64px，不擠壓觀察區。電子顯微鏡共用一張插圖，另標 SEM 表面／TEM 內部模式。

`ToolVisual` 共用上述插圖，支援 context、choice、feedback、compact 四種尺寸。任務選項以可選 `toolVisualId`／`toolMode` 指定工具；桌面 72px 視覺卡、手機 52px 橫排卡，SEM／TEM 以模式標籤區分。作答前只提示選工具，答錯只呈現所選工具，成功或協助完成後才在回饋連結工具與證據。每階段第一題保留完整介紹，後續顯示階段名稱及證據進度。課程完成頁先呈現精簡六工具回顧，再進入任務。

任務共有 **10 份必修紀錄**：尺度複選、四張真實神秘影像、一題選工具（`tools-fish`），以及最終案件的三次觀察和一題證據整合。四個任務階段為 **01 scale → 02 mystery → 03 tools → 04 final**，各階段必修題數為 1／4／1／4；課程的五個探索階段不變。尾鰭案件依序調查整片尾鰭（解剖顯微鏡）、傷口組織（複式光學顯微鏡）、有增殖標記的細胞（螢光顯微鏡）；三份證據逐步解鎖，整合解釋後才結案。TEM 是結案後的選修調查，獨立存檔並可收進筆記本，不影響主案件完成。Stage 03 保留看成魚游泳的工具選擇。單選立即回饋；先觀察再選工具。「給我一點線索 / Give me a hint」提供一個可選提示；第一次不合適的選擇也顯示提示，第二次提供較強提示及協助完成。延伸知識在回答後自由展開，不新增年齡或難度模式。

必修題序：`mission-scale` → `mystery-light` → `mystery-glow` → `mystery-sem` → `mystery-tem` → `tools-fish` → `fin-shape` → `fin-tissue` → `fin-proliferation` → `fin-explanation`。`fin-bonus-tem` 仍為選修。移除重複問題不移除觀察工具；螢光仍由 mystery-glow、fin-proliferation 及課程／筆記本介紹。Final Case 科學內容維持 v0.33。

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
| `public/images/investigation/`、`scripts/generate-fin-illustrations.py` | 尾鰭案件四張 SVG；共用尾鰭與細胞座標，重用原斑馬魚圖 |
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

沒有配置 `test:e2e`。本次簡化與存檔遷移驗證見 [v0.35 驗證紀錄](docs/v0.35-validation.md)，Final Case 原始驗證見 [v0.33 驗證紀錄](docs/v0.33-validation.md)；歷史驗證與發布清單見 [docs/validation.md](docs/validation.md)。開啟 HTTP(S) 預覽，不要直接雙擊 `dist/index.html`。沒有 service worker 或離線安裝功能。

## 共用裝置與本機進度

使用 `microscopic-detective:progress:v2`，schema 2、content 6、academyRevision 3，沿用 24 小時閒置失效。`academyStages` 的五個階段與 `observationTools` 的六張工具卡分開；`academyCompleted` 記錄階段，`learnedTools` 記錄工具，`COMPLETE_ACADEMY_STAGE` 依該階段的 `toolIds` 收藏。

dev/v0.35 將有效 content 5 存檔升為 content 6：移除 mission-target、tools-protein、tools-fine 的完成紀錄，保留其餘題目、Final Case、課程、工具卡、語言、筆記本旗標與選修 TEM。游標依穩定 ID 保留；退休題目改到第一個未完成的存續必修題（mission-target → mystery-light；tools-protein／tools-fine → tools-fish）。換題才清除選項、重試、回饋、提示與探索步驟；舊完整存檔維持完成。歷史 content 4 存檔先依明確舊題序轉入 content 5，舊 Final Case 仍從 fin-shape 重開，再串接本次簡化。選修 TEM 使用獨立 `bonus` 記錄；主案件重玩時一併清除。

讀取有效 v0.30／revision 2 存檔時，舊工具收藏完整轉入 `learnedTools`，肉眼和放大鏡都完成才算完成 `close-observation` 階段；只完成其一會保留那張卡，合併階段仍可繼續。舊 index 0／1 都轉到新 index 0，2–5 轉到 1–4，課程首頁的 null 保留。較早四課版本也依舊 ID 轉換。課程遷移保留上述相容任務答案、語言、筆記本旗標與練習進度，寫回 revision 3 後不再遷移；損毀、不相容與過期存檔沿用既有處理。v0.28 以前 content 3 的進度仍不相容。舊 `practice` 畫面讀取後回到課程首頁。

重新整理保存語言、任務答案、提示及課程收藏；未完成的課程操作會重開。回首頁保留進度，「再玩一次」只重玩任務並保留課程卡與語言。

完成頁直接提供 **下一位小偵探 / Next Detective**：重用 `RESET` + `createGame()`，清空任務、課程、練習、提示及筆記本一次性狀態，回到繁中首頁。保存新空白狀態，重新整理不會帶回前一位玩家進度。既有重新開始對話框也重用相同動作；正常課程不新增突出的清除按鈕。只改本專案進度鍵，不使用 `localStorage.clear()`，不清其他資料或 v0.1 原存檔。儲存受阻仍可在記憶體遊玩，會顯示提醒。

## 版本與部署

`package.json.version` 是程式版本唯一來源，頁尾自動取 major/minor 顯示 `v0.33`；已移除手動 `displayVersion` 欄位。發布時同步 lockfile、README 與 CHANGELOG。`CONTENT_VERSION` 是存檔相容版本，不隨呈現調整升號。

正式站：[micro.weichenchu.com](https://micro.weichenchu.com/)。GitHub Pages workflow `.github/workflows/deploy-pages.yml` 在 push `main` 或手動執行時，`npm ci` → `npm test` → `npm run build`，只部署 `dist/`。`public/CNAME` 保留自訂網域；Vite `base: "./"`。詳見 [部署文件](docs/github-pages.md)。

dev/v0.35 從乾淨的 v0.33 commit `14b4361` 開始，沒有整合 v0.34；套件維持 0.33.0，頁尾仍顯示 v0.33。尚未提交、推送、合併或部署。近期歷史與 v0.28／v0.29 合併提交的限制見 [CHANGELOG](CHANGELOG.md)。活動前仍需兒童試玩、科學人員審閱，以及實機手機／Safari 和活動網路測試。
