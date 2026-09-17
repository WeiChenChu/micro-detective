# 編輯題庫與替換顯微影像

## 圖片 ID 對照

| ID                       | 檔案（位於 public/images/）           | 使用位置                         |
| ------------------------ | ------------------------------------- | -------------------------------- |
| `leaf`                   | `naked-eye/leaf.svg`                  | 放大鏡互動、葉脈選工具練習 |
| `fruit-fly`              | `naked-eye/fruit-fly.svg`             | 肉眼、放大鏡、解剖顯微鏡、選工具練習 |
| `zebrafish`              | `naked-eye/zebrafish.svg`             | 尺度任務、成魚游動                   |
| `animal-cell`            | `optical/animal-cell.svg`             | 尺度任務、細胞概念圖             |
| `bacterium`              | `optical/bacterium.svg`               | 尺度任務             |
| `optical-onion`          | `optical/optical-onion.svg`           | 複式光學顯微鏡課程、神秘影像 A       |
| `fluorescence-cell`      | `fluorescence/fluorescence-cell.svg`  | 螢光圖層來源、找目標、神秘影像 B |
| `cell-unmarked`          | `fluorescence/cell-unmarked.svg`      | 一般細胞輪廓示意、Final Case 第一份證據                     |
| `electron-mitochondrion` | `electron/electron-mitochondrion.svg` | 電子課程、神秘影像 D       |
| `electron-surface`       | `electron/electron-surface.svg`       | 電子探索與神秘影像 C    |

`microscopeType` 表示這份教學素材的預定觀察分類，並非該生物只能被該工具觀察。細胞／細菌概念圖的細節不代表一般光學照片一定能看見全部構造。

## 保留示意圖並新增真實影像

假設有自己拍攝、可供此活動使用的洋蔥明視野影像：

1. 儲存為 `public/images/microscopy/onion-real.webp`，先人工確認授權與科學圖說。
2. 保留 `optical-onion` 示意，新增獨立的 `onion-real` 記錄。下列只是未啟用的格式範例；作者與描述應依實際來源修改。

```ts
'onion-real': {
  id: 'onion-real',
  src: 'images/microscopy/onion-real.webp',
  type: 'real',
  title: bi('洋蔥表皮', 'Onion skin'),
  imageAlt: bi('相鄰細胞有清楚邊界，部分內有深色橢圓。',
               'Adjacent cells have clear boundaries; some contain dark ovals.'),
  caption: bi('洋蔥表皮明視野影像。', 'Brightfield image of onion skin.'),
  microscopeType: 'optical',
  placeholder: false,
  credit: {
    creator: '填入實際作者／設施',
    source: '填入來源資料庫或設施',
    license: '填入實際授權或使用許可',
    // sourceUrl: '實際原始來源網址',
    // licenseUrl: '實際授權網址',
    // changes: '若曾裁切、調色或加標記，描述變更',
  },
},
```

正式授權影像不應冒用此範例文字。CC BY 需保留實際作者、來源、授權及變更說明。真實影像附近的展開面板會呈現這些欄位。請提供可追溯的來源網址（設施自有影像可連到公開來源說明），不要填入杜撰的網址。

3. 在 `realImageExamples["optical-onion"].imageId` 設為 `"onion-real"`。這只啟用課程的示意→真實影像區塊，不改掉互動原圖。未設定時顯示待補提示，不載入任何假路徑。確認真實樣品與配對示意的教學目標相符。
4. 螢光圖若不是「細胞核＋粒線體」標記，需一併調整圖層、channel 按鈕與圖說、相關任務與相依趣味知識。不要讓綠色＝粒線體成為固定科學規則。
5. `cell-unmarked` 與 `fluorescence-cell` 為一組比較：更換時使用對應標本或明確說明只是概念示意。
6. 保留合理解析度與原始比例；建議素材最長邊約 1200–1600 px，按用途壓縮。不要以壓縮破壞要觀察的微小特徵。
7. 如果需要比例尺，採用原圖內已正確校準的比例尺。不要憑放大倍率或畫面大小重新畫數值比例尺。

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
