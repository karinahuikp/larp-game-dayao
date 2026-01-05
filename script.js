let appState = {
  playerName: "",
  selectedId: null,
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
  });

  action.appendChild(btn);
  panel.append(header, greeting, scriptBox, action);
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
