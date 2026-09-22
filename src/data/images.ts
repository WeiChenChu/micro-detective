import { bi, type ImageData, type MicroscopeType, type Text } from "./types";

// Keep illustrations; add real images with their captions and provenance together.
const illustration = (
  id: string,
  folder: string,
  title: Text,
  imageAlt: Text,
  caption: Text,
  microscopeType: MicroscopeType,
): ImageData => ({
  id,
  src: `images/${folder}/${id}.svg`,
  title,
  imageAlt,
  caption,
  microscopeType,
  placeholder: true,
  type: "illustration",
  credit: {
    creator: "Microscopic Detective project",
    license: "Original project illustration",
  },
});

export const images: Record<string, ImageData> = {
  "mission-blood-real": {
    id: "mission-blood-real", src: "images/microscopy/missions/optical-blood-cells.webp",
    type: "real", placeholder: false, microscopeType: "optical", modality: "optical",
    width: 1280, height: 960,
    title: bi("許多圓形細胞", "Many round cells"),
    imageAlt: bi("真實顯微影像中有許多圓形細胞，散布在明亮的背景上。", "A real micrograph with many round cells scattered across a bright background."),
    caption: bi("看看這些圓形細胞的外形與分布。", "Look at the shapes and distribution of these round cells."),
    credit: {
      originalTitle: "Blood cells under the microscope 01", creator: "Korinna", source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Blood_cells_under_the_microscope_01.jpg",
      license: "CC BY 4.0 International",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      changes: bi("已縮小並轉換為 WebP，供網頁使用。", "Resized and converted to WebP for web use."),
    },
  },
  "mission-fluorescence-real": {
    id: "mission-fluorescence-real", src: "images/microscopy/missions/fluorescence-osteosarcoma-cells.webp",
    type: "real", placeholder: false, microscopeType: "fluorescence", modality: "fluorescence",
    width: 1280, height: 1257,
    title: bi("不同顏色的細胞線索", "Cell clues in different colors"),
    imageAlt: bi("真實顯微影像中，深色背景上有紅綠色細絲與藍色橢圓區域，呈現不同細胞構造。", "A real micrograph showing different cell structures as red and green filaments and blue oval regions against a dark background."),
    caption: bi("不同顏色代表研究人員標記的不同細胞構造。", "Different colors show different cell structures labeled by researchers."),
    credit: {
      originalTitle: "Osteosarcoma cells stained for actin, microtubules, and nuclei", creator: "Howard Vindin", source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Osteosarcoma_cells_stained_for_actin,_microtubules,_and_nuclei.png",
      license: "CC BY 4.0 International",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      changes: bi("已縮小並轉換為 WebP，供網頁使用。", "Resized and converted to WebP for web use."),
      details: bi("共軛焦螢光影像。微管：紅色；肌動蛋白：綠色；細胞核 DNA：藍色。", "Confocal fluorescence image. Microtubules: red; actin: green; nuclear DNA: blue."),
    },
  },
  "mission-pollen-real": {
    id: "mission-pollen-real", src: "images/microscopy/missions/sem-tradescantia-pollen.webp",
    type: "real", placeholder: false, microscopeType: "electron", modality: "sem",
    width: 1280, height: 1360,
    title: bi("神秘小顆粒的表面", "Surfaces of mysterious particles"),
    imageAlt: bi("真實顯微影像中有數顆長圓形小顆粒，表面可見凹凸紋路與溝槽。", "A real micrograph of several elongated particles with textured surfaces and grooves."),
    caption: bi("沿著小顆粒的表面，找找凹凸和紋路。", "Follow the particles’ surfaces and look for bumps and patterns."),
    credit: {
      originalTitle: "SEM Tradescantia spathacea pollen 0009", creator: "Andel", source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:SEM_Tradescantia_spathacea_pollen_0009.jpg",
      license: "CC0 1.0 Universal",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      changes: bi("已縮小並轉換為 WebP，供網頁使用。", "Resized and converted to WebP for web use."),
    },
  },
  "mission-tem-real": {
    id: "mission-tem-real", src: "images/microscopy/missions/tem-chlamydomonas.webp",
    type: "real", placeholder: false, microscopeType: "electron", modality: "tem",
    width: 1280, height: 1023,
    title: bi("細胞裡的細微構造", "Fine structures inside a cell"),
    imageAlt: bi("真實顯微影像呈現一個細胞的切面，內部可見細密線條、深色區域與較亮的空間。", "A real micrograph of a cell section showing fine internal lines, dark regions and lighter spaces."),
    caption: bi("看看細胞裡不同區域的細密線條。", "Look at the fine lines in different regions inside the cell."),
    credit: {
      originalTitle: "Chlamydomonas TEM 04", creator: "Dartmouth Electron Microscope Facility, Dartmouth College", source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Chlamydomonas_TEM_04.jpg",
      license: "Public Domain worldwide",

      changes: bi("已縮小並轉換為 WebP，供網頁使用。", "Resized and converted to WebP for web use."),
    },
  },
  "onion-real": {
    id: "onion-real", src: "images/microscopy/optical/onion_epidermis.webp",
    type: "real", placeholder: false, microscopeType: "optical", modality: "optical",
    width: 1280, height: 722,
    title: bi("真正的洋蔥表皮", "Real onion epidermis"),
    imageAlt: bi("光學顯微鏡下的洋蔥表皮，可以看到許多相鄰的細胞與清楚的細胞壁。", "Onion epidermal cells under a light microscope, showing many adjacent cells with clearly visible cell walls."),
    caption: bi("真正的洋蔥表皮光學顯微影像。找找看，哪些構造和剛才的示意圖很像？", "A real light-microscope image of onion epidermal cells. Can you find structures that look similar to the illustration?"),
    observationClue: bi("沿著細胞壁找找看：相鄰的細胞像不像一格格拼在一起？", "Follow the cell walls: can you find adjacent cells fitting together?"),
    credit: {
      creator: "Berkshire Community College Bioscience Image Library", source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Living_cells_of_onion_epidermis_(33605021164).jpg",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      changes: bi("已轉換為 WebP，並針對網頁顯示最佳化。", "Converted to WebP / optimized for web display."),
    },
  },
  "fluorescence-real": {
    id: "fluorescence-real", src: "images/microscopy/fluorescence/Cells_FL_mitochondria_cytoskeleton_nuclei.webp",
    type: "real", placeholder: false, microscopeType: "fluorescence", modality: "fluorescence",
    width: 1920, height: 2117,
    title: bi("真正的三色螢光細胞", "Real three-color fluorescent cells"),
    imageAlt: bi("螢光顯微影像中的細胞，細胞核呈藍色、粒線體呈綠色、肌動蛋白細胞骨架呈紅色。", "Fluorescence microscopy image showing nuclei in blue, mitochondria in green, and the actin cytoskeleton in red."),
    caption: bi("螢光標記可以讓不同的細胞構造發出不同顏色的光。這張影像中，細胞核是藍色、粒線體是綠色、肌動蛋白細胞骨架是紅色。", "Fluorescent labels highlight different structures in different colors. Here, nuclei are blue, mitochondria are green, and the actin cytoskeleton is red."),
    observationClue: bi("找找藍色細胞核旁的綠色粒線體。這張圖的紅色是細胞骨架，不是剛才示意圖的細胞邊界；顏色也不必和示意圖相同。", "Find green mitochondria near blue nuclei. Red here marks the cytoskeleton, not the cell boundaries in the diagram; colors can differ between images."),
    credit: {
      creator: "NICHD", source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cells_with_nuclei_in_blue,_mitochondria_in_green,_and_the_actin_cytoskeleton_in_red_(19124186316).jpg",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      creatorUrl: "https://www.nichd.nih.gov/",
      changes: bi("已轉換為 WebP，並針對網頁顯示最佳化。", "Converted to WebP / optimized for web display."),
    },
  },
  "sem-eye-real": {
    id: "sem-eye-real", src: "images/microscopy/sem/Drosophilida-compound-eye-sem.webp",
    type: "real", placeholder: false, microscopeType: "electron", modality: "sem",
    width: 1600, height: 1278,
    title: bi("真正的果蠅複眼", "Real fruit fly compound eye"),
    imageAlt: bi("掃描式電子顯微鏡下的果蠅複眼，可以看到許多排列整齊的小眼結構。", "A fruit fly compound eye viewed with a scanning electron microscope, showing many regularly arranged ommatidia."),
    caption: bi("掃描式電子顯微鏡（SEM）可以清楚呈現樣品表面的立體細節。果蠅的複眼其實由許多小眼組成。", "A scanning electron microscope (SEM) reveals detailed surface structures. A fruit fly compound eye is made of many small visual units."),
    observationClue: bi("找找重複排列的小面，以及小面之間的細毛。", "Look for repeating facets and the fine hairs between them."),
    credit: {
      creator: "Louisa Howard / Dartmouth College; retouched by Papa Lima Whiskey", source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Drosophilidae_compound_eye_edit1.jpg",
      license: "Public Domain",
      changes: bi("已轉換為 WebP，並針對網頁顯示最佳化。", "Converted to WebP / optimized for web display."),
    },
  },
  "tem-mitochondrion-real": {
    id: "tem-mitochondrion-real", src: "images/microscopy/tem/mitochondrion-tem.webp",
    type: "real", placeholder: false, microscopeType: "electron", modality: "tem",
    width: 640, height: 433,
    title: bi("真正的粒線體", "A real mitochondrion"),
    imageAlt: bi("穿透式電子顯微鏡下的哺乳類細胞粒線體，可以看到粒線體內部的膜狀結構。", "A mitochondrion in mammalian tissue viewed by transmission electron microscopy, showing internal membrane structures."),
    caption: bi("穿透式電子顯微鏡（TEM）讓我們觀察非常薄的樣品切片，看見細胞內部的微細構造。", "A transmission electron microscope (TEM) uses very thin specimens to reveal fine structures inside cells."),
    observationClue: bi("找找粒線體裡一道道的膜，和示意圖中的皺摺比較看看。", "Find the membranes inside the mitochondrion and compare them with the folds in the diagram."),
    credit: {
      creator: "Louisa Howard", source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mitochondria,_mammalian_lung_-_TEM_(2).jpg",
      license: "Public Domain",
      changes: bi("已轉換為 WebP，並針對網頁顯示最佳化。", "Converted to WebP / optimized for web display."),
    },
  },
  leaf: illustration(
    "leaf",
    "naked-eye",
    bi("葉片", "Leaf"),
    bi(
      "綠色葉片，有清楚的輪廓與分支葉脈。",
      "A green leaf with a clear outline and branching veins.",
    ),
    bi(
      "肉眼可以看見葉片的整體外形；細胞需要進一步觀察。",
      "Our eyes show the whole leaf; its cells need closer observation.",
    ),
    "naked-eye",
  ),
  "fruit-fly-outline": illustration(
    "fruit-fly-outline", "naked-eye", bi("成體果蠅", "Adult fruit fly"),
    bi("簡化的成體果蠅：頭、身體、翅膀與腳，沒有細小翅脈。", "Simplified adult fly: head, body, wings and legs, without fine wing veins."),
    bi("手持放大鏡讓較大的外部構造更容易辨認。", "A hand lens makes larger external structures easier to recognize."), "magnifier",
  ),
  "fruit-fly": illustration(
    "fruit-fly",
    "naked-eye",
    bi("成體果蠅", "Adult fruit fly"),
    bi(
      "有透明翅膀與六隻腳的小型昆蟲。",
      "A small insect with transparent wings and six legs.",
    ),
    bi(
      "成體果蠅很小，但肉眼就能看出大概的樣子；仔細觀察頭、胸、腹與翅膀，解剖顯微鏡更適合。",
      "An adult fruit fly’s rough outline is visible to our eyes; a stereomicroscope better suits a close view of its head, thorax, abdomen and wings.",
    ),
    "naked-eye",
  ),
  zebrafish: illustration(
    "zebrafish",
    "naked-eye",
    bi("成體斑馬魚", "Adult zebrafish"),
    bi(
      "流線形魚身，有魚鰭和沿著身體延伸的條紋。",
      "A streamlined fish with fins and stripes along its body.",
    ),
    bi(
      "斑馬魚身上的條紋，肉眼就能看見。",
      "The stripes on an adult zebrafish are visible to our eyes.",
    ),
    "naked-eye",
  ),
  "animal-cell": illustration(
    "animal-cell",
    "optical",
    bi("一般動物細胞", "Typical animal cell"),
    bi(
      "放大的概念圖：圓潤邊界內有細胞核與其他小構造。",
      "An enlarged concept diagram: a nucleus and smaller structures inside a rounded boundary.",
    ),
    bi(
      "一般動物細胞通常很小；這張示意圖已經放大。",
      "Typical animal cells are very small; this illustration is enlarged.",
    ),
    "optical",
  ),
  bacterium: illustration(
    "bacterium",
    "optical",
    bi("單隻常見細菌", "Typical single bacterium"),
    bi(
      "放大的概念圖：長圓形身體，內有彎曲線條，外有細絲。",
      "An enlarged concept diagram: a capsule-shaped body with curved lines inside and thin strands outside.",
    ),
    bi(
      "細菌也是細胞，但沒有由膜包圍的細胞核。",
      "Bacteria are cells too, but do not have a membrane-bound nucleus.",
    ),
    "optical",
  ),
  "optical-onion": illustration(
    "optical-onion",
    "optical",
    bi("洋蔥表皮", "Onion skin"),
    bi(
      "一格格相鄰的多邊形細胞，裡面有較深的小橢圓。",
      "Adjacent polygonal cells, each containing a darker small oval.",
    ),
    bi(
      "明視野染色示意：細胞壁形成邊界，染色讓細胞核更清楚。",
      "Brightfield staining diagram: cell walls form boundaries; staining makes nuclei clearer.",
    ),
    "optical",
  ),
  "fluorescence-cell": illustration(
    "fluorescence-cell",
    "fluorescence",
    bi("發光的細胞線索", "Glowing cell clues"),
    bi(
      "深色背景上，有短絲狀的綠色訊號和較大的藍紫色區域。",
      "Short green filament-like signals and larger blue-violet regions on a dark background.",
    ),
    bi(
      "這張示意圖裡，綠色短絲代表標記的粒線體，藍紫色圓形代表細胞核。圖中的顏色不一定是天然顏色。",
      "In this diagram, green filaments represent labeled mitochondria and blue-violet circles represent nuclei. Image colors are not necessarily natural colors.",
    ),
    "fluorescence",
  ),
  "cell-unmarked": illustration(
    "cell-unmarked",
    "fluorescence",
    bi("尚未標記的細胞", "Unlabeled cells"),
    bi(
      "淡灰藍色細胞內，可見圓形區域與細小曲線。",
      "Pale blue-gray cells with rounded regions and faint curves.",
    ),
    bi(
      "與發光示意圖使用相同構圖，幫助比較標記效果。",
      "The composition matches the glowing diagram to help compare the effect of labels.",
    ),
    "fluorescence",
  ),
  "electron-surface": illustration(
    "electron-surface",
    "electron",
    bi("果蠅複眼表面", "Fruit fly eye surface"),
    bi(
      "灰階弧面有許多重複的小面與細毛。",
      "A curved gray surface with repeating small facets and fine hairs.",
    ),
    bi(
      "SEM（掃描式電子顯微鏡）概念圖：電子顯微鏡可觀察昆蟲眼睛的表面細節。",
      "SEM（掃描式電子顯微鏡） concept diagram: electron microscopy can reveal details on an insect eye surface.",
    ),
    "electron",
  ),
  "electron-mitochondrion": illustration(
    "electron-mitochondrion",
    "electron",
    bi("粒線體的內部", "Inside a mitochondrion"),
    bi(
      "灰階長橢圓構造，有雙層外緣和多道內部皺摺。",
      "An elongated gray structure with a double outline and many internal folds.",
    ),
    bi(
      "TEM（穿透式電子顯微鏡）概念圖：薄樣品中可見粒線體內膜的皺摺。",
      "TEM（穿透式電子顯微鏡） concept diagram: folds of the inner mitochondrial membrane in a thin sample.",
    ),
    "electron",
  ),
};

// Keep illustrations. Add a separately reviewed real-image ID to activate each example.
// Files belong in public/images/microscopy/; empty slots never request a missing URL.
export const realImageExamples: Record<string, { title: Text; imageId?: string }> = {
  "optical-onion": { imageId: "onion-real", title: bi("真正的細胞影像", "Real cell images") },
  "fluorescence-cell": { imageId: "fluorescence-real", title: bi("真正的螢光影像", "Real fluorescence images") },
  "electron-surface": { imageId: "sem-eye-real", title: bi("真正的 SEM（掃描式電子顯微鏡）影像", "Real SEM（掃描式電子顯微鏡） images") },
  "electron-mitochondrion": { imageId: "tem-mitochondrion-real", title: bi("真正的 TEM（穿透式電子顯微鏡）影像", "Real TEM（穿透式電子顯微鏡） images") },
};

// Keeps public images working when the static site is hosted in a subdirectory.
export const imageUrl = (image: ImageData) =>
  `${import.meta.env.BASE_URL}${image.src}`;
