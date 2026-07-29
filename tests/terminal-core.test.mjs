import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Core = require("../js/terminal-core.js");

const text = (line) => line.map((s) => s.text).join("");
const allText = (res) => res.lines.map(text).join("\n");

test("help lists commands and hides easter eggs", () => {
  const out = allText(Core.run("help"));
  for (const cmd of ["whoami", "projects", "blog", "open <slug>", "cd <page>", "cat <file>", "social", "clear"])
    assert.ok(out.includes(cmd), `help should mention ${cmd}`);
  assert.ok(!out.includes("sudo") && !out.includes("tabla"), "easter eggs hidden");
});

test("whoami is a single line naming Pranav", () => {
  const res = Core.run("whoami");
  assert.equal(res.lines.length, 1);
  assert.ok(text(res.lines[0]).includes("Pranav Natekar"));
});

test("unknown command → not-found message", () => {
  const res = Core.run("frobnicate");
  assert.equal(text(res.lines[0]), "frobnicate: command not found. Type 'help' for available commands.");
  assert.equal(res.effect, null);
});

test("empty input → no output, no effect", () => {
  const res = Core.run("   ");
  assert.deepEqual(res.lines, []);
  assert.equal(res.effect, null);
});

test("echo returns raw text as a plain span (renderer escapes)", () => {
  const res = Core.run("echo hello <b>world</b> & friends");
  assert.equal(res.lines.length, 1);
  assert.equal(res.lines[0][0].text, "hello <b>world</b> & friends");
  assert.equal(res.lines[0][0].href, undefined);
});

test("clear → clear effect", () => {
  assert.deepEqual(Core.run("clear").effect, { type: "clear" });
});

test("cd variants (real subpages: projects/ and blog/)", () => {
  assert.deepEqual(Core.run("cd").effect, { type: "scroll", target: "#top" });
  assert.deepEqual(Core.run("cd ~").effect, { type: "scroll", target: "#top" });
  assert.deepEqual(Core.run("cd projects").effect, { type: "navigate", href: "projects/", newTab: false });
  assert.deepEqual(Core.run("cd blog").effect, { type: "navigate", href: "blog/", newTab: false });
  const w = Core.run("cd writing").effect;
  assert.equal(w.type, "navigate");
  assert.ok(w.href.includes("medium.com") && w.newTab === true);
  const p = Core.run("cd projects/tabla-tala").effect;
  assert.deepEqual(p, { type: "navigate", href: "projects/tabla-tala.html", newTab: false });
  const ab = Core.run("cd about");
  assert.equal(ab.effect, null);
  assert.ok(allText(ab).includes("no such directory"));
  const bad = Core.run("cd nope");
  assert.equal(bad.effect, null);
  assert.ok(allText(bad).includes("no such directory"));
});

test("blog command lists Medium posts", () => {
  const res = Core.run("blog");
  const hrefs = res.lines.flat().filter((s) => s.href).map((s) => s.href);
  assert.ok(hrefs.filter((h) => h.includes("pranavnatekar.medium.com/")).length >= 3, "at least 3 Medium posts");
  const out = allText(res);
  assert.ok(out.includes("OpenCV") && out.includes("Audio Classification"));
});

test("open navigates to article pages; bare/unknown handled", () => {
  assert.deepEqual(Core.run("open bag-ewatch").effect, { type: "navigate", href: "projects/bag-ewatch.html", newTab: false });
  assert.equal(Core.run("open").effect, null);
  assert.ok(allText(Core.run("open")).includes("usage"));
  assert.ok(allText(Core.run("open nope")).includes("no such project"));
});

test("cat prints files; social file has real links", () => {
  assert.ok(allText(Core.run("cat about.txt")).length > 0);
  assert.ok(allText(Core.run("cat nope.txt")).includes("No such file"));
  const soc = Core.run("cat .social");
  const hrefs = soc.lines.flat().filter((s) => s.href).map((s) => s.href);
  assert.ok(hrefs.some((h) => h.includes("github.com/pranav6670")));
  assert.ok(hrefs.some((h) => h.includes("linkedin.com")));
});

test("cat friendly aliases: social and projects work without exact filenames", () => {
  const socialHrefs = Core.run("cat social").lines.flat().filter((s) => s.href).map((s) => s.href);
  assert.ok(socialHrefs.some((h) => h.includes("github.com/pranav6670")), "cat social lists socials");
  const cp = Core.run("cat projects");
  const projHrefs = cp.lines.flat().filter((s) => s.href).map((s) => s.href);
  assert.ok(projHrefs.some((h) => h === "projects/tabla-tala.html"), "cat projects lists projects");
});

test("topic commands mirror files", () => {
  for (const c of ["about", "experience", "education", "research", "interests"])
    assert.ok(Core.run(c).lines.length > 0, `${c} should print`);
  const exp = allText(Core.run("experience"));
  assert.ok(exp.includes("Software Engineer 2, Computer Vision"), "confirmed current title");
  assert.ok(exp.includes("SiFive"));
  assert.ok(exp.includes("Software Engineering Intern @ AMD") && exp.includes("Ryzen NPU"), "AMD internship");
  assert.ok(exp.includes("EDG Intern @ MathWorks"), "MathWorks internship");
  assert.ok(allText(Core.run("education")).includes("Rochester Institute of Technology"));
});

test("projects lists all five with article links", () => {
  const res = Core.run("projects");
  const hrefs = res.lines.flat().filter((s) => s.href).map((s) => s.href);
  for (const slug of ["tabla-tala", "autonomous-vehicle", "image-augmenter", "youtube-subscriber-counter", "bag-ewatch"])
    assert.ok(hrefs.some((h) => h === `projects/${slug}.html`), `missing ${slug}`);
});

test("ls shows page dirs and files", () => {
  const out = allText(Core.run("ls"));
  for (const s of ["projects/", "blog/", "about.txt", ".social"]) assert.ok(out.includes(s));
  assert.ok(!out.includes("about/"), "about is a file, not a dir");
});

test("pwd, date, banner, history, sudo", () => {
  assert.equal(text(Core.run("pwd").lines[0]), "/home/pranav");
  const d = Core.run("date", { now: new Date("2026-07-28T12:00:00") });
  assert.ok(allText(d).includes("2026"));
  assert.equal(Core.run("banner").lines.length, Core.BANNER.length);
  const h = Core.run("history", { history: ["help", "ls"] });
  assert.ok(allText(h).includes("1  help") && allText(h).includes("2  ls"));
  assert.ok(allText(Core.run("sudo rm -rf /")).includes("Permission denied: nice try."));
});

test("completion: commands", () => {
  assert.equal(Core.complete("he").value, "help");
  assert.equal(Core.complete("op").value, "open ");
  assert.equal(Core.complete("xyz").value, null);
  assert.equal(Core.complete("su").value, null, "sudo hidden from completion");
});

test("completion: arguments", () => {
  assert.equal(Core.complete("cd w").value, "cd writing");
  assert.equal(Core.complete("cd b").value, "cd blog");
  assert.equal(Core.complete("cd ab").value, null, "about is not a cd target anymore");
  assert.equal(Core.complete("cd pr").value, "cd projects", "extends to common prefix");
  assert.equal(Core.complete("cat a").value, "cat about.txt");
  assert.equal(Core.complete("open tab").value, "open tabla-tala");
  const opts = Core.complete("cat ");
  assert.ok(opts.options && opts.options.includes(".social") && opts.options.includes("about.txt"));
});

test("intro: aleksa-style static session blocks", () => {
  const blocks = Core.intro();
  const cmds = blocks.map((b) => b.cmd);
  assert.ok(cmds.includes("$ echo $GREETING"));
  assert.ok(cmds.includes("# cat /proc/status"));
  assert.ok(cmds.includes("# ls ~/pages/"));
  assert.ok(cmds.includes("# cat ~/.social"));
  const flat = blocks.flatMap((b) => b.lines);
  const txt = flat.map((l) => l.map((s) => s.text).join("")).join("\n");
  assert.ok(txt.includes("Currently") && txt.includes("Rivian"));
  assert.ok(txt.includes("SiFive"));
  assert.ok(txt.includes("Rochester Institute of Technology"));
  const hrefs = flat.flat().filter((s) => s.href).map((s) => s.href);
  assert.ok(hrefs.includes("projects/"), "intro links the projects page");
  assert.ok(hrefs.includes("blog/"), "intro links the blog page");
  assert.ok(hrefs.some((h) => h.includes("medium.com")));
  assert.ok(hrefs.some((h) => h.includes("github.com/pranav6670")));
  assert.ok(hrefs.some((h) => h.includes("linkedin.com")));
  assert.ok(txt.includes("help"), "hint mentions help");
});

test("history model: prev/next with draft, cap", () => {
  const h = Core.createHistory(3);
  h.push("a"); h.push("b");
  assert.equal(h.prev("draft"), "b");
  assert.equal(h.prev(), "a");
  assert.equal(h.prev(), null, "stop at oldest");
  assert.equal(h.next(), "b");
  assert.equal(h.next(), "draft", "draft restored at newest end");
  assert.equal(h.next(), null);
  h.push("c"); h.push("d");
  assert.deepEqual(h.list(), ["b", "c", "d"], "capped at 3");
  h.push("");
  assert.deepEqual(h.list(), ["b", "c", "d"], "empty ignored");
});
