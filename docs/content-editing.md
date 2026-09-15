# 編輯題庫與替換顯微影像

## 圖片 ID 對照

| ID                       | 檔案（位於 public/images/）           | 使用位置                         |
| ------------------------ | ------------------------------------- | -------------------------------- |
| `leaf`                   | `naked-eye/leaf.svg`                  | 肉眼、電子比較、最終挑戰         |
| `fruit-fly`              | `naked-eye/fruit-fly.svg`             | 肉眼                             |
| `zebrafish`              | `naked-eye/zebrafish.svg`             | 肉眼、最終挑戰                   |
| `animal-cell`            | `optical/animal-cell.svg`             | 肉眼題的放大細胞示意             |
| `bacterium`              | `optical/bacterium.svg`               | 肉眼題的放大細菌示意             |
| `optical-onion`          | `optical/optical-onion.svg`           | 明視野、電子比較、最終挑戰       |
| `fluorescence-cell`      | `fluorescence/fluorescence-cell.svg`  | 明視野比較、螢光步驟 4、最終挑戰 |
| `cell-unmarked`          | `fluorescence/cell-unmarked.svg`      | 螢光步驟 1–3                     |
| `electron-mitochondrion` | `electron/electron-mitochondrion.svg` | 明視野比較、電子、最終挑戰       |
| `electron-surface`       | `electron/electron-surface.svg`       | 預備 SEM 素材，尚未作為必答題    |

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

3. 在 `gameData.ts` 搜尋 `optical-onion`，確認選項、解說、最終觀察線索仍然成立。
4. 螢光圖若不是「細胞核＋粒線體」標記，需一併調整圖說、四步驟的說明與相依趣味知識。不要讓綠色＝粒線體成為固定科學規則。
5. `cell-unmarked` 與 `fluorescence-cell` 為一組比較：更換時使用對應標本或明確說明只是概念示意。
6. 保留合理解析度與原始比例；建議素材最長邊約 1200–1600 px，按用途壓縮。不要以壓縮破壞要觀察的微小特徵。
7. 如果需要比例尺，採用原圖內已正確校準的比例尺。不要憑放大倍率或畫面大小重新畫數值比例尺。

## 編輯題目

`caseQuestions` 是四個教學案件；`finalQuestions` 是最終五份檔案。每個問題至少有：

- `id`：穩定且唯一；進度依賴它。
- `stage`、`type`：關卡及單選／複選。
- `title`、`question`、`choices`：標題、題幹與選項。
- `correctAnswer`：正解 ID 陣列；單選必須只有一個。
- `hint`、`explanation`、`funFact`：提示、主要解說、選讀趣味知識。
- `image`、選項的 `image`：參照 `images.ts` 的 ID。
- `microscopeType`：該題證據筆記使用的工具圖示。

修改文字時保持中英成對，使用台灣用語「螢光」「粒線體」「明視野」。首次出現的生物詞彙需有線索。避免「答錯」「所有細胞肉眼都看不到」「螢光一定放得更大」「黑白一定是電子影像」等說法。

最終題的 `hint` 會直接作為可見觀察線索。這是教育設計：讓孩子按方法做判斷，不要求只憑照片顏色猜答案。

## 驗證變更

```powershell
npm test
npm run build
npm run dev
```

目前素材測試包含 v0.1 的「原創 SVG 佔位圖」條件。首次加入真實照片時，把該測試改為：檔案存在、影像格式可用、雙語 alt 完整、非佔位圖有授權資訊。不要刪除所有素材驗證。

變更題目集合或正解後，提高 `CONTENT_VERSION`，避免舊進度與新題目不相容。最終題數若更改，請更新遊戲入口、階段介紹、README 的數量文案，並讓測試採新題數。
