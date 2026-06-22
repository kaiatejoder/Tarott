/* =============================================================
   app.js — Task 1: Card Data
   All 78 Rider-Waite Tarot cards.
   Images sourced from https://www.sacred-texts.com/tarot/pkt/img/
   ============================================================= */

const CARDS = [
  /* ── Major Arcana (22 cards, numbers 0–21) ── */
  { id: "fool",            name: "The Fool",           img: "https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg", arcana: "major", suit: null, number: 0  },
  { id: "magician",        name: "The Magician",        img: "https://www.sacred-texts.com/tarot/pkt/img/ar01.jpg", arcana: "major", suit: null, number: 1  },
  { id: "high-priestess",  name: "The High Priestess",  img: "https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg", arcana: "major", suit: null, number: 2  },
  { id: "empress",         name: "The Empress",         img: "https://www.sacred-texts.com/tarot/pkt/img/ar03.jpg", arcana: "major", suit: null, number: 3  },
  { id: "emperor",         name: "The Emperor",         img: "https://www.sacred-texts.com/tarot/pkt/img/ar04.jpg", arcana: "major", suit: null, number: 4  },
  { id: "hierophant",      name: "The Hierophant",      img: "https://www.sacred-texts.com/tarot/pkt/img/ar05.jpg", arcana: "major", suit: null, number: 5  },
  { id: "lovers",          name: "The Lovers",          img: "https://www.sacred-texts.com/tarot/pkt/img/ar06.jpg", arcana: "major", suit: null, number: 6  },
  { id: "chariot",         name: "The Chariot",         img: "https://www.sacred-texts.com/tarot/pkt/img/ar07.jpg", arcana: "major", suit: null, number: 7  },
  { id: "strength",        name: "Strength",            img: "https://www.sacred-texts.com/tarot/pkt/img/ar08.jpg", arcana: "major", suit: null, number: 8  },
  { id: "hermit",          name: "The Hermit",          img: "https://www.sacred-texts.com/tarot/pkt/img/ar09.jpg", arcana: "major", suit: null, number: 9  },
  { id: "wheel-fortune",   name: "Wheel of Fortune",    img: "https://www.sacred-texts.com/tarot/pkt/img/ar10.jpg", arcana: "major", suit: null, number: 10 },
  { id: "justice",         name: "Justice",             img: "https://www.sacred-texts.com/tarot/pkt/img/ar11.jpg", arcana: "major", suit: null, number: 11 },
  { id: "hanged-man",      name: "The Hanged Man",      img: "https://www.sacred-texts.com/tarot/pkt/img/ar12.jpg", arcana: "major", suit: null, number: 12 },
  { id: "death",           name: "Death",               img: "https://www.sacred-texts.com/tarot/pkt/img/ar13.jpg", arcana: "major", suit: null, number: 13 },
  { id: "temperance",      name: "Temperance",          img: "https://www.sacred-texts.com/tarot/pkt/img/ar14.jpg", arcana: "major", suit: null, number: 14 },
  { id: "devil",           name: "The Devil",           img: "https://www.sacred-texts.com/tarot/pkt/img/ar15.jpg", arcana: "major", suit: null, number: 15 },
  { id: "tower",           name: "The Tower",           img: "https://www.sacred-texts.com/tarot/pkt/img/ar16.jpg", arcana: "major", suit: null, number: 16 },
  { id: "star",            name: "The Star",            img: "https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg", arcana: "major", suit: null, number: 17 },
  { id: "moon",            name: "The Moon",            img: "https://www.sacred-texts.com/tarot/pkt/img/ar18.jpg", arcana: "major", suit: null, number: 18 },
  { id: "sun",             name: "The Sun",             img: "https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg", arcana: "major", suit: null, number: 19 },
  { id: "judgement",       name: "Judgement",           img: "https://www.sacred-texts.com/tarot/pkt/img/ar20.jpg", arcana: "major", suit: null, number: 20 },
  { id: "world",           name: "The World",           img: "https://www.sacred-texts.com/tarot/pkt/img/ar21.jpg", arcana: "major", suit: null, number: 21 },

  /* ── Minor Arcana — Wands (14 cards) ── */
  { id: "ace-wands",     name: "Ace of Wands",     img: "https://www.sacred-texts.com/tarot/pkt/img/waac.jpg", arcana: "minor", suit: "wands", number: 1  },
  { id: "two-wands",     name: "Two of Wands",     img: "https://www.sacred-texts.com/tarot/pkt/img/wa02.jpg", arcana: "minor", suit: "wands", number: 2  },
  { id: "three-wands",   name: "Three of Wands",   img: "https://www.sacred-texts.com/tarot/pkt/img/wa03.jpg", arcana: "minor", suit: "wands", number: 3  },
  { id: "four-wands",    name: "Four of Wands",    img: "https://www.sacred-texts.com/tarot/pkt/img/wa04.jpg", arcana: "minor", suit: "wands", number: 4  },
  { id: "five-wands",    name: "Five of Wands",    img: "https://www.sacred-texts.com/tarot/pkt/img/wa05.jpg", arcana: "minor", suit: "wands", number: 5  },
  { id: "six-wands",     name: "Six of Wands",     img: "https://www.sacred-texts.com/tarot/pkt/img/wa06.jpg", arcana: "minor", suit: "wands", number: 6  },
  { id: "seven-wands",   name: "Seven of Wands",   img: "https://www.sacred-texts.com/tarot/pkt/img/wa07.jpg", arcana: "minor", suit: "wands", number: 7  },
  { id: "eight-wands",   name: "Eight of Wands",   img: "https://www.sacred-texts.com/tarot/pkt/img/wa08.jpg", arcana: "minor", suit: "wands", number: 8  },
  { id: "nine-wands",    name: "Nine of Wands",    img: "https://www.sacred-texts.com/tarot/pkt/img/wa09.jpg", arcana: "minor", suit: "wands", number: 9  },
  { id: "ten-wands",     name: "Ten of Wands",     img: "https://www.sacred-texts.com/tarot/pkt/img/wa10.jpg", arcana: "minor", suit: "wands", number: 10 },
  { id: "page-wands",    name: "Page of Wands",    img: "https://www.sacred-texts.com/tarot/pkt/img/wapa.jpg", arcana: "minor", suit: "wands", number: 11 },
  { id: "knight-wands",  name: "Knight of Wands",  img: "https://www.sacred-texts.com/tarot/pkt/img/wakn.jpg", arcana: "minor", suit: "wands", number: 12 },
  { id: "queen-wands",   name: "Queen of Wands",   img: "https://www.sacred-texts.com/tarot/pkt/img/waqu.jpg", arcana: "minor", suit: "wands", number: 13 },
  { id: "king-wands",    name: "King of Wands",    img: "https://www.sacred-texts.com/tarot/pkt/img/waki.jpg", arcana: "minor", suit: "wands", number: 14 },

  /* ── Minor Arcana — Cups (14 cards) ── */
  { id: "ace-cups",     name: "Ace of Cups",     img: "https://www.sacred-texts.com/tarot/pkt/img/cuac.jpg", arcana: "minor", suit: "cups", number: 1  },
  { id: "two-cups",     name: "Two of Cups",     img: "https://www.sacred-texts.com/tarot/pkt/img/cu02.jpg", arcana: "minor", suit: "cups", number: 2  },
  { id: "three-cups",   name: "Three of Cups",   img: "https://www.sacred-texts.com/tarot/pkt/img/cu03.jpg", arcana: "minor", suit: "cups", number: 3  },
  { id: "four-cups",    name: "Four of Cups",    img: "https://www.sacred-texts.com/tarot/pkt/img/cu04.jpg", arcana: "minor", suit: "cups", number: 4  },
  { id: "five-cups",    name: "Five of Cups",    img: "https://www.sacred-texts.com/tarot/pkt/img/cu05.jpg", arcana: "minor", suit: "cups", number: 5  },
  { id: "six-cups",     name: "Six of Cups",     img: "https://www.sacred-texts.com/tarot/pkt/img/cu06.jpg", arcana: "minor", suit: "cups", number: 6  },
  { id: "seven-cups",   name: "Seven of Cups",   img: "https://www.sacred-texts.com/tarot/pkt/img/cu07.jpg", arcana: "minor", suit: "cups", number: 7  },
  { id: "eight-cups",   name: "Eight of Cups",   img: "https://www.sacred-texts.com/tarot/pkt/img/cu08.jpg", arcana: "minor", suit: "cups", number: 8  },
  { id: "nine-cups",    name: "Nine of Cups",    img: "https://www.sacred-texts.com/tarot/pkt/img/cu09.jpg", arcana: "minor", suit: "cups", number: 9  },
  { id: "ten-cups",     name: "Ten of Cups",     img: "https://www.sacred-texts.com/tarot/pkt/img/cu10.jpg", arcana: "minor", suit: "cups", number: 10 },
  { id: "page-cups",    name: "Page of Cups",    img: "https://www.sacred-texts.com/tarot/pkt/img/cupa.jpg", arcana: "minor", suit: "cups", number: 11 },
  { id: "knight-cups",  name: "Knight of Cups",  img: "https://www.sacred-texts.com/tarot/pkt/img/cukn.jpg", arcana: "minor", suit: "cups", number: 12 },
  { id: "queen-cups",   name: "Queen of Cups",   img: "https://www.sacred-texts.com/tarot/pkt/img/cuqu.jpg", arcana: "minor", suit: "cups", number: 13 },
  { id: "king-cups",    name: "King of Cups",    img: "https://www.sacred-texts.com/tarot/pkt/img/cuki.jpg", arcana: "minor", suit: "cups", number: 14 },

  /* ── Minor Arcana — Swords (14 cards) ── */
  { id: "ace-swords",     name: "Ace of Swords",     img: "https://www.sacred-texts.com/tarot/pkt/img/swac.jpg", arcana: "minor", suit: "swords", number: 1  },
  { id: "two-swords",     name: "Two of Swords",     img: "https://www.sacred-texts.com/tarot/pkt/img/sw02.jpg", arcana: "minor", suit: "swords", number: 2  },
  { id: "three-swords",   name: "Three of Swords",   img: "https://www.sacred-texts.com/tarot/pkt/img/sw03.jpg", arcana: "minor", suit: "swords", number: 3  },
  { id: "four-swords",    name: "Four of Swords",    img: "https://www.sacred-texts.com/tarot/pkt/img/sw04.jpg", arcana: "minor", suit: "swords", number: 4  },
  { id: "five-swords",    name: "Five of Swords",    img: "https://www.sacred-texts.com/tarot/pkt/img/sw05.jpg", arcana: "minor", suit: "swords", number: 5  },
  { id: "six-swords",     name: "Six of Swords",     img: "https://www.sacred-texts.com/tarot/pkt/img/sw06.jpg", arcana: "minor", suit: "swords", number: 6  },
  { id: "seven-swords",   name: "Seven of Swords",   img: "https://www.sacred-texts.com/tarot/pkt/img/sw07.jpg", arcana: "minor", suit: "swords", number: 7  },
  { id: "eight-swords",   name: "Eight of Swords",   img: "https://www.sacred-texts.com/tarot/pkt/img/sw08.jpg", arcana: "minor", suit: "swords", number: 8  },
  { id: "nine-swords",    name: "Nine of Swords",    img: "https://www.sacred-texts.com/tarot/pkt/img/sw09.jpg", arcana: "minor", suit: "swords", number: 9  },
  { id: "ten-swords",     name: "Ten of Swords",     img: "https://www.sacred-texts.com/tarot/pkt/img/sw10.jpg", arcana: "minor", suit: "swords", number: 10 },
  { id: "page-swords",    name: "Page of Swords",    img: "https://www.sacred-texts.com/tarot/pkt/img/swpa.jpg", arcana: "minor", suit: "swords", number: 11 },
  { id: "knight-swords",  name: "Knight of Swords",  img: "https://www.sacred-texts.com/tarot/pkt/img/swkn.jpg", arcana: "minor", suit: "swords", number: 12 },
  { id: "queen-swords",   name: "Queen of Swords",   img: "https://www.sacred-texts.com/tarot/pkt/img/swqu.jpg", arcana: "minor", suit: "swords", number: 13 },
  { id: "king-swords",    name: "King of Swords",    img: "https://www.sacred-texts.com/tarot/pkt/img/swki.jpg", arcana: "minor", suit: "swords", number: 14 },

  /* ── Minor Arcana — Pentacles (14 cards) ── */
  { id: "ace-pentacles",     name: "Ace of Pentacles",     img: "https://www.sacred-texts.com/tarot/pkt/img/peac.jpg", arcana: "minor", suit: "pentacles", number: 1  },
  { id: "two-pentacles",     name: "Two of Pentacles",     img: "https://www.sacred-texts.com/tarot/pkt/img/pe02.jpg", arcana: "minor", suit: "pentacles", number: 2  },
  { id: "three-pentacles",   name: "Three of Pentacles",   img: "https://www.sacred-texts.com/tarot/pkt/img/pe03.jpg", arcana: "minor", suit: "pentacles", number: 3  },
  { id: "four-pentacles",    name: "Four of Pentacles",    img: "https://www.sacred-texts.com/tarot/pkt/img/pe04.jpg", arcana: "minor", suit: "pentacles", number: 4  },
  { id: "five-pentacles",    name: "Five of Pentacles",    img: "https://www.sacred-texts.com/tarot/pkt/img/pe05.jpg", arcana: "minor", suit: "pentacles", number: 5  },
  { id: "six-pentacles",     name: "Six of Pentacles",     img: "https://www.sacred-texts.com/tarot/pkt/img/pe06.jpg", arcana: "minor", suit: "pentacles", number: 6  },
  { id: "seven-pentacles",   name: "Seven of Pentacles",   img: "https://www.sacred-texts.com/tarot/pkt/img/pe07.jpg", arcana: "minor", suit: "pentacles", number: 7  },
  { id: "eight-pentacles",   name: "Eight of Pentacles",   img: "https://www.sacred-texts.com/tarot/pkt/img/pe08.jpg", arcana: "minor", suit: "pentacles", number: 8  },
  { id: "nine-pentacles",    name: "Nine of Pentacles",    img: "https://www.sacred-texts.com/tarot/pkt/img/pe09.jpg", arcana: "minor", suit: "pentacles", number: 9  },
  { id: "ten-pentacles",     name: "Ten of Pentacles",     img: "https://www.sacred-texts.com/tarot/pkt/img/pe10.jpg", arcana: "minor", suit: "pentacles", number: 10 },
  { id: "page-pentacles",    name: "Page of Pentacles",    img: "https://www.sacred-texts.com/tarot/pkt/img/pepa.jpg", arcana: "minor", suit: "pentacles", number: 11 },
  { id: "knight-pentacles",  name: "Knight of Pentacles",  img: "https://www.sacred-texts.com/tarot/pkt/img/pekn.jpg", arcana: "minor", suit: "pentacles", number: 12 },
  { id: "queen-pentacles",   name: "Queen of Pentacles",   img: "https://www.sacred-texts.com/tarot/pkt/img/pequ.jpg", arcana: "minor", suit: "pentacles", number: 13 },
  { id: "king-pentacles",    name: "King of Pentacles",    img: "https://www.sacred-texts.com/tarot/pkt/img/peki.jpg", arcana: "minor", suit: "pentacles", number: 14 },
];

/* Expose on window for other scripts to consume */
window.TAROT = { CARDS };

/* Quick sanity check in dev console */
console.assert(CARDS.length === 78, `Expected 78 cards, got ${CARDS.length}`);

/* =============================================================
   app.js — Task 2: Deck Logic
   State management, shuffle, draw, card element creation,
   return-to-deck, and event listeners.
   ============================================================= */

/* ── State ── */
let deck = [];        // cards remaining in deck (shuffle order)
let drawnCards = [];  // cards currently on the tapete

/* ── getActiveDeckSource ── */
function getActiveDeckSource() {
  const modeEl = document.getElementById('deckMode');
  const mode = modeEl ? modeEl.value : 'full';
  if (mode === 'major') {
    return CARDS.filter(c => c.arcana === 'major');
  }
  return CARDS;
}

/* ── reversedEnabled ── */
function reversedEnabled() {
  const el = document.getElementById('reversedToggle');
  return el ? el.checked : true;
}

/* ── initDeck ── */
function initDeck() {
  deck = [...getActiveDeckSource()];
  drawnCards = [];

  const deckCountEl = document.getElementById('deckCount');
  if (deckCountEl) deckCountEl.textContent = deck.length;

  const container = document.getElementById('cardsContainer');
  if (container) {
    container.querySelectorAll('.tarot-card').forEach(el => el.remove());
  }
}

/* ── shuffleDeck ── */
function shuffleDeck() {
  // Fisher-Yates in-place shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // 3% chance: a card falls while shuffling
  if (Math.random() < 0.03 && deck.length > 0) {
    const fallenEl = drawCard();
    if (fallenEl) {
      fallenEl.classList.add('fell');
    }
  }

  // Animate the deck element
  const deckEl = document.getElementById('deck');
  if (deckEl) {
    deckEl.classList.add('shuffling');
    setTimeout(() => deckEl.classList.remove('shuffling'), 600);
  }

  const deckCountEl = document.getElementById('deckCount');
  if (deckCountEl) deckCountEl.textContent = deck.length;
}

/* ── drawCard ── */
function drawCard() {
  if (deck.length === 0) {
    alert('La baraja está vacía');
    return null;
  }

  const card = deck.pop();
  const reversed = reversedEnabled() && Math.random() < 0.2;

  drawnCards.push({ ...card, reversed });

  const cardEl = createCardElement(card, reversed);
  const container = document.getElementById('cardsContainer');
  if (container) container.appendChild(cardEl);

  const deckCountEl = document.getElementById('deckCount');
  if (deckCountEl) deckCountEl.textContent = deck.length;

  return cardEl;
}

/* ── createCardElement ── */
function createCardElement(card, reversed) {
  const container = document.getElementById('cardsContainer');
  const containerRect = container
    ? container.getBoundingClientRect()
    : { width: 300, height: 400 };

  // Center of the container plus a small random offset
  const offsetX = (Math.random() * 100) - 50;  // ±50 px
  const offsetY = (Math.random() * 60) - 30;   // ±30 px
  const left = containerRect.width / 2 + offsetX;
  const top  = containerRect.height / 2 + offsetY;

  const el = document.createElement('div');
  el.className = 'tarot-card' + (reversed ? ' reversed' : '');
  el.dataset.id = card.id;
  el.dataset.reversed = reversed;

  // JS-set positioning (only acceptable use of inline styles per spec)
  el.style.left = left + 'px';
  el.style.top  = top  + 'px';

  // Store initial position for drag logic (Task 3)
  el.dataset.startX = left;
  el.dataset.startY = top;

  const img = document.createElement('img');
  img.src = card.img;
  img.alt = card.name;
  img.draggable = false;

  el.appendChild(img);
  return el;
}

/* ── returnCardToDeck ── */
function returnCardToDeck(cardElement) {
  const id = cardElement.dataset.id;
  const card = window.TAROT.CARDS.find(c => c.id === id);

  if (card) {
    deck.unshift(card);  // return to top (beginning) of deck
  }

  // Remove from drawnCards tracking array
  drawnCards = drawnCards.filter(c => c.id !== id);

  cardElement.remove();

  const deckCountEl = document.getElementById('deckCount');
  if (deckCountEl) deckCountEl.textContent = deck.length;
}

/* ── Topic state ── */
let activeTopic = null;  // 'amor' | 'trabajo' | 'familia' | 'amigos' | null

function setActiveTopic(topic) {
  activeTopic = (activeTopic === topic) ? null : topic;
  document.querySelectorAll('.topic').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.topic === activeTopic);
  });
}

function getActiveTopic() {
  return activeTopic;
}

/* ── Yes/No interpretation ── */
const YES_IDS  = new Set(['fool','magician','empress','emperor','lovers','chariot','strength','wheel-fortune','temperance','star','sun','world','judgement']);
const NO_IDS   = new Set(['hanged-man','death','devil','tower','moon']);
const MAYBE_IDS= new Set(['high-priestess','hierophant','hermit','justice']);

function getCardAnswer(card, reversed) {
  let verdict;
  if (YES_IDS.has(card.id))         verdict = 'yes';
  else if (NO_IDS.has(card.id))     verdict = 'no';
  else if (MAYBE_IDS.has(card.id))  verdict = 'maybe';
  else if (card.number === 1)       verdict = 'yes';                  // aces
  else if (card.suit === 'wands')   verdict = 'yes';
  else if (card.suit === 'cups')    verdict = [5, 8].includes(card.number) ? 'no' : 'yes';
  else if (card.suit === 'swords')  verdict = [2, 6].includes(card.number) ? 'maybe' : 'no';
  else if (card.suit === 'pentacles') verdict = [5].includes(card.number) ? 'no' : 'maybe';
  else verdict = 'maybe';

  if (reversed) {
    if (verdict === 'yes')      verdict = 'no';
    else if (verdict === 'no')  verdict = 'yes';
  }
  return verdict;
}

/* ── Re-expose everything on window.TAROT ── */
window.TAROT = {
  CARDS,
  initDeck,
  shuffleDeck,
  drawCard,
  createCardElement,
  returnCardToDeck,
  setActiveTopic,
  getActiveTopic,
  getCardAnswer,
  drawnCards: () => drawnCards,
};

/* ── Event listeners ── */
document.getElementById('btnShuffle').addEventListener('click', shuffleDeck);
document.getElementById('btnDraw').addEventListener('click', drawCard);

const deckModeEl = document.getElementById('deckMode');
if (deckModeEl) {
  deckModeEl.addEventListener('change', initDeck);
}

document.querySelectorAll('.topic').forEach(btn => {
  btn.addEventListener('click', () => setActiveTopic(btn.dataset.topic));
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initDeck);
