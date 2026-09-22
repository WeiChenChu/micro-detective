# 內容編輯指南 — v0.30

目前內容以 `src/data/` 的雙語資料為主；沿用 React 元件，不另建圖片或題庫系統。實際發布檢查見 [validation.md](validation.md)。歷史 `v0.*-validation.md`／migration／audit 是當時紀錄，不是目前規格。

## 教學資料與示意圖

- `academyData.ts`／`academyExtensions.ts`：六站課程。`AcademyLesson` 包含工具視覺資料、`id`、`icon`、`title`、`opening`、`concept`、`clue`、`sendoff`、可選 `check`；電子課程的 `detailViews` 含雙語 `name`／`description`，由 ToolSummary 與 KnowledgeCard 共用，明列 SEM／TEM。
- `academyFlow.ts`：發現句、可略過的挑戰與工具回顧。`observationData.ts` 的部分既有工具題用於課程小挑戰，沒有獨立練習入口；不要刪除仍被引用的資料。
- `ConceptReveal` 分派各工具操作，`AcademyModule` 在前進時收藏。保留六站 ID：scale、magnifier、stereo、optical、fluorescence、electron。
- 生物示意 SVG 位於 `public/images/{naked-eye,optical,fluorescence,electron}/`，以 `images.ts` 的 `illustration(...)` 登錄穩定 ID、相對 `src`、雙語 title／alt／caption、分類。`type: "illustration"`、`placeholder: true` 沿用既有格式；placeholder 不表示沒有素材。
- 工具插圖位於 `src/assets/tools/`，由 `toolIllustrations.ts` 管理工具名稱、摘要、alt。不要與生物影像的登錄表混用。
- 新增或編輯 SVG 保留 `viewBox="0 0 800 600"` 與 4:3；不要加入 script、foreignObject 或遠端圖片。果蠅／葉片熱點是 `observationData.ts` 的 0–1 座標，換圖後需重新核對。
- 螢光示意圖層 `public/images/fluorescence/channel-*.svg` 使用相同細胞座標，沒有不透明底色；訊號定義與依序顯示由 `fluorescenceData.ts` 管理。改圖後確認粒線體在細胞邊界內、細胞核外。

## 真實影像位置與連接方式

保留來源 JPG／PNG，不覆寫原始素材。課程原檔在 `source_images/<modality>/`，任務原檔在 `source_images/missions/`。網站只載入 `public/images/microscopy/` 下的最佳化 WebP。不從 `source_images/` 發出 production 請求。

| 圖片 ID | `public/images/microscopy/` 下的 WebP | `source_images/` 下的原檔 |
| --- | --- | --- |
| onion-real | optical/onion_epidermis.webp | optical/onion_epidermis.jpg |
| fluorescence-real | fluorescence/Cells_FL_mitochondria_cytoskeleton_nuclei.webp | fluorescence/Cells_FL_mitochondria_cytoskeleton_nuclei.jpg |
| sem-eye-real | sem/Drosophilida-compound-eye-sem.webp | sem/Drosophilida-compound-eye-sem.jpg |
| tem-mitochondrion-real | tem/mitochondrion-tem.webp | tem/mitochondrion-tem.jpg |
| mission-blood-real | missions/optical-blood-cells.webp | missions/optical-blood-cells.jpg |
| mission-fluorescence-real | missions/fluorescence-osteosarcoma-cells.webp | missions/fluorescence-osteosarcoma-cells.png |
| mission-pollen-real | missions/sem-tradescantia-pollen.webp | missions/sem-tradescantia-pollen.jpg |
| mission-tem-real | missions/tem-chlamydomonas.webp | missions/tem-chlamydomonas.jpg |

沿用現有檔名的大小寫；新增檔名建議用 ASCII、以連字號連接觀察方法與樣品。課程 ID 用 `<subject>-real`，任務用 `mission-<subject>-real`，務必唯一。

1. 先核對來源頁、作者、授權、科學描述，再準備 WebP；不要因「網路上找得到」就視為可用。保留原圖比例尺，不自行加上未校準尺度。
2. 在 `images.ts` 的 `images` 加入 `ImageData`，填 `id`、相對 `src`（不加開頭 `/`）、`type: "real"`、`placeholder: false`、實際 `width`／`height`、`microscopeType` 與 `modality`（optical／fluorescence／sem／tem）。URL 統一用 `imageUrl()` 及 Vite BASE_URL。
3. `title`、`imageAlt`、`caption`、課程用的 `observationClue` 都用 `bi(繁中, English)`。不要把工具答案藏在任務 alt 中。
4. 課程在 `realImageExamples` 將示意 ID 配到真實 ID：optical-onion → onion-real；fluorescence-cell → fluorescence-real；electron-surface → sem-eye-real；electron-mitochondrion → tem-mitochondrion-real。保留示意操作。
5. 任務在 `missionData.ts` 的 `Question.image` 指向獨立真實 ID，四個 mystery 題分別用上述四張任務照片。不要套用示意圖的 `evidenceTargets` 熱點到照片。
6. `RealImageExample` 是直接可見的 section。正常路線首次在洋蔥站完整介紹不同樣品，後續 `differentSpecimen` badge 簡短提醒。`MicroscopyImage` 的 `showObservation` 顯示觀察問題；`showCaption` 未指定時真實照片顯示圖說，任務明確關閉重複圖說。
7. 真實照片完整 contain，不裁切；有手機／桌機高度上限。`RealImageExample` 的往下連結對應 `AcademyModule` 的 `academy-continue`，不略過原有完成條件。

## Attribution 實際資料欄位

`src/data/types.ts` 的 `ImageData.credit` 是唯一來源，`ImageAttribution` 和全站 `Credits` 共用。沒有額外 `attributionText` 欄位。

| 欄位 | 內容／編輯要求 |
| --- | --- |
| `creator` | 型別必填；完整作者／機構，保留已知修圖者 |
| `license` | 型別必填；原有授權名稱、版本及地域措辭 |
| `source`、`sourceUrl` | 型別可選；外部真實照片應記錄來源名稱與原始說明頁 URL，不能只填圖片 CDN |
| `licenseUrl` | CC BY／CC0 應附對應版本連結；Public Domain 依來源說明，不虛構授權 URL |
| `creatorUrl` | 有正確作者頁時選填 |
| `originalTitle` | 選填，已有的原始標題必須保留；目前任務四張都有 |
| `details` | 選填雙語 Text；例如各顏色對應的標記資訊 |
| `changes` | `string` 或雙語 Text；真實照片記錄實際縮小、轉換／最佳化與已知裁切，不能聲稱沒有做的修改 |

`compact` 模式仍常駐作者、授權及授權連結；來源頁、原始標題、details、changes 在原生 details 中。課程來源在觀察／圖說／繼續連結後，任務來源在作答／回饋後。非 compact（筆記本、Credits）另外常駐來源頁連結。全部連結沿用新分頁與 `noopener noreferrer`；不用 hover 才能取得資訊。

目前授權原文：洋蔥 `CC0 1.0`、課程螢光 `CC BY 2.0`、複眼與粒線體 `Public Domain`、血球與任務螢光 `CC BY 4.0 International`、花粉 `CC0 1.0 Universal`、衣藻 `Public Domain worldwide`。CC0 是權利放棄聲明，CC BY 有署名條件，不可混稱。政府來源若僅主張美國公有領域，不得自行推廣成全球公有領域。來源有疑義先記錄待確認，不臆測法律結論。

`image_credits/IMAGE_CREDIT.md` 是歷史候選清單，包含未啟用素材與範例 modification；它不能取代現行 `images.ts` 的逐圖資料。

## 偵探觀察與科學圖說

先指向可見特徵，之後才解釋。`observationClue` 顯示於照片下方、caption 前，標題為「🔎 偵探觀察 / Detective Observation」。一句或兩句即可，不新增必答互動。例如：

- 洋蔥：「找找一格一格排列的細胞。哪些線條看起來把每個細胞分開？」／“Look for cells arranged side by side. Which lines seem to separate one cell from the next?”
- 複眼：「表面有哪些重複排列的小面？沿著小面之間找找看，還有哪些紋理？」

圖說才說明細胞壁、膜等解讀，區分「看見線條」與「這是某構造」。不同樣品不宣稱連續放大，也不必與示意位置相同。不要說倍率高一定更好。

SEM 主要看表面形狀／紋路，常有立體感，但單張圖不等於 3D 資料。TEM 觀察很薄樣品／薄切片的內部超微結構，不能說能穿透任何東西。重要段落用 SEM（掃描式電子顯微鏡）、TEM（穿透式電子顯微鏡），英文用完整英文名稱，不混入中文。

課程螢光圖：細胞核藍、粒線體綠、肌動蛋白細胞骨架紅；紅色不是示意圖的細胞邊界。任務螢光圖：微管紅、肌動蛋白綠、細胞核 DNA 藍。保留兩者差異，顏色不能單獨證明螢光，確認方法需要標記／照明記錄。

## 任務與兒童文案

`missionData.ts` 的 `caseQuestions` 有 9 題，`finalQuestions` 有 3 題；`gameData.ts` 是歷史題庫與共用生物選項來源，不在舊題庫新增目前任務。

問題欄位包括：穩定 `id`、`stage`、`type`、雙語 `title`／`question`、`choices`、`correctAnswer`、`hint`、`strongHint`、`explanation`、`funFact`、可選 `observation`／`image`／`answerExplanations`。`toolSelection` 供工具選擇 UI 使用；單選 `acceptedAnswers` 表示任一可接受答案，非多選。

- 初始 `observation` 只描述可見形狀、分布、表面或內部；題幹問「想知道什麼，哪種方法適合」。不能先說光和鏡片、沒有螢光標記或已加標記，再考工具。
- 一個可選的「給我一點線索」顯示 `hint`，只引導比較，不立即給正解。重用 `HINT`／`showHint`，不加入新狀態框架。
- 第一次不合適的選擇顯示 hint（或已有的個別回饋），第二次顯示 `strongHint` 並開放協助完成。更強提示可揭露製備／方法記錄；不是按兩次提示鈕的兩層選單。
- `explanation` 解釋選工具的理由，也可揭露樣品名稱。`funFact` 回答後選讀。來源詳情一直可查，毋須為防洩題而隱藏授權。
- 使用適合兒童的繁體中文、短句、台灣用語「螢光」「粒線體」；英文自然表達，不逐字翻譯。避免未解釋縮寫、年級選擇、分數競賽，以及以灰階／彩色定論工具。
- `investigationData.ts` 配對最終三步的 `evidenceImage`、`evidenceTitle`、`evidence`、`preparation`、`nextQuestion`；證據回答後揭露。維持「問題 → 工具 → 證據 → 下一個問題」，內部構造需要另行準備樣品。

## 版本、保存與檢查

套件 `package.json.version` 為 `0.30.0`，GameShell 取 major/minor 顯示 `v0.30`，沒有手填 `displayVersion`。更新 lockfile、README、CHANGELOG。

目前 `CONTENT_VERSION = 4`，schema 2、academyRevision 2。純文字／外觀修整不用升存檔版本；變更題目集合、正解或不相容互動才升號。v0.30 保留有效 v0.29 進度。完成頁「下一位小偵探」與原重置對話框共用 App 的回呼，`RESET` + `createGame()` 回繁中首頁並覆寫進度，不清其他網站資料。

執行 `npm test`、`npm run lint`、`npm run typecheck`、`npm run build`，再用 `npm run preview` 試玩雙語課程、任務及手機照片。細部清單見 [validation.md](validation.md)。
