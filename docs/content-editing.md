# 編輯題庫與替換顯微影像

## 圖片 ID 對照

| ID                       | 檔案（位於 public/images/）           | 使用位置                         |
| ------------------------ | ------------------------------------- | -------------------------------- |
| `leaf`                   | `naked-eye/leaf.svg`                  | 放大鏡互動、葉脈選工具練習 |
| `fruit-fly`              | `naked-eye/fruit-fly.svg`             | 肉眼、放大鏡、解剖顯微鏡、選工具練習 |
| `zebrafish`              | `naked-eye/zebrafish.svg`             | 尺度任務、成魚游動                   |
| `animal-cell`            | `optical/animal-cell.svg`             | 尺度任務、細胞概念圖             |
| `bacterium`              | `optical/bacterium.svg`               | 尺度任務             |
| `optical-onion`          | `optical/optical-onion.svg`           | 複式光學顯微鏡課程、最終案件       |
| `fluorescence-cell`      | `fluorescence/fluorescence-cell.svg`  | 螢光示意、找目標、最終案件 |
| `cell-unmarked`          | `fluorescence/cell-unmarked.svg`      | 一般細胞輪廓示意、Final Case 第一份證據                     |
| `electron-mitochondrion` | `electron/electron-mitochondrion.svg` | 電子課程、最終案件       |
| `electron-surface`       | `electron/electron-surface.svg`       | 電子課程的表面探索    |

`microscopeType` 表示這份教學素材的預定觀察分類，並非該生物只能被該工具觀察。細胞／細菌概念圖的細節不代表一般光學照片一定能看見全部構造。

## 保留示意圖並新增真實影像

四張真實影像已在 `src/data/images.ts` 的既有 `ImageData` 登錄，由 `realImageExamples` 配對；不替換示意互動。光學與電子課程沿用 `RealImageExample`，螢光課程也使用同一元件。

| 示意 ID | 真實影像 ID | public/images/microscopy/ 下的檔案 | source_images/ 下的原始檔案 |
| --- | --- | --- | --- |
| optical-onion | onion-real | optical/onion_epidermis.webp | optical/onion_epidermis.jpg |
| fluorescence-cell | fluorescence-real | fluorescence/Cells_FL_mitochondria_cytoskeleton_nuclei.webp | fluorescence/Cells_FL_mitochondria_cytoskeleton_nuclei.jpg |
| electron-surface | sem-eye-real | sem/Drosophilida-compound-eye-sem.webp | sem/Drosophilida-compound-eye-sem.jpg |
| electron-mitochondrion | tem-mitochondrion-real | tem/mitochondrion-tem.webp | tem/mitochondrion-tem.jpg |

新增影像時：

1. 原始檔保留於 `source_images/<modality>/` 供來源追溯；網站只使用 `public/images/microscopy/<modality>/` 的最佳化檔。`src` 不加開頭斜線，由既有 `imageUrl` 支援子目錄部署。
2. 在 `images.ts` 新增 `type: "real"`、`placeholder: false` 的記錄，保留示意 ID。填入 `microscopeType`、`modality`（optical / fluorescence / sem / tem）及實際 `width` / `height`，避免載入位移。
3. 使用 `bi(...)` 填寫 `title`、`imageAlt`、`caption` 及 `observationClue`。描述孩子能看到的構造，不把不同樣品說成連續放大；不得杜撰比例尺。
4. `credit` 填入 `creator`、`source`、`sourceUrl`、`license`、適用的 `licenseUrl`、可選 `creatorUrl` 與雙語 `changes`。CC0 1.0 的全名為 CC0 1.0 Universal Public Domain Dedication。來源、作者與授權以 `images.ts` 為 UI 的唯一資料來源。
5. `realImageExamples[illustrationId].imageId` 指向新 ID。圖片下方的 `ImageAttribution` 常駐顯示作者、授權、來源；只有變更說明收合。CC BY 必須保留作者、可點選來源及授權連結；本次 NICHD 影像為 CC BY 2.0，並記錄 WebP 轉換／最佳化，不表示 NICHD 背書。
6. 全站「影像與製作說明」自動列出相同資料。Public Domain 與 CC0 也保留來源。
7. 真實照片顏色及標記不一定等同示意。三色照片的紅色是肌動蛋白細胞骨架，不能當作互動中的細胞邊界通道。
8. 檢查桌機、平板與手機直向的完整視野、雙語文字及連結換行，再執行既有測試、lint 與 build。

## v0.29 任務專用真實影像

`missionData.ts` 的 `mystery-light / glow / sem / tem` 分別使用 `mission-blood-real`、`mission-fluorescence-real`、`mission-pollen-real`、`mission-tem-real`。它們只使用 `public/images/microscopy/missions/*.webp`，原始 JPG/PNG 留在 `source_images/missions/`。不得改動課程的 `realImageExamples` 配對，也保留 `mission-target` 的配對示意圖。

- 四題以新影像的形狀、標記、表面或薄切片內部為線索；不沿用舊示意圖的點選熱點。
- 作答前的 alt/caption 描述可見內容，不直接說出血液、花粉或正確工具。解答揭露樣品；來源詳情仍可隨時存取原始標題。
- 在 `images.ts` 的既有 `credit` 記錄 `originalTitle`、`creator`、`sourceUrl`、`license`、`licenseUrl` 與雙語 `changes`。專業標記資訊用可選雙語 `credit.details`。
- 血液（Korinna）與螢光細胞（Howard Vindin）為 CC BY 4.0 International；花粉（Andel）為 CC0 1.0 Universal；TEM（Dartmouth Electron Microscope Facility, Dartmouth College）為 Public Domain worldwide。
- 任務使用 `compactAttribution`：原生 details 可鍵盤／觸控展開完整標題、作者、授權、來源與轉換紀錄。課程及全站 Credits 保留原有常駐短版來源。
- 共軛焦照片中微管為紅色、肌動蛋白為綠色、細胞核 DNA 為藍色；這些名稱只在來源詳情出現。不能套用課程照片的顏色對照。
- 真實影像保持完整視野，任務以 `object-fit: contain` 配合有高度上限的中性背景，避免裁切原有比例尺。
- `CONTENT_VERSION = 4`：A/B 從示意圖熱點改為方法判斷，舊版進度依既有驗證失效。未更改 reducer、storage schema 或導航。

## 編輯題目

`missionData.ts` 的 `caseQuestions` 為四組任務共 9 題，`finalQuestions` 是固定順序的三步案件。`gameData.ts` 的舊題庫保留作為 v0.1 內容參照，新任務不要加在舊檔。每個問題至少有：

- `id`：穩定且唯一；進度依賴它。
- `stage`、`type`：關卡及單選／複選。
- `title`、`question`、`choices`：標題、題幹與選項。
- `correctAnswer`：正解 ID 陣列；單選必須只有一個。
- `hint`、`strongHint`、`explanation`、`funFact`：第一次提示、第二次強提示、主要解說、選讀知識。
- `observation`：在神秘影像旁顯示的實驗記錄；`toolSelection` 表示直接點工具就判答。
- `image`、選項的 `image`：參照 `images.ts` 的 ID。
- `microscopeType`：該題證據筆記使用的工具圖示。

修改文字時保持中英成對，使用台灣用語「螢光」「粒線體」「明視野」。首次出現的生物詞彙需有線索。避免「答錯」「所有細胞肉眼都看不到」「螢光一定放得更大」「黑白一定是電子影像」等說法。

神秘影像的 `observation` 優先描述可見形狀與位置；SEM／TEM 的電子掃描／穿透記錄放在第二層 `strongHint`，第一層 `hint` 只引導比較。影像外觀只能支持推測，方法記錄用來確認；不能只憑顏色定論。

課程內容在 `academyData.ts`／`academyExtensions.ts`：模組包含 id、icon、title、opening、concept、clue、sendoff；只有 optical／electron 有可選的 `check`，包含 question、choices、answer 與逐選項 feedback。`AcademyModule` 負責操作後收藏，`ConceptReveal` 分派現有互動。保持六個 ID 不變可沿用 v0.22 收藏。短操作文案位於各互動元件，均提供繁中／英文。

## v0.24 探索互動維護

- `MagnifierLab` 預設果蠅，掃到 `observationData.ts` 的熱點才觸發發現，支援 pointer、方向鍵及按鈕。
- `StereoLab` 用同一果蠅圖比較倍率、裁切位置，不模擬雙眼立體成像。
- `ConceptReveal` 的光學對焦以 65 為示意焦點，容許 ±8；40×是數位放大示意，不是宣稱真實物鏡不增加解析度。
- `FluorescenceLab` 使用從原 `fluorescence-cell.svg` 拆出的 `channel-nuclei.svg` 與 `channel-mitochondria.svg`。兩檔共用 800×600 座標，背景透明，可正確疊合；原創圖形授權與原圖一致。替換時需使用對齊的同一標本通道並更新按鈕文字與替代描述，不以換色代替真實 channel。
- 電子兩種視圖分別為果蠅複眼與粒線體，明示不同樣品。使用「擅長／常用」，不可寫成 SEM／TEM 絕對只能看一種資訊。
- 四堂操作課程不加 quiz；光學與電子的短概念確認由 `ConceptCheck` 共用呈現。不因新確認而清除舊收藏。
- `ConceptReveal.onStep(n, complete)` 區分畫面切換與完成；`AcademyModule` 只在 complete 時開放收藏或概念確認。
- 解剖需看過高倍率後回低倍率；螢光需看過訊號後關閉適當照明。未完成操作不寫入 storage，重載從觀察起點開始。
- `investigationData.ts` 與固定 finalQuestions 配對，保存前次觀察、evidenceImage、evidenceTitle、evidence、preparation、nextQuestion。UI 依既有 completed 判斷能否揭露證據，無需新存檔 schema。
- `InvestigationEvidence` 共用於回饋與筆記本；`InvestigationSummary` 用於最後一次發現和徽章頁。修改映射時仍需確保前一步 evidenceImage 接到後一步 image。

## 驗證變更

```powershell
npm test
npm run lint
npm run build
npm run dev
```

素材測試已分流：illustration 保留原 SVG 的檔案與安全檢查；real 需本機檔案、雙語 alt／caption、作者、來源與授權。`realImageExamples` 的 ID 必須指向 type=real。不要刪除素材驗證。

變更題目集合或正解後，提高 `missionData.ts` 的 `CONTENT_VERSION`，避免舊進度與新題目不相容。最終題數若更改，請更新遊戲入口、階段介紹、README 的數量文案，並讓測試採新題數。


## v0.21 觀察工具擴充

- `academyData.ts` 維持原課程 ID，插入 `academyExtensions.ts` 的 `magnifier`、`stereo`。
- `observationData.ts` 保存練習題、工具、雙語互動說明與放大鏡熱點。
- 單選題的 `acceptedAnswers` 表示「其中一個即可」，不代表多選；`correctAnswer` 保留給協助完成使用。用 `answerExplanations` 為不同合理工具提供原因。
- 葉片與果蠅目前重用 4:3 原創 SVG。放大鏡使用同一張圖，沒有虛構新細節或真實倍率。更換素材時維持 4:3，並更新 0–1 座標的熱點、描述；解剖視野的裁切中心也須核對。
- 解剖顯微鏡屬於光學顯微鏡。並列工具名稱是教學探索順序，不是互斥技術分類或能力排名。

科學內容核對：[Nikon MicroscopyU — Introduction to Stereomicroscopy](https://www.microscopyu.com/techniques/stereomicroscopy/introduction-to-stereomicroscopy)，支持雙眼視角、立體感、較低倍率與較大視野的解說。

## v0.22 科學內容與正解維護

- 工具名稱 `optical` 對應「複式光學顯微鏡」；「解剖／螢光屬於光學顯微鏡」的大類敘述保留。不要全域取代大類名稱。
- `practice-whole` 只接受 `stereo`。現有 `acceptedAnswers` 沒有次佳等級；放大鏡可使用但非本題最佳工具，以提示說明。重試顯示 `hint`／`strongHint`，不是 `answerExplanations`。
- `practice-wing` 保留穩定 ID，但內容已改為戶外稍微放大葉脈，使用 `leaf` 圖，正解 `magnifier`。放大鏡互動仍保留果蠅作可選例子，並非禁止用放大鏡看果蠅。
- 尺度任務只問發現位置與大致輪廓，正解仍為一般動物細胞與單隻常見細菌。成體果蠅明確為肉眼可見。
- 肉眼課程知識卡承載核心句；電子課程知識卡與任務回饋說明特殊準備、通常不能直接觀察活動活體，不深入製備細節。
- `CONTENT_VERSION = 3`：舊內容進度依既有驗證機制失效，避免舊正解或完成紀錄跳過新教學；不更改 schema、儲存鍵或 reducer。
