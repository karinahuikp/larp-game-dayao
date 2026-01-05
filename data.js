// 劇本資料與設定
const GAME = {
  name: "大曜王朝",
  tagline: "深宮夜色下，權力與真相交纏。",
  description:
    "玩家化身六名宮廷角色之一，循著卷宗線索推進章節，解開大曜王朝的命運。",
};

const INTRO = {
  text: `長夜未央，鳳鳴宮燈影搖曳。某個秘密將在今夜揭開，
而你，將在這場盛局中選擇立場。請留下你的名諱，準備步入宮門。`,
};

const TABS = [
  { id: "dossier", label: "我的卷宗", description: "個人密檔、行動紀錄。" },
  { id: "mission", label: "本章任務", description: "推進劇情的必做任務。" },
  { id: "floor", label: "聚會現場", description: "與諸人交涉、蒐集線索。" },
];

const CHARACTERS = [
  {
    id: "c1",
    title: "御前侍衛",
    tag: "禁軍刀影",
    color: "#8c7c52",
    faction: "皇城禁軍，負責鳳鳴宮安全。",
    scripts: { ch1: "今晚的巡哨令牌被調包，你必須找出誰動了手腳。" },
    missions: { ch1: ["確認巡哨路線", "守住宮門前廊"] },
    clues: { ch1: ["銅令牌沾有藥粉", "暗號改成‘赤烏’"] },
  },
  {
    id: "c2",
    title: "內務女官",
    tag: "宮務總理",
    color: "#b3563a",
    faction: "掌理宮中事務，熟知每項流程。",
    scripts: { ch1: "御膳房調度突遭更改，背後有看不見的手。" },
    missions: { ch1: ["重新清點御膳", "追查更改命令來源"] },
    clues: { ch1: ["名冊缺失一頁", "坊間有走私食材"] },
  },
  {
    id: "c3",
    title: "翰林侍讀",
    tag: "筆削風雷",
    color: "#5a7195",
    faction: "太子伴讀，善於辭令與佈局。",
    scripts: { ch1: "你收到一首被燒去一角的詩，似乎暗示密會地點。" },
    missions: { ch1: ["拼湊殘詩", "確認太子行蹤"] },
    clues: { ch1: ["殘詩提到‘東廊月影’", "有人夜間翻閱典籍"] },
  },
  {
    id: "c4",
    title: "宮廷醫官",
    tag: "針藥雙絕",
    color: "#7b9c6c",
    faction: "奉詔掌理宮中診療。",
    scripts: { ch1: "有人在太液池旁遺留藥盒，與宮中常備不同。" },
    missions: { ch1: ["檢驗藥盒", "追查藥材來源"] },
    clues: { ch1: ["藥盒外有藍絲帶", "藥渣混有安神香"] },
  },
  {
    id: "c5",
    title: "樂伎",
    tag: "音律撩魂",
    color: "#9c567e",
    faction: "常隨宴席伺候，耳聞諸事。",
    scripts: { ch1: "今晚的曲目被換成《降霜》，似乎是某人暗號。" },
    missions: { ch1: ["向樂房確認曲譜", "觀察誰對新曲有反應"] },
    clues: { ch1: ["太監提前收走舊譜", "有人在晚宴前悄離座位"] },
  },
  {
    id: "gm",
    title: "皇后 / 主持人",
    tag: "鳳印定江山",
    color: "#c9a646",
    faction: "掌鳳鳴宮秩序，決斷眾人。",
    scripts: { ch1: "你握有全部線索的片段，需引導眾人對質。" },
    missions: { ch1: ["掌握節奏", "保留關鍵訊息到最後"] },
    clues: { ch1: ["每個人都欠你一分情面", "有人害怕觸怒你"] },
  },
];

const CHAPTERS = {
  ch1: { title: "鳳鳴宮夜宴", condition: "六角首次登場，確認彼此立場" },
  ch2: { title: "風聲漸近", condition: "待補：踏查宮道、找出暗門" },
  ch3: { title: "丹心對弈", condition: "待補：對質與陣營翻轉" },
  ch4: { title: "曙光裁決", condition: "待補：皇后揭示真相" },
};

const APP_TEXT = {
  introButton: "開始",
  roleButton: "選擇此角",
  proceedButton: "進入宮門",
};
