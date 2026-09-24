(function () {
  const DATA = window.COLOR_DATA;
  const ORDER = DATA.order;

  const state = {
    view: "start",
    row: 0,
    ranks: emptyRanks(),
    audience: null,
    situation: DATA.situations[0].id,
    spot: [null, null, null, null],
    confirmRetake: false,
    copied: false
  };

  const app = document.getElementById("app");
  const nav = document.getElementById("nav");
  const footer = document.getElementById("footer");

  function emptyRanks() {
    return DATA.rows.map(() => [null, null, null, null]);
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }

  function load(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (err) {
      return null;
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function clearKey(key) {
    localStorage.removeItem(key);
  }

  function validDraft(ranks) {
    return Array.isArray(ranks) && ranks.length === DATA.rows.length && ranks.every((row) => {
      if (!Array.isArray(row) || row.length !== 4) return false;
      const nums = row.filter((n) => n != null);
      return nums.every((n) => [1, 2, 3, 4].includes(n)) && new Set(nums).size === nums.length;
    });
  }

  function validRanks(ranks) {
    return validDraft(ranks) && ranks.every((row) => row.every((n) => n != null));
  }

  function scoreRanks(ranks) {
    const scores = { blue: 0, green: 0, yellow: 0, red: 0 };
    ranks.forEach((row) => {
      ORDER.forEach((color, index) => {
        scores[color] += row[index];
      });
    });
    return scores;
  }

  function totalScore(scores) {
    return ORDER.reduce((sum, color) => sum + scores[color], 0);
  }

  function bandIndex(score) {
    if (score >= 52) return 0;
    if (score === 51) return 0;
    if (score >= 46) return 1;
    if (score >= 41) return 2;
    if (score >= 36) return 3;
    if (score >= 31) return 4;
    if (score >= 26) return 5;
    if (score === 25) return 5;
    return 6;
  }

  function hasBandGap(scores) {
    return ORDER.some((color) => scores[color] === 25 || scores[color] === 51);
  }

  function describeBlend(scores) {
    const ordered = ORDER.map((color) => [color, scores[color]])
      .sort((a, b) => b[1] - a[1] || ORDER.indexOf(a[0]) - ORDER.indexOf(b[0]));
    return {
      ordered,
      gap: ordered[0][1] - ordered[1][1]
    };
  }

  function colorName(id) {
    return DATA.colors[id].name;
  }

  function blendHeadline(blend) {
    const [a, b, c] = blend.ordered;
    if (a[1] === b[1] && b[1] === c[1]) {
      return colorName(a[0]) + ", " + colorName(b[0]) + ", and " + colorName(c[0]) + " are tied";
    }
    if (a[1] === b[1]) return colorName(a[0]) + " and " + colorName(b[0]) + ", side by side";
    if (blend.gap <= 3) return colorName(a[0]) + ", with " + colorName(b[0]) + " close behind";
    return "Mostly " + colorName(a[0]);
  }

  function profile() {
    const saved = load(DATA.profileKey);
    if (!saved || !validRanks(saved.ranks)) return null;
    return saved;
  }

  function toggleRank(row, index) {
    const next = row.slice();
    if (next[index] != null) {
      next[index] = null;
      return next;
    }
    const used = new Set(next.filter((n) => n != null));
    const rank = [4, 3, 2, 1].find((n) => !used.has(n));
    if (rank == null) return next;
    next[index] = rank;
    return next;
  }

  function firstIncomplete(ranks) {
    const index = ranks.findIndex((row) => row.some((n) => n == null));
    return index === -1 ? ranks.length - 1 : index;
  }

  function persistDraft() {
    save(DATA.draftKey, { ranks: state.ranks, row: state.row });
  }

  function go(view, opts) {
    const options = opts || {};
    if (view === "profile" && !profile()) view = "start";
    state.view = view;
    state.confirmRetake = false;
    state.copied = false;
    const url = view === "start" ? "#start" : "#" + view;
    if (options.replace) history.replaceState({ view }, "", url);
    else history.pushState({ view }, "", url);
    render({ scroll: true });
  }

  function remaining(row) {
    const used = new Set(row.filter((n) => n != null));
    return [4, 3, 2, 1].filter((n) => !used.has(n));
  }

  function renderNav() {
    const saved = profile();
    const items = [];
    if (saved) items.push(["profile", "Your blend"], ["practice", "Practice"]);
    items.push(["guide", "Guide"]);
    nav.innerHTML = items.map(([id, label]) => {
      const current = state.view === id ? ' aria-current="page"' : "";
      return '<button type="button" data-nav="' + id + '"' + current + ">" + label + "</button>";
    }).join("");
  }

  function renderFooter() {
    const links = DATA.sources.map((source) => {
      return '<li><a href="' + esc(source.href) + '" rel="noopener noreferrer">' + esc(source.label) + "</a></li>";
    }).join("");
    footer.innerHTML = "<p>Built by <a href=\"https://www.linkedin.com/in/clarkngo/\" rel=\"noopener noreferrer\">Clark Ngo</a>.</p><p>Word list adapted from the Washington State DES assessment. The descriptions and sample messages are original. Answers stay in this browser.</p><ul>" + links + "</ul>";
  }

  function render(opts) {
    const options = opts || {};
    const focusKey = options.focusKey || null;
    renderNav();
    renderFooter();
    if (state.view === "assess") app.innerHTML = viewAssess();
    else if (state.view === "profile") app.innerHTML = viewProfile();
    else if (state.view === "practice") app.innerHTML = viewPractice();
    else if (state.view === "guide") app.innerHTML = viewGuide();
    else app.innerHTML = viewStart();
    if (options.scroll) {
      window.scrollTo(0, 0);
      const heading = app.querySelector("h1");
      if (heading) heading.focus();
    } else if (focusKey) {
      const el = app.querySelector('[data-focus="' + focusKey + '"]');
      if (el) el.focus();
    }
  }

  function viewStart() {
    const saved = profile();
    const draft = load(DATA.draftKey);
    const hearings = DATA.hook.hearings.map((item) => {
      return '<li class="hearing"><span class="swatch ' + item.color + '" aria-hidden="true"></span><span><strong>' + colorName(item.color) + " hears:</strong> " + esc(item.text) + "</span></li>";
    }).join("");
    let actions = '<button type="button" class="btn" data-action="begin">Start the assessment</button><button type="button" class="btn secondary" data-nav="guide">Read the guide</button>';
    let status = "";
    if (saved) {
      const blend = describeBlend(scoreRanks(saved.ranks));
      status = '<p class="status">Saved blend: ' + esc(blendHeadline(blend)) + ".</p>";
      actions = '<button type="button" class="btn" data-nav="profile">See your blend</button><button type="button" class="btn secondary" data-nav="practice">Practice a message</button><button type="button" class="btn ghost" data-action="begin">Retake</button>';
    } else if (draft && validDraft(draft.ranks)) {
      status = '<p class="status">You have an assessment in progress.</p>';
      actions = '<button type="button" class="btn" data-action="resume">Continue</button><button type="button" class="btn ghost" data-action="begin">Start over</button>';
    }
    return '<div class="wrap">' +
      "<p class=\"eyebrow\">Communication styles</p>" +
      "<h1>Say it so they can hear it</h1>" +
      "<p class=\"lede\">Most friction is a style mismatch. You speak in the way you like to be spoken to. The other person needed a different door in.</p>" +
      status +
      '<figure class="hook"><blockquote>“' + esc(DATA.hook.line) + "”</blockquote><figcaption>Same words. Four readings.</figcaption><ul class=\"hearings\">" + hearings + "</ul></figure>" +
      "<p>Fifteen rows of words. You rank each row. You get a blend of blue, green, yellow, and red. That is a preference, not a personality. Then you practice shaping one set of facts four ways.</p>" +
      '<p class="fine">Your answers stay in this browser. Nothing is sent to a server.</p>' +
      '<div class="actions">' + actions + "</div></div>";
  }

  function viewAssess() {
    const row = state.ranks[state.row];
    const open = remaining(row);
    const words = DATA.rows[state.row].map((word, index) => {
      const rank = row[index];
      const pressed = rank != null ? "true" : "false";
      const rankText = rank == null ? "Tap" : String(rank);
      return '<button type="button" class="word" data-action="rank" data-index="' + index + '" data-focus="rank-' + index + '" aria-pressed="' + pressed + '">' +
        "<span class=\"word-name\">" + esc(word[0]) + "</span>" +
        "<span class=\"word-gloss\">" + esc(word[1]) + "</span>" +
        "<span class=\"word-rank\">" + rankText + "</span></button>";
    }).join("");
    const segments = DATA.rows.map((_, index) => {
      const done = state.ranks[index].every((n) => n != null);
      const cls = done || index === state.row ? " on" : "";
      return "<span class=\"" + cls.trim() + "\"></span>";
    }).join("");
    const remainText = open.length
      ? "Still to assign: " + open.join(", ") + "."
      : "All four ranked. You can continue.";
    const nextLabel = state.row === DATA.rows.length - 1 ? "See your blend" : "Next";
    const back = state.row === 0
      ? "<span></span>"
      : '<button type="button" class="btn secondary" data-action="back">Previous</button>';
    const intro = state.row === 0
      ? "<p>Read across the row. Give 4 to the word most like you and 1 to the word least like you. Use each number once. Some words are unflattering. Ranking one high still counts. The columns mix strengths and the traits that annoy people.</p>"
      : "<p>Tap a word for the next rank. The first tap is 4, most like you. Tap a ranked word to clear it.</p>";
    return '<div class="wrap wide">' +
      '<p class="progress" aria-hidden="true"><span class="segments">' + segments + "</span></p>" +
      "<p class=\"eyebrow\">Row " + (state.row + 1) + " of " + DATA.rows.length + "</p>" +
      "<h1>Which words are like you?</h1>" +
      intro +
      '<div class="words">' + words + "</div>" +
      '<p class="remaining" aria-live="polite">' + remainText + "</p>" +
      '<div class="bar">' + back +
      '<button type="button" class="btn" data-action="next"' + (open.length ? " disabled" : "") + ">" + nextLabel + "</button></div></div>";
  }

  function viewProfile() {
    const saved = profile();
    if (!saved) return viewStart();
    const scores = scoreRanks(saved.ranks);
    const blend = describeBlend(scores);
    const primary = DATA.colors[blend.ordered[0][0]];
    const secondary = DATA.colors[blend.ordered[1][0]];
    const close = blend.gap <= 3;
    const thirdClose = blend.ordered[0][1] - blend.ordered[2][1] <= 3;
    let sub = colorName(blend.ordered[1][0]) + " is next at " + blend.ordered[1][1] + ". These scores are preferences, not a personality.";
    if (thirdClose) sub = colorName(blend.ordered[2][0]) + " is in that cluster too. A preference is not the whole of you.";
    else if (blend.ordered[0][1] === blend.ordered[1][1]) sub = "A tie is a blend. Neither color is the real you.";
    const gapNote = hasBandGap(scores)
      ? '<p class="fine">The printed chart has no row for 25 or 51. A 51 is drawn on &gt; 51. A 25 is drawn on 26–30.</p>'
      : "";
    const also = close
      ? '<section class="panel"><h2>Also in the mix: ' + esc(secondary.name) + "</h2><p>" + esc(secondary.portrait) + "</p><p>" + esc(secondary.edge) + "</p></section>"
      : "";
    const phrases = primary.phrases.map((phrase) => "<li>" + esc(phrase) + "</li>").join("");
    const retake = state.confirmRetake
      ? '<button type="button" class="btn danger" data-action="retake-confirm">Clear answers and start over</button><button type="button" class="btn ghost" data-action="retake-cancel">Keep them</button>'
      : '<button type="button" class="btn ghost" data-action="review">Review answers</button><button type="button" class="btn ghost" data-action="retake">Retake</button>';
    return '<div class="wrap wide">' +
      "<p class=\"eyebrow\">Your blend</p>" +
      "<h1>" + esc(blendHeadline(blend)) + "</h1>" +
      "<p class=\"lede\">" + esc(sub) + "</p>" +
      chart(scores) +
      gapNote +
      scoreTable(scores) +
      '<section class="panel tint-' + blend.ordered[0][0] + '"><h2>How you tend to sound</h2><p>' + esc(primary.portrait) + "</p><h2>How others can misread it</h2><p>" + esc(primary.misread) + " " + esc(primary.edge) + "</p><h2>What helps you hear it</h2><p>" + esc(primary.help) + "</p><ul>" + phrases + "</ul></section>" +
      also +
      '<div class="actions no-print"><button type="button" class="btn" data-nav="practice">Practice a message</button><button type="button" class="btn secondary" data-nav="guide">Open the guide</button>' + retake + "</div></div>";
  }

  function chart(scores) {
    const width = 400;
    const height = 292;
    const left = 78;
    const top = 36;
    const rowH = 32;
    const colW = 76;
    const points = ORDER.map((color, index) => {
      const band = bandIndex(scores[color]);
      return {
        color,
        x: left + colW * index + colW / 2,
        y: top + rowH * band + rowH / 2
      };
    });
    const line = points.map((point) => point.x + "," + point.y).join(" ");
    const heads = ORDER.map((color, index) => {
      const x = left + colW * index + colW / 2;
      return '<text class="chart-label ' + color + '" x="' + x + '" y="18" text-anchor="middle">' + colorName(color) + " " + scores[color] + "</text>";
    }).join("");
    const rows = DATA.bands.map((band, index) => {
      const y = top + rowH * index;
      return '<text class="chart-band" x="8" y="' + (y + 20) + '">' + band.label + "</text>" +
        '<line x1="' + left + '" y1="' + y + '" x2="' + (left + colW * 4) + '" y2="' + y + '" class="grid-line"></line>';
    }).join("");
    const dots = points.map((point) => {
      return '<circle cx="' + point.x + '" cy="' + point.y + '" r="6" class="dot ' + point.color + '"></circle>';
    }).join("");
    return '<figure class="chart-figure"><svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="Score chart from Blue to Red">' +
      heads + rows + '<polyline points="' + line + '" class="chart-line"></polyline>' + dots +
      "</svg><figcaption>Bands from the DES chart. The line runs Blue, Green, Yellow, Red.</figcaption></figure>";
  }

  function scoreTable(scores) {
    const cells = ORDER.map((color) => "<td>" + scores[color] + "</td>").join("");
    const heads = ORDER.map((color) => "<th scope=\"col\">" + colorName(color) + "</th>").join("");
    return '<table class="scores"><caption>Each color is between 15 and 60. Together they total ' + totalScore(scores) + ".</caption><thead><tr>" + heads + "</tr></thead><tbody><tr>" + cells + "</tr></tbody></table>";
  }

  function situation() {
    return DATA.situations.find((item) => item.id === state.situation) || DATA.situations[0];
  }

  function spotTally() {
    const counts = { blue: 0, green: 0, yellow: 0, red: 0 };
    state.spot.forEach((color) => {
      if (counts[color] != null) counts[color] += 1;
    });
    const max = Math.max.apply(null, ORDER.map((color) => counts[color]));
    const leaders = ORDER.filter((color) => counts[color] === max && max > 0);
    return { counts, leaders, complete: state.spot.every(Boolean) };
  }

  function targetColor() {
    if (ORDER.includes(state.audience)) return state.audience;
    if (state.audience !== "unsure") return null;
    const tally = spotTally();
    if (!tally.complete || tally.leaders.length !== 1) return null;
    return tally.leaders[0];
  }

  function viewPractice() {
    const current = situation();
    const saved = profile();
    const target = targetColor();
    const situations = DATA.situations.map((item) => {
      const pressed = item.id === current.id ? "true" : "false";
      return '<button type="button" data-action="situation" data-id="' + item.id + '" aria-pressed="' + pressed + '">' + esc(item.label) + "</button>";
    }).join("");
    const audience = ORDER.map((color) => {
      const pressed = state.audience === color ? "true" : "false";
      return '<button type="button" class="chip" data-action="audience" data-color="' + color + '" aria-pressed="' + pressed + '"><span class="swatch ' + color + '" aria-hidden="true"></span>' + colorName(color) + "</button>";
    }).join("");
    const unsurePressed = state.audience === "unsure" ? "true" : "false";
    let body = "";
    if (state.audience === "unsure") body += spotBlock();
    if (target) body += versions(current, target, saved);
    else if (state.audience !== "unsure") body += '<p class="fine">Choose a color to see the same facts shaped for that person.</p>';
    const own = saved
      ? '<p class="fine">Your blend leads with ' + esc(colorName(describeBlend(scoreRanks(saved.ranks)).ordered[0][0])) + ".</p>"
      : '<p class="fine">Take the assessment if you want this set next to your own default.</p>';
    return '<div class="wrap">' +
      "<p class=\"eyebrow\">Practice</p>" +
      "<h1>Shape one message four ways</h1>" +
      own +
      '<div class="choice-row" role="group" aria-label="Situation">' + situations + "</div>" +
      '<h2>Who is it for?</h2><div class="choice-row" role="group" aria-label="Audience color">' + audience +
      '<button type="button" class="chip" data-action="audience" data-color="unsure" aria-pressed="' + unsurePressed + '">Not sure</button></div>' +
      '<section class="facts"><h2>Facts</h2><p>' + esc(current.facts) + "</p></section>" +
      body + "</div>";
  }

  function spotBlock() {
    const tally = spotTally();
    const fields = DATA.spot.map((question, index) => {
      const options = question.options.map((option) => {
        const checked = state.spot[index] === option[0] ? " checked" : "";
        return '<label class="choice"><input type="radio" name="spot-' + index + '" data-action="spot" data-index="' + index + '" value="' + option[0] + '"' + checked + "> " + esc(option[1]) + "</label>";
      }).join("");
      return "<fieldset><legend>" + esc(question.prompt) + "</legend>" + options + "</fieldset>";
    }).join("");
    let guess = "";
    if (tally.complete && tally.leaders.length > 1) {
      const names = tally.leaders.map(colorName).join(" and ");
      const picks = tally.leaders.map((color) => {
        return '<button type="button" class="btn secondary" data-action="audience" data-color="' + color + '">Use ' + colorName(color) + "</button>";
      }).join("");
      guess = "<p>These answers split between " + esc(names) + ". Pick one to draft with. Four questions are a guess, not a label.</p><div class=\"actions\">" + picks + "</div>";
    } else if (tally.complete) {
      guess = "<p>These answers point toward " + esc(colorName(tally.leaders[0])) + ". Four questions are a guess, not a label. Watch how they respond and adjust.</p>";
    }
    return "<section class=\"spot\">" + fields + guess + "</section>";
  }

  function versions(current, target, saved) {
    const cards = ORDER.map((color) => {
      const version = current.versions[color];
      const open = color === target;
      if (!open) {
        return '<button type="button" class="version-tab" data-action="audience" data-color="' + color + '">' + colorName(color) + "</button>";
      }
      let compare = "";
      if (saved) {
        const own = describeBlend(scoreRanks(saved.ranks)).ordered[0][0];
        compare = own === color
          ? "<p class=\"fine\">This is close to how you already open. Read the skip line so habit does not crowd them.</p>"
          : "<p class=\"fine\">You tend to lead with " + esc(colorName(own)) + ". This draft leads with " + esc(colorName(color)) + " instead.</p>";
      }
      const copyLabel = state.copied ? "Copied" : "Copy message";
      return '<article class="version tint-' + color + '"><h2>Shaped for ' + colorName(color) + "</h2>" + compare +
        "<h3>Open with</h3><p>" + esc(version.open) + "</p>" +
        "<h3>Skip</h3><p>" + esc(version.skip) + "</p>" +
        "<h3>Message</h3><div class=\"message\" id=\"message\">" + esc(version.body) + "</div>" +
        '<p><button type="button" class="btn secondary no-print" data-action="copy">' + copyLabel + "</button></p>" +
        "<h3>Next step</h3><p>" + esc(version.next) + "</p></article>";
    }).join("");
    return '<div class="version-list">' + cards + "</div>";
  }

  function viewGuide() {
    const cards = ORDER.map((color) => {
      const item = DATA.colors[color];
      const phrases = item.phrases.map((phrase) => "<li>" + esc(phrase) + "</li>").join("");
      return '<article class="panel tint-' + color + '"><h2><span class="swatch ' + color + '" aria-hidden="true"></span>' + item.name + "</h2>" +
        "<p><strong>They value</strong> " + esc(item.value) + "</p>" +
        "<p><strong>Lead with</strong> " + esc(item.lead) + "</p>" +
        "<p><strong>Avoid</strong> " + esc(item.avoid) + "</p>" +
        "<ul>" + phrases + "</ul></article>";
    }).join("");
    const pairs = DATA.pairs.map((pair) => {
      const flex = pair.flex.map((item) => "<li><strong>" + colorName(item[0]) + ":</strong> " + esc(item[1]) + "</li>").join("");
      return "<section><h2>" + esc(pair.title) + "</h2><p>" + esc(pair.tension) + "</p><ul>" + flex + "</ul></section>";
    }).join("");
    const questions = DATA.flexQuestions.map((question) => "<li>" + esc(question) + "</li>").join("");
    return '<div class="wrap">' +
      "<p class=\"eyebrow\">Guide</p>" +
      "<h1>Flex the delivery</h1>" +
      "<p class=\"lede\">You do not have to change who you are. You translate the same point into the style the other person can hear. Do not treat the color as the whole person.</p>" +
      cards +
      "<h2>Before you send it</h2><ol>" + questions + "</ol>" +
      "<h2>A mixed group</h2><p>" + esc(DATA.mixed) + "</p>" +
      "<h2>Where pairs snag</h2>" + pairs +
      '<div class="actions no-print"><button type="button" class="btn" data-nav="practice">Practice a message</button></div></div>';
  }

  function onClick(event) {
    const navButton = event.target.closest("[data-nav]");
    if (navButton) {
      go(navButton.getAttribute("data-nav"));
      return;
    }
    const button = event.target.closest("[data-action]");
    if (!button || button.disabled) return;
    const action = button.getAttribute("data-action");
    if (action === "begin") {
      state.ranks = emptyRanks();
      state.row = 0;
      clearKey(DATA.draftKey);
      clearKey(DATA.profileKey);
      go("assess");
      return;
    }
    if (action === "resume") {
      const draft = load(DATA.draftKey);
      if (draft && validDraft(draft.ranks)) {
        state.ranks = draft.ranks;
        state.row = firstIncomplete(draft.ranks);
      }
      go("assess");
      return;
    }
    if (action === "rank") {
      const index = Number(button.getAttribute("data-index"));
      state.ranks[state.row] = toggleRank(state.ranks[state.row], index);
      persistDraft();
      render({ focusKey: "rank-" + index });
      return;
    }
    if (action === "back") {
      state.row = Math.max(0, state.row - 1);
      persistDraft();
      render({ scroll: true });
      return;
    }
    if (action === "next") {
      if (remaining(state.ranks[state.row]).length) return;
      if (state.row < DATA.rows.length - 1) {
        state.row += 1;
        persistDraft();
        render({ scroll: true });
        return;
      }
      if (!validRanks(state.ranks) || totalScore(scoreRanks(state.ranks)) !== 150) return;
      save(DATA.profileKey, { ranks: state.ranks, savedAt: new Date().toISOString() });
      clearKey(DATA.draftKey);
      go("profile");
      return;
    }
    if (action === "review") {
      const saved = profile();
      if (!saved) return;
      state.ranks = saved.ranks.map((row) => row.slice());
      state.row = 0;
      persistDraft();
      go("assess");
      return;
    }
    if (action === "retake") {
      state.confirmRetake = true;
      render();
      return;
    }
    if (action === "retake-cancel") {
      state.confirmRetake = false;
      render();
      return;
    }
    if (action === "retake-confirm") {
      state.ranks = emptyRanks();
      state.row = 0;
      clearKey(DATA.draftKey);
      clearKey(DATA.profileKey);
      go("assess");
      return;
    }
    if (action === "situation") {
      state.situation = button.getAttribute("data-id");
      state.copied = false;
      render();
      return;
    }
    if (action === "audience") {
      state.audience = button.getAttribute("data-color");
      state.copied = false;
      render();
      return;
    }
    if (action === "copy") {
      const message = document.getElementById("message");
      if (!message) return;
      navigator.clipboard.writeText(message.textContent).then(() => {
        state.copied = true;
        render();
      }).catch(() => {
        state.copied = false;
      });
    }
  }

  function onChange(event) {
    const input = event.target.closest("[data-action=\"spot\"]");
    if (!input) return;
    state.spot[Number(input.getAttribute("data-index"))] = input.value;
    state.copied = false;
    render();
  }

  app.addEventListener("click", onClick);
  nav.addEventListener("click", onClick);
  document.querySelector(".mark").addEventListener("click", (event) => {
    event.preventDefault();
    go("start");
  });
  app.addEventListener("change", onChange);
  window.addEventListener("popstate", () => {
    const view = (location.hash || "#start").slice(1);
    state.view = ["assess", "profile", "practice", "guide"].includes(view) ? view : "start";
    if (state.view === "profile" && !profile()) state.view = "start";
    render({ scroll: true });
  });

  window.ColorComm = { scoreRanks, bandIndex, describeBlend, validRanks, toggleRank, totalScore };

  const initial = (location.hash || "#start").slice(1);
  state.view = ["assess", "profile", "practice", "guide"].includes(initial) ? initial : "start";
  if (state.view === "profile" && !profile()) state.view = "start";
  if (state.view === "assess") {
    const draft = load(DATA.draftKey);
    const saved = profile();
    if (draft && validDraft(draft.ranks)) {
      state.ranks = draft.ranks;
      state.row = Math.min(draft.row || 0, DATA.rows.length - 1);
    } else if (saved) {
      state.ranks = saved.ranks.map((row) => row.slice());
    }
  }
  history.replaceState({ view: state.view }, "", "#" + state.view);
  render();
})();
