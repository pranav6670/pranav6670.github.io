/* terminal.js — DOM glue for the hero terminal. Logic lives in terminal-core.js. */
(function () {
  "use strict";
  var Core = window.TerminalCore;
  var term = document.getElementById("terminal");
  if (!Core || !term) return;

  var intro = term.querySelector(".term__intro");
  var log = term.querySelector(".term__log");
  var input = term.querySelector(".term__input");
  var banner = term.querySelector(".term__banner");
  var history = Core.createHistory(100);
  var MAX_ENTRIES = 100;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderSpan(span) {
    var el;
    if (span.href) {
      el = document.createElement("a");
      el.href = span.href;
      if (/^https?:/.test(span.href)) {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    } else {
      el = document.createElement("span");
      if (span.cls) el.className = "c-" + span.cls;
    }
    el.textContent = span.text;
    return el;
  }

  function renderLine(spans, parent) {
    var line = document.createElement("div");
    line.className = "term__line";
    if (spans.length && spans[0].cls === "banner") line.classList.add("term__banner-line");
    spans.forEach(function (s) { line.appendChild(renderSpan(s)); });
    if (!spans.length) line.appendChild(document.createTextNode(" "));
    parent.appendChild(line);
  }

  function echoLine(entry, raw) {
    var line = document.createElement("div");
    line.className = "term__line";
    var ps1 = document.createElement("span");
    ps1.className = "c-prompt";
    ps1.textContent = Core.PROMPT + " ";
    var cmd = document.createElement("span");
    cmd.textContent = raw;
    line.appendChild(ps1);
    line.appendChild(cmd);
    entry.appendChild(line);
  }

  function newEntry() {
    var entry = document.createElement("div");
    entry.className = "term__entry";
    log.appendChild(entry);
    while (log.children.length > MAX_ENTRIES) log.removeChild(log.firstChild);
    return entry;
  }

  /* The window grows with its content (no inner scrollbar) — keep the prompt in view.
     "instant" bypasses the page's global scroll-behavior: smooth. */
  function scrollToBottom() { input.scrollIntoView({ block: "nearest", behavior: "instant" }); }

  function renderIntro() {
    banner.textContent = Core.BANNER.join("\n");
    Core.intro().forEach(function (block) {
      var entry = document.createElement("div");
      entry.className = "term__entry";
      if (block.cmd) renderLine([{ text: block.cmd, cls: "muted" }], entry);
      block.lines.forEach(function (spans) { renderLine(spans, entry); });
      intro.appendChild(entry);
    });
  }

  renderIntro();
  term.hidden = false;

  function applyEffect(effect) {
    if (!effect) return;
    if (effect.type === "clear") {
      log.textContent = "";
    } else if (effect.type === "scroll") {
      var target = document.querySelector(effect.target);
      if (target) target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    } else if (effect.type === "navigate") {
      if (effect.newTab) window.open(effect.href, "_blank", "noopener");
      else window.location.href = effect.href;
    }
  }

  function submit() {
    var raw = input.value;
    input.value = "";
    var entry = newEntry();
    echoLine(entry, raw);
    var res = Core.run(raw, { now: new Date(), history: history.list() });
    res.lines.forEach(function (spans) { renderLine(spans, entry); });
    history.push(raw.trim());
    applyEffect(res.effect);
    scrollToBottom();
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      var p = history.prev(input.value);
      if (p !== null) { input.value = p; moveCaretToEnd(); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      var n = history.next();
      if (n !== null) { input.value = n; moveCaretToEnd(); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      var c = Core.complete(input.value);
      if (c.value !== null) {
        input.value = c.value;
        moveCaretToEnd();
      } else if (c.options) {
        var entry = newEntry();
        echoLine(entry, input.value);
        renderLine([{ text: c.options.join("  "), cls: "muted" }], entry);
        scrollToBottom();
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      log.textContent = "";
    } else if (e.key === "c" && e.ctrlKey && !window.getSelection().toString()) {
      e.preventDefault();
      echoLine(newEntry(), input.value + "^C");
      input.value = "";
      scrollToBottom();
    }
  });

  function moveCaretToEnd() {
    var len = input.value.length;
    window.requestAnimationFrame(function () { input.setSelectionRange(len, len); });
  }

  term.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    var sel = window.getSelection();
    if (sel && sel.type === "Range") return;
    input.focus({ preventScroll: true });
  });
})();
