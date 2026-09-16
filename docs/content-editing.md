# 編輯題庫與替換顯微影像

## 圖片 ID 對照

| ID                       | 檔案（位於 public/images/）           | 使用位置                         |
| ------------------------ | ------------------------------------- | -------------------------------- |
| `leaf`                   | `naked-eye/leaf.svg`                  | 放大鏡互動、葉脈選工具練習 |
| `fruit-fly`              | `naked-eye/fruit-fly.svg`             | 肉眼、放大鏡、解剖顯微鏡、選工具練習 |
| `zebrafish`              | `naked-eye/zebrafish.svg`             | 尺度課程、尺度任務、成魚游動                   |
| `animal-cell`            | `optical/animal-cell.svg`             | 尺度課程／任務、電子課程的概念圖             |
| `bacterium`              | `optical/bacterium.svg`               | 尺度課程與尺度任務             |
| `optical-onion`          | `optical/optical-onion.svg`           | 複式光學顯微鏡課程、神秘影像 A       |
| `fluorescence-cell`      | `fluorescence/fluorescence-cell.svg`  | 螢光課程、找目標、神秘影像 B |
| `cell-unmarked`          | `fluorescence/cell-unmarked.svg`      | 螢光步驟 1–3                     |
| `electron-mitochondrion` | `electron/electron-mitochondrion.svg` | 電子課程、神秘影像 D       |
| `electron-surface`       | `electron/electron-surface.svg`       | 首頁與神秘影像 C 必答題    |

`microscopeType` 表示這份教學素材的預定觀察分類，並非該生物只能被該工具觀察。細胞／細菌概念圖的細節不代表一般光學照片一定能看見全部構造。

## 替換範例

假設有自己拍攝、可供此活動使用的洋蔥明視野影像：

1. 儲存為 `public/images/optical/onion-real.webp`。
2. 將 `images.ts` 的 `optical-onion` 記錄替換成類似下列內容。範例作者與描述應依實際來源修改。

```ts
'optical-onion': {
  id: 'optical-onion',
  src: 'images/optical/onion-real.webp',
  title: bi('洋蔥表皮', 'Onion skin'),
  imageAlt: bi('相鄰細胞有清楚邊界，部分內有深色橢圓。',
               'Adjacent cells have clear boundaries; some contain dark ovals.'),
  caption: bi('洋蔥表皮明視野影像。', 'Brightfield image of onion skin.'),
  microscopeType: 'optical',
  placeholder: false,
  credit: {
    creator: '填入實際作者／設施',
    license: '填入實際授權或使用許可',
    // sourceUrl: '實際原始來源網址',
    // licenseUrl: '實際授權網址',
    // changes: '若曾裁切、調色或加標記，描述變更',
  },
},
```

正式授權影像不應冒用此範例文字。CC BY 需保留實際作者、來源、授權及變更說明。圖片來源面板會呈現這些欄位；沒有來源網址的設施自有影像也可以使用。

3. 在 `academyData.ts`、`missionData.ts` 和共用螢光步驟 `gameData.ts` 搜尋 `optical-onion`，確認選項、解說、最終觀察線索仍然成立。
4. 螢光圖若不是「細胞核＋粒線體」標記，需一併調整圖說、四步驟的說明與相依趣味知識。不要讓綠色＝粒線體成為固定科學規則。
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

神秘影像的 `observation` 直接呈現可見證據與方法記錄，搭配選項判斷；不能只憑顏色猜工具。最終案件固定依研究問題選工具，不再隨機洗牌。

課程內容在 `academyData.ts`：一個模組包含 opening、concept、clue、question、choices、answer、feedback、hint、strongHint、sendoff。互動呈現在 ConceptReveal，文案仍放資料檔。新增課程前須同步調整收藏驗證與固定四張卡的 UI。

## 驗證變更

```powershell
npm test
npm run build
npm run dev
```

目前素材測試包含 v0.1 的「原創 SVG 佔位圖」條件。首次加入真實照片時，把該測試改為：檔案存在、影像格式可用、雙語 alt 完整、非佔位圖有授權資訊。不要刪除所有素材驗證。

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
- 尺度任務只問發現位置與大致輪廓，正解仍為一般動物細胞與單隻常見細菌。成果蠅明確為肉眼可見。
- 肉眼課程知識卡承載核心句；電子課程知識卡與任務回饋說明特殊準備、通常不能直接觀察活動活體，不深入製備細節。
- `CONTENT_VERSION = 3`：舊內容進度依既有驗證機制失效，避免舊正解或完成紀錄跳過新教學；不更改 schema、儲存鍵或 reducer。
