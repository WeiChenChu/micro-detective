import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AcademyHome } from "../src/components/AcademyHome";
import { academyModules } from "../src/data/academyData";
import { academyChallenges } from "../src/data/academyFlow";
import { fluorescenceViews, fluorescenceComplete } from "../src/data/fluorescenceData";
import { caseQuestions, finalQuestions } from "../src/data/missionData";

test("first-time Academy has one start route; completed Academy offers six-tool recap and missions", () => {
  const props = { locale: "zh-TW" as const, onModule() {}, onMissions() {}, onNotebook() {} };
  const first = renderToStaticMarkup(createElement(AcademyHome, { ...props, completed: [] }));
  assert.equal((first.match(/<button/g) ?? []).length, 1);
  assert.match(first, /開始訓練/);
  assert.doesNotMatch(first, /30 秒工具地圖|你會選哪一種工具|<img/);
  const done = renderToStaticMarkup(createElement(AcademyHome, { ...props, completed: academyModules.map(m => m.id) }));
  assert.equal((done.match(/<img/g) ?? []).length, 6);
  assert.match(done, /不是放得越大越好/);
  assert.match(done, /先想找什麼線索，再選適合的工具/);
  assert.ok(done.indexOf("🕵️ 開始小偵探任務") < done.indexOf("📖 翻翻我的偵探筆記本"));
});

test("guided fluorescence reaches three distinct structures and merge without any off view", () => {
  const viewed = new Set<string>();
  fluorescenceViews.forEach((signals, step) => {
    signals.forEach(id => viewed.add(id));
    if (fluorescenceComplete(step)) {
      assert.deepEqual([...viewed].sort(), ["boundary", "mitochondria", "nuclei"]);
      assert.equal(signals.length, 3);
    } else if (step > 0) assert.equal(signals.length, 1);
  });
  assert.equal(fluorescenceViews.length, 5); // ordinary + 3 signals + merge
  assert.equal(fluorescenceComplete(4), true);
});

test("mitochondria stay inside each boundary and outside its nucleus in aligned SVG layers", () => {
  const boundary = readFileSync("public/images/fluorescence/channel-boundary.svg", "utf8");
  const nuclei = readFileSync("public/images/fluorescence/channel-nuclei.svg", "utf8");
  const mito = readFileSync("public/images/fluorescence/channel-mitochondria.svg", "utf8");
  const groups = [...boundary.matchAll(/<g transform="translate\(([^)]+)\)">\s*<ellipse rx="(\d+)" ry="(\d+)"/g)];
  assert.equal(groups.length, 3);
  for (const [, center, rx, ry] of groups) {
    const n = nuclei.split(`translate(${center})`)[1].split("</g>")[0];
    const [, nx, ny] = n.match(/rx="(\d+)" ry="(\d+)"/)!;
    const region = mito.split(`translate(${center})`)[1].split("</g>")[0];
    const rods = [...region.matchAll(/d="M(-?\d+) (-?\d+)l(-?\d+) (-?\d+)"/g)];
    assert.ok(rods.length >= 3);
    for (const [, sx, sy, dx, dy] of rods) for (let fraction = 0; fraction <= 1; fraction += 0.1) {
      const x = Number(sx) + Number(dx) * fraction;
      const y = Number(sy) + Number(dy) * fraction;
      assert.ok((x / (Number(rx) - 5)) ** 2 + (y / (Number(ry) - 5)) ** 2 < 1);
      assert.ok((x / (Number(nx) + 5)) ** 2 + (y / (Number(ny) + 5)) ** 2 > 1);
    }
  }
});

test("image evidence decisions have reachable answers, separated mobile targets and stable mission IDs", () => {
  for (const q of caseQuestions.filter(q => q.evidenceTargets)) {
    assert.ok(q.evidenceTargets!.some(t => q.correctAnswer.includes(t.choiceId)));
    for (const a of q.evidenceTargets!) {
      assert.ok(q.choices.some(c => c.id === a.choiceId));
      assert.ok(a.x > 10 && a.x < 90 && a.y > 10 && a.y < 90);
      for (const b of q.evidenceTargets!) if (a !== b) {
        // At a narrow 264px image, 44px-wide touch targets must not overlap.
        assert.ok(Math.abs(a.x - b.x) * 2.64 >= 44 || Math.abs(a.y - b.y) * 1.98 >= 48);
      }
    }
  }
  assert.deepEqual(caseQuestions.find(q => q.id === "tools-fish")!.correctAnswer, ["naked-eye"]);
  assert.match(finalQuestions[2].observation!["zh-TW"], /另外準備適合電子顯微鏡的樣品/);
  for (const challenge of Object.values(academyChallenges)) assert.ok(challenge.choices.some(c => c.id === challenge.answer));
});
