# 微觀小偵探 — Project Brief

## 專案定位

* 用途：中研院 Open House／兒童科普日
* 對象：兒童、家長、一般非專業觀眾
* 類型：互動式科普網站
* 核心原則：**先想知道什麼，再選適合的觀察工具**
* 科學正確性優先於遊戲效果
* 避免「倍率越高越好」的誤導

## 使用情境

* 現場共用電腦
* QR Code 手機使用
* 必須支援桌機、平板、手機直式
* 不使用 hover-only interaction
* 不依賴聲音才能完成操作
* 不需要登入、帳號、後端或資料庫

## 部署

* GitHub Pages
* Production URL：`https://micro.weichenchu.com`
  The production site is hosted at the domain root `/`.
  Do not assume `/micro-detective/` as the production base path.

* 與 `https://weichenchu.com` 主網站分開
* 必須能以純 static site 運作
* 本機開發與 production deployment 都要正常
* 所有 assets、routing 與 links 必須相容 GitHub Pages

## 教育架構

網站主要分成：

### 🔬 偵探訓練所（v0.23）

由樣品與觀察需求帶入工具，以「看一看 → 動一動 → 發現 → 收進偵探筆記」探索，不以答題推進。入口只提供約 30 秒工具地圖：

* 肉眼
* 放大鏡
* 解剖顯微鏡
* 複式光學顯微鏡
* 螢光顯微鏡
* 電子顯微鏡

重點不是倍率，而是：

* 想看什麼
* 能看多細
* 需要什麼 contrast / signal
* 樣品是否適合該工具

### 小偵探任務

基本思考流程：

想知道什麼
→ 判斷需要觀察的尺度或特徵
→ 選擇工具
→ 觀察結果
→ 理解為什麼這個工具適合

任務重點是推理，不是猜答案。

## UI / UX

* 適合兒童，但不要過度幼兒化
* 保留科學感
* 文字簡短、視覺清楚
* 優先使用 cards、圖像與明確 CTA
* 觸控區域要足夠大
* 避免複雜導航
* 避免過度動畫與裝飾
* 顏色不可作為唯一資訊來源

## 工具呈現

* 工具不要人格化
* 不讓顯微鏡變成會說話或有個性的角色
* 可使用 icon、插圖、實際影像與尺度比較
* 工具應維持「科學觀察工具」的定位

## 科學內容

* 可以簡化術語，但不可犧牲核心概念
* 不為了遊戲效果創造錯誤科學規則
* 特別避免：

  * 倍率越高越好
  * 電子顯微鏡一定最好
  * 所有樣品都適合同一種工具

## 圖片與素材

正式內容優先使用：

* 自有影像
* CC0
* CC BY
* Wikimedia Commons
* 授權明確的公開 bioimage database

外部素材必須保留來源與授權資訊。

## 程式修改原則

* 優先重用既有 component
* 優先小幅修改與 incremental development
* 不隨意重構
* 不任意更換 framework
* 不為單一功能加入大型 dependency
* 不修改與目前任務無關的程式碼

新增功能優先順序：

1. 使用既有 component
2. 擴充既有 component
3. 新增小型 reusable component
4. 必要時才進行 architecture refactor

## Codex 工作原則

每次修改前：

1. 先閱讀 `PROJECT_BRIEF.md`
2. 檢查目前 repository 結構
3. 理解既有 component
4. 採用最小必要修改

修改後確認：

* desktop
* mobile portrait
* touch interaction
* GitHub Pages build
* asset / routing 是否正常
* 既有功能沒有 regression

除非 prompt 明確要求，不進行 unrelated refactor。

## 最終判斷原則

若有衝突：

**教育正確性 > 遊戲效果**

**適合觀察問題的工具 > 單純高倍率**

**小幅、安全修改 > 大型重構**

**手機與桌機皆可完成核心流程**
