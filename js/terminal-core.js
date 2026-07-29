/* terminal-core.js — pure logic for the homepage terminal. No DOM here.
   All terminal copy lives in SITE/FILES below — edit content in this file only.
   Output lines are arrays of spans: {text, cls?, href?}; the glue renders them. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) { module.exports = factory(); }
  else { root.TerminalCore = factory(); }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var PROMPT = "pranav@web:~$";

  var BANNER = [
    "██████╗  ██████╗   █████╗  ███╗   ██╗  █████╗  ██╗   ██╗",
    "██╔══██╗ ██╔══██╗ ██╔══██╗ ████╗  ██║ ██╔══██╗ ██║   ██║",
    "██████╔╝ ██████╔╝ ███████║ ██╔██╗ ██║ ███████║ ██║   ██║",
    "██╔═══╝  ██╔══██╗ ██╔══██║ ██║╚██╗██║ ██╔══██║ ╚██╗ ██╔╝",
    "██║      ██║  ██║ ██║  ██║ ██║ ╚████║ ██║  ██║  ╚████╔╝ ",
    "╚═╝      ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═══╝ ╚═╝  ╚═╝   ╚═══╝  "
  ];

  function t(x) { return { text: x }; }
  function mut(x) { return { text: x, cls: "muted" }; }
  function err(x) { return { text: x, cls: "err" }; }
  function gold(x) { return { text: x, cls: "gold" }; }
  function link(x, href) { return { text: x, href: href }; }

  var SOCIALS = [
    link("GitHub", "https://github.com/pranav6670"),
    link("LinkedIn", "https://www.linkedin.com/in/pranavnatekar/"),
    link("Twitter", "https://twitter.com/pranavnat24"),
    link("Medium", "https://pranavnatekar.medium.com/")
  ];
  var MEDIUM = "https://pranavnatekar.medium.com/";

  var PROJECTS = [
    { slug: "tabla-tala", title: "Automatic Detection & Classification of Tabla Talas", meta: "ML · Audio · TensorFlow Community Spotlight winner" },
    { slug: "autonomous-vehicle", title: "Autonomous Vehicle Drive", meta: "Robotics · Deep Learning" },
    { slug: "image-augmenter", title: "Image Augmenter", meta: "Tools · Computer Vision" },
    { slug: "youtube-subscriber-counter", title: "YouTube Subscriber Counter", meta: "Hardware · IoT" },
    { slug: "bag-ewatch", title: "Bag eWatch", meta: "Hardware · Embedded" }
  ];

  var FILES = {
    "about.txt": [
      [t("Engineer working across machine learning, computer vision and speech.")],
      [t("I like turning newly learnt skills into real-time prototypes — the long")],
      [t("game is intelligent cognition and reasoning in low-power machines.")],
      [t("Off the keyboard: I play the tabla.")]
    ],
    "experience.txt": [
      // TODO(pranav): confirm current role/employer wording.
      [t("→ Currently : Software Engineer @ Rivian & Volkswagen Group Technologies")],
      [t("→ Previously: Software Engineer @ SiFive — SoC bring-up for a custom")],
      [t("              VLIW+SIMD DSP IP and an AI accelerator")]
    ],
    "education.txt": [
      [t("MS, Electrical Engineering — Rochester Institute of Technology")],
      [t("Focus: Image Processing & Computer Vision")]
    ],
    "research.txt": [
      [link("brain.lab @ RIT", "https://www.rit.edu/kgcoe/brainlab/"), t(", advised by "), link("Dr. Cory Merkel", "https://scholar.google.com/citations?user=YnhtWqYAAAAJ&hl=en"), t(" —")],
      [t("“Improving Speech Technologies for People with Atypical Speech”")]
    ],
    "interests.txt": [
      [t("Computer Vision · Speech Processing · Embedded ML · low-power AGI")],
      [t("Real-time prototyping · Indian classical percussion (tabla)")]
    ]
  };
  var FILE_NAMES = ["about.txt", "experience.txt", "education.txt", "research.txt", "interests.txt", ".social"];

  var SECTIONS = { about: "#about", projects: "#projects" };

  function socialLines() {
    var spans = [];
    for (var i = 0; i < SOCIALS.length; i++) {
      if (i) spans.push(mut(" · "));
      spans.push(SOCIALS[i]);
    }
    return [spans];
  }

  function projectLines() {
    var lines = PROJECTS.map(function (p) {
      return [t("→ "), link(p.title, "projects/" + p.slug + ".html"), mut("  (" + p.meta + ")")];
    });
    lines.push([mut("open <slug> to read one, e.g. "), gold("open tabla-tala")]);
    return lines;
  }

  var HELP = [
    ["help", "this message"],
    ["whoami", "one-line intro"],
    ["about", "who I am (also: experience, education, research, interests)"],
    ["projects", "list my projects"],
    ["open <slug>", "read a project write-up"],
    ["ls", "list sections & files"],
    ["cd <section>", "go to a section (about, projects, writing)"],
    ["cat <file>", "print a file (about.txt … .social)"],
    ["social", "where to find me"],
    ["echo <text>", "say it back"],
    ["clear", "clear the screen (Ctrl+L works too)"]
  ];

  function out(lines, effect) { return { lines: lines, effect: effect || null }; }

  var COMMANDS = {
    help: function () {
      var lines = HELP.map(function (h) {
        return [gold((h[0] + "              ").slice(0, 14)), mut("— " + h[1])];
      });
      lines.push([mut("↑/↓ history · Tab completes · a few easter eggs are hiding")]);
      return out(lines);
    },
    whoami: function () {
      return out([[t("Pranav Natekar — Software Engineer @ Rivian & VW Group Technologies · ex-SiFive · RIT EE alum")]]);
    },
    about: function () { return out(FILES["about.txt"]); },
    experience: function () { return out(FILES["experience.txt"]); },
    education: function () { return out(FILES["education.txt"]); },
    research: function () { return out(FILES["research.txt"]); },
    interests: function () { return out(FILES["interests.txt"]); },
    projects: function () { return out(projectLines()); },
    social: function () { return out(socialLines()); },
    contact: function () { return out(socialLines()); },
    ls: function () {
      return out([
        [link("about/", "#about"), t("  "), link("projects/", "#projects"), t("  "), link("writing/", MEDIUM)],
        [mut(FILE_NAMES.join("  "))]
      ]);
    },
    cd: function (arg) {
      if (!arg || arg === "~" || arg === "/") return out([], { type: "scroll", target: "#top" });
      if (SECTIONS[arg]) return out([], { type: "scroll", target: SECTIONS[arg] });
      if (arg === "writing") return out([], { type: "navigate", href: MEDIUM, newTab: true });
      var m = /^projects\/([\w-]+)\/?$/.exec(arg);
      if (m && findProject(m[1])) return out([], { type: "navigate", href: "projects/" + m[1] + ".html", newTab: false });
      return out([
        [err("cd: no such directory: " + arg)],
        [mut("directories: about/  projects/  writing/  (or projects/<slug>)")]
      ]);
    },
    open: function (arg) {
      if (!arg) return out([[mut("usage: open <slug> — try one of:")], [mut(slugs().join("  "))]]);
      if (findProject(arg)) return out([], { type: "navigate", href: "projects/" + arg + ".html", newTab: false });
      return out([[err("open: no such project: " + arg)], [mut(slugs().join("  "))]]);
    },
    cat: function (arg) {
      if (!arg) return out([[mut("usage: cat <file> — try:")], [mut(FILE_NAMES.join("  "))]]);
      if (arg === ".social" || arg === "~/.social") return out(socialLines());
      if (FILES[arg]) return out(FILES[arg]);
      return out([[err("cat: " + arg + ": No such file")]]);
    },
    echo: function (arg) { return out(arg ? [[t(arg)]] : [[t("")]]); },
    pwd: function () { return out([[t("/home/pranav")]]); },
    date: function (arg, ctx) { return out([[t(String((ctx && ctx.now) || new Date()))]]); },
    banner: function () {
      return out(BANNER.map(function (row) { return [{ text: row, cls: "banner" }]; }));
    },
    history: function (arg, ctx) {
      var items = (ctx && ctx.history) || [];
      if (!items.length) return out([[mut("(history is empty)")]]);
      return out(items.map(function (cmd, i) {
        return [mut(("   " + (i + 1)).slice(-4) + "  "), t(cmd)];
      }));
    },
    clear: function () { return out([], { type: "clear" }); },
    sudo: function () { return out([[err("Permission denied: nice try.")]]); },
    tabla: function () {
      return out([
        [gold("dha dhin dhin dha | dha dhin dhin dha | dha tin tin ta | ta dhin dhin dha  🥁")],
        [mut("(teentaal — 16 beats. I play this one for real.)")]
      ]);
    }
  };

  function slugs() { return PROJECTS.map(function (p) { return p.slug; }); }
  function findProject(slug) {
    for (var i = 0; i < PROJECTS.length; i++) if (PROJECTS[i].slug === slug) return PROJECTS[i];
    return null;
  }

  /* Commands offered by tab completion / suggested publicly (easter eggs excluded). */
  var PUBLIC_COMMANDS = ["help", "whoami", "about", "experience", "education", "research",
    "interests", "projects", "open", "ls", "cd", "cat", "social", "contact", "echo",
    "pwd", "date", "banner", "history", "clear"];
  var ARG_COMPLETIONS = {
    cd: ["about", "projects", "writing"].concat(slugs().map(function (s) { return "projects/" + s; })),
    open: slugs(),
    cat: FILE_NAMES
  };
  var TAKES_ARG = { cd: 1, open: 1, cat: 1, echo: 1 };

  function commonPrefix(list) {
    var p = list[0];
    for (var i = 1; i < list.length; i++) {
      while (list[i].slice(0, p.length) !== p) p = p.slice(0, -1);
    }
    return p;
  }

  function complete(input) {
    var none = { value: null, options: null };
    var m = /^(\S+)\s+(\S*)$/.exec(input);
    if (m) {
      var cands = ARG_COMPLETIONS[m[1].toLowerCase()];
      if (!cands) return none;
      var matches = cands.filter(function (c) { return c.slice(0, m[2].length) === m[2]; });
      if (!matches.length) return none;
      if (matches.length === 1) return { value: m[1] + " " + matches[0], options: null };
      var cp = commonPrefix(matches);
      if (cp.length > m[2].length) return { value: m[1] + " " + cp, options: null };
      return { value: null, options: matches };
    }
    var word = input.trim();
    if (!word) return none;
    var cmds = PUBLIC_COMMANDS.filter(function (c) { return c.slice(0, word.length) === word; });
    if (!cmds.length) return none;
    if (cmds.length === 1) return { value: cmds[0] + (TAKES_ARG[cmds[0]] ? " " : ""), options: null };
    var cpc = commonPrefix(cmds);
    if (cpc.length > word.length) return { value: cpc, options: null };
    return { value: null, options: cmds };
  }

  function run(input, ctx) {
    var trimmed = (input || "").trim();
    if (!trimmed) return out([]);
    var sp = trimmed.indexOf(" ");
    var cmd = (sp === -1 ? trimmed : trimmed.slice(0, sp)).toLowerCase();
    var arg = sp === -1 ? "" : trimmed.slice(sp + 1).trim();
    if (COMMANDS[cmd]) return COMMANDS[cmd](arg, ctx);
    return out([[err(cmd + ": command not found. Type 'help' for available commands.")]]);
  }

  function createHistory(cap) {
    cap = cap || 100;
    var items = [], cursor = 0, draft = "";
    return {
      push: function (cmd) {
        if (!cmd) return;
        items.push(cmd);
        if (items.length > cap) items.shift();
        cursor = items.length; draft = "";
      },
      prev: function (current) {
        if (!items.length || cursor === 0) return null;
        if (cursor === items.length) draft = current || "";
        cursor -= 1;
        return items[cursor];
      },
      next: function () {
        if (cursor >= items.length) return null;
        cursor += 1;
        return cursor === items.length ? draft : items[cursor];
      },
      list: function () { return items.slice(); }
    };
  }

  return { PROMPT: PROMPT, BANNER: BANNER, run: run, complete: complete, createHistory: createHistory };
});
