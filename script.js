let appState = {
  playerName: "",
  selectedId: null,
  stage: "intro", // intro -> role -> script -> main
  activeTab: "dossier",
  unlockedChapters: ["ch1"],
  currentChapter: "ch1",
  progressionNote: "",
};

function createElement(tag, className, content) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content !== undefined) {
    el.innerHTML = content;
  }
  return el;
}

function renderIntro(container) {
  container.innerHTML = "";

  appState.stage = "intro";

  const panel = createElement("div", "panel");
  const title = createElement("h2", "section-title", "踏入鳳鳴宮之前");
  const desc = createElement("p", null, INTRO.text.replace(/\n/g, "<br>"));
  const input = createElement("input");
  input.type = "text";
  input.placeholder = "請輸入玩家名稱";
  input.value = appState.playerName;

  const action = createElement("div", "action-row");
  const btn = createElement("button", null, APP_TEXT.introButton);
  btn.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) {
      input.focus();
      return;
    }
    appState.playerName = name;
    appState.stage = "role";
    renderRoles(container);
  });

  action.appendChild(btn);
  panel.append(title, desc, input, action);
  container.appendChild(panel);
}

function renderRoles(container) {
  container.innerHTML = "";

  const panel = createElement("div", "panel");
  const header = createElement(
    "h2",
    "section-title",
    `選角 · ${GAME.name}`
  );
  const sub = createElement(
    "p",
    "meta",
    "點擊角色卡以鎖定身分，選後不可返回。"
  );

  const grid = createElement("div", "grid");
  CHARACTERS.forEach((char) => {
    const card = createElement("div", "card");
    const tag = createElement("div", "tag", char.tag);
    tag.style.borderColor = char.color;
    tag.style.background = `${char.color}33`;

    const title = createElement("h3", null, char.title);
    title.style.color = char.color;
    const faction = createElement("p", "meta", char.faction);
    const scriptPreview = createElement(
      "p",
      null,
      `劇本片段：${char.scripts.ch1}`
    );

    const btn = createElement("button", null, APP_TEXT.roleButton);
    btn.addEventListener("click", () => {
      appState.selectedId = char.id;
      appState.stage = "script";
      renderScript(container);
    });

    card.append(tag, title, faction, scriptPreview, btn);
    grid.appendChild(card);
  });

  panel.append(header, sub, grid);
  container.appendChild(panel);
}

function renderScript(container) {
  container.innerHTML = "";
  const chosen = CHARACTERS.find((c) => c.id === appState.selectedId);
  if (!chosen) {
    renderRoles(container);
    return;
  }

  const panel = createElement("div", "panel");
  const header = createElement(
    "h2",
    "section-title",
    `${chosen.title} · 第一章`
  );
  const greeting = createElement(
    "p",
    "meta",
    `玩家：${appState.playerName}｜身份：${chosen.title}`
  );

  const scriptBox = createElement(
    "div",
    "dialog",
    chosen.scripts.ch1
  );

  const action = createElement("div", "action-row");
  const btn = createElement("button", null, APP_TEXT.proceedButton);
  btn.addEventListener("click", () => {
    btn.disabled = true;
    btn.textContent = "宮門已鎖定";
    appState.stage = "main";
    renderMain(container);
  });

  action.appendChild(btn);
  panel.append(header, greeting, scriptBox, action);
  container.appendChild(panel);
}

function renderTabHeader(container) {
  const tabBar = createElement("div", "tab-bar");
  TABS.forEach((tab) => {
    const btn = createElement(
      "button",
      `tab-btn ${appState.activeTab === tab.id ? "active" : ""}`,
      `${tab.icon || ""} ${tab.label}`
    );
    btn.addEventListener("click", () => {
      appState.activeTab = tab.id;
      renderMain(container);
    });
    tabBar.appendChild(btn);
  });
  return tabBar;
}

function renderDossierTab(chosen) {
  const wrapper = createElement("div", "tab-section");
  const list = createElement("div", "dossier-list");
  const chapters = [...appState.unlockedChapters].reverse();

  chapters.forEach((chKey) => {
    const chapter = CHAPTERS[chKey];
    const card = createElement("div", "card");
    const title = createElement(
      "h3",
      null,
      `${chapter.title}｜${chapter.condition}`
    );
    const scriptText = chosen.scripts[chKey] || "此章節內容尚未開放";
    const dialog = createElement("div", "dialog", scriptText);
    card.append(title, dialog);
    list.appendChild(card);
  });

  wrapper.appendChild(list);
  return wrapper;
}

function renderMissionTab(chosen) {
  const wrapper = createElement("div", "tab-section");
  const missionBox = createElement("div", "card");
  missionBox.appendChild(
    createElement("h3", null, `${CHAPTERS.ch1.title}｜本章任務`)
  );

  const missions = chosen.missions.ch1 || [];
  if (missions.length === 0) {
    missionBox.appendChild(createElement("p", "meta", "尚無任務，請等待指示。"));
  } else {
    const ul = createElement("ul", "task-list");
    missions.forEach((m) => {
      ul.appendChild(createElement("li", null, m));
    });
    missionBox.appendChild(ul);
  }

  const clueBox = createElement("div", "card subtle");
  clueBox.appendChild(createElement("h3", null, "私密線索"));
  const clues = chosen.clues.ch1 || [];
  if (clues.length === 0) {
    clueBox.appendChild(
      createElement("p", "meta", "暫無線索。請透過對話或任務取得。")
    );
  } else {
    const ul = createElement("ul", "clue-list");
    clues.forEach((c) => ul.appendChild(createElement("li", null, c)));
    clueBox.appendChild(ul);
  }

  wrapper.append(missionBox, clueBox);
  return wrapper;
}

function seatStatusFor(charId) {
  if (charId === appState.selectedId) return "已入座（玩家）";
  const alt = charId.charCodeAt(1) % 2 === 0 ? "NPC 已入座" : "虛位以待";
  return alt;
}

function renderSceneTab(chosen) {
  const wrapper = createElement("div", "tab-section");
  const rosterCard = createElement("div", "card");
  rosterCard.appendChild(createElement("h3", null, CHAPTERS.ch1.seatTitle));
  rosterCard.appendChild(
    createElement("p", "meta", CHAPTERS.ch1.seatDescription)
  );

  const roster = createElement("div", "roster");
  CHARACTERS.forEach((char) => {
    const row = createElement("div", "roster-row");
    const name = createElement("div", "roster-name", `${char.title}`);
    const status = createElement(
      "div",
      `roster-status ${char.id === appState.selectedId ? "self" : ""}`,
      seatStatusFor(char.id)
    );
    row.append(name, status);
    roster.appendChild(row);
  });
  rosterCard.appendChild(roster);

  const controls = createElement("div", "scene-controls");
  if (chosen.id === "c5" || chosen.id === "gm") {
    const btn = createElement("button", null, "茶聚已畢 / 完成介紹");
    btn.addEventListener("click", () => {
      appState.currentChapter = "ch2";
      if (!appState.unlockedChapters.includes("ch2")) {
        appState.unlockedChapters.push("ch2");
      }
      appState.progressionNote = APP_TEXT.sceneAdvance;
      renderMain(document.querySelector(".screen"));
    });
    controls.appendChild(btn);
  } else {
    controls.appendChild(createElement("p", "meta", APP_TEXT.sceneWaiting));
  }

  wrapper.append(rosterCard, controls);

  if (appState.currentChapter === "ch2") {
    const note = createElement(
      "div",
      "panel notice",
      appState.progressionNote || "已進入第二章（開發中），後續內容將於下一版開放。"
    );
    wrapper.appendChild(note);
  }

  return wrapper;
}

function renderMain(container) {
  const chosen = CHARACTERS.find((c) => c.id === appState.selectedId);
  if (!chosen) {
    renderRoles(container);
    return;
  }

  container.innerHTML = "";
  const panel = createElement("div", "panel");

  const header = createElement(
    "div",
    "panel-header",
    `${chosen.title}｜${appState.playerName}`
  );
  const sub = createElement(
    "p",
    "meta",
    `${CHAPTERS[appState.currentChapter].title} · ${CHAPTERS[appState.currentChapter].condition}`
  );
  header.appendChild(sub);

  const content = createElement("div", "tab-container");
  if (appState.activeTab === "mission") {
    content.appendChild(renderMissionTab(chosen));
  } else if (appState.activeTab === "floor") {
    content.appendChild(renderSceneTab(chosen));
  } else {
    content.appendChild(renderDossierTab(chosen));
  }

  panel.append(header, content, renderTabHeader(container));
  container.appendChild(panel);
}

function bootstrap() {
  const app = document.getElementById("app");
  if (!app) return;

  const header = createElement("div", "header");
  const h1 = createElement("h1", "title", GAME.name);
  const tagline = createElement("div", "subtitle", GAME.tagline);
  header.append(h1, tagline);

  const main = createElement("main");
  const container = createElement("div", "screen");
  main.appendChild(header);
  main.appendChild(container);

  app.appendChild(main);
  renderIntro(container);
}

document.addEventListener("DOMContentLoaded", bootstrap);
