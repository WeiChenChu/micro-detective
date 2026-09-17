import { bi, type ImageData, type MicroscopeType, type Text } from "./types";

// Replace src, alt, caption and credit together when introducing a real image.
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
  "optical-onion": { title: bi("真正的細胞影像", "Real cell images") },
  "fluorescence-cell": { title: bi("真正的螢光影像", "Real fluorescence images") },
  "electron-surface": { title: bi("真正的 SEM（掃描式電子顯微鏡）影像", "Real SEM（掃描式電子顯微鏡） images") },
  "electron-mitochondrion": { title: bi("真正的 TEM（穿透式電子顯微鏡）影像", "Real TEM（穿透式電子顯微鏡） images") },
};

// Keeps public images working when the static site is hosted in a subdirectory.
export const imageUrl = (image: ImageData) =>
  `${import.meta.env.BASE_URL}${image.src}`;
