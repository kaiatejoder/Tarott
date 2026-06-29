/* =============================================================
   interactions.js — Drag, context menu, nav drawer, spread panel
   ============================================================= */

(function () {
  'use strict';

  let zCounter      = 10;
  let isDragging    = false;
  let wasDragged    = false;
  let dragCard      = null;
  let dragOffsetX   = 0;
  let dragOffsetY   = 0;

  let contextCard   = null;
  let longPressTimer = null;

  let lastTapTime   = 0;
  let lastTapCard   = null;

  let cardsContainer;
  let contextMenu;
  let ctxSearch;
  let ctxAnswer;
  let ctxNotion;
  let ctxReturn;
  let answerOverlay;

  /* ── Helpers ── */

  function bringToTop(card) {
    zCounter += 1;
    card.style.zIndex = zCounter;
  }

  function showContextMenu(card, x, y) {
    contextCard = card;
    contextMenu.style.left = x + 'px';
    contextMenu.style.top  = y + 'px';
    contextMenu.classList.add('visible');
  }

  function hideContextMenu() {
    contextMenu.classList.remove('visible');
    contextCard = null;
  }

  function observeNewCards() {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE &&
              node.classList.contains('tarot-card') &&
              !node.style.zIndex) {
            bringToTop(node);
          }
        });
      });
    });
    observer.observe(cardsContainer, { childList: true });
  }

  /* ── Mouse drag ── */

  function onMouseDown(e) {
    const card = e.target.closest('.tarot-card');
    if (!card) return;
    e.preventDefault();

    wasDragged = false;
    dragCard   = card;

    const rect = card.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    bringToTop(card);
    card.classList.add('dragging');
    isDragging = true;
  }

  function onMouseMove(e) {
    if (!isDragging || !dragCard) return;
    wasDragged = true;
    const containerRect = cardsContainer.getBoundingClientRect();
    dragCard.style.left = (e.clientX - containerRect.left - dragOffsetX) + 'px';
    dragCard.style.top  = (e.clientY - containerRect.top  - dragOffsetY) + 'px';
  }

  function onMouseUp() {
    if (!isDragging || !dragCard) return;
    dragCard.classList.remove('dragging');
    isDragging = false;
    dragCard   = null;
  }

  /* ── Touch drag ── */

  function onTouchStart(e) {
    const card = e.target.closest('.tarot-card');
    if (!card) return;

    const now = Date.now();
    if (lastTapCard === card && now - lastTapTime < 300) {
      clearLongPressTimer();
      lastTapTime = 0;
      lastTapCard = null;
      window.TAROT.returnCardToDeck(card);
      return;
    }
    lastTapTime = now;
    lastTapCard = card;

    wasDragged  = false;
    dragCard    = card;

    const touch = e.touches[0];
    const rect  = card.getBoundingClientRect();
    dragOffsetX = touch.clientX - rect.left;
    dragOffsetY = touch.clientY - rect.top;

    bringToTop(card);
    card.classList.add('dragging');
    isDragging = true;

    clearLongPressTimer();
    longPressTimer = setTimeout(function () {
      longPressTimer = null;
      if (!wasDragged) {
        const t = e.touches[0] || e.changedTouches[0];
        showContextMenu(card, t.clientX, t.clientY);
      }
    }, 600);
  }

  function onTouchMove(e) {
    if (!isDragging || !dragCard) return;
    e.preventDefault();
    wasDragged = true;
    clearLongPressTimer();

    const touch = e.touches[0];
    const containerRect = cardsContainer.getBoundingClientRect();
    dragCard.style.left = (touch.clientX - containerRect.left - dragOffsetX) + 'px';
    dragCard.style.top  = (touch.clientY - containerRect.top  - dragOffsetY) + 'px';
  }

  function onTouchEnd() {
    clearLongPressTimer();
    if (!dragCard) return;
    dragCard.classList.remove('dragging');
    isDragging = false;
    dragCard   = null;
  }

  function clearLongPressTimer() {
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }

  function onDblClick(e) {
    const card = e.target.closest('.tarot-card');
    if (!card) return;
    if (wasDragged) return;
    window.TAROT.returnCardToDeck(card);
  }

  function onContextMenu(e) {
    const card = e.target.closest('.tarot-card');
    e.preventDefault();
    if (!card) return;
    showContextMenu(card, e.clientX, e.clientY);
  }

  /* ── Context menu actions ── */

  const TOPIC_LABELS = {
    amor: 'Amor', trabajo: 'Trabajo', familia: 'Familia', amigos: 'Amigos',
  };

  const VERDICT_TEXT = {
    yes:   { label: 'SÍ',     detail: 'Las energías favorecen esta cuestión.' },
    no:    { label: 'NO',     detail: 'Las energías no acompañan en este momento.' },
    maybe: { label: 'QUIZÁS', detail: 'Hay matices: medita la pregunta y vuelve a tirar.' },
  };

  function onCtxSearch() {
    if (!contextCard) return;
    const cardData = window.TAROT.findCardAnywhere(contextCard.dataset.id);
    if (cardData) {
      const topic = window.TAROT.getActiveTopic && window.TAROT.getActiveTopic();
      let query = 'tarot ' + cardData.name;
      if (contextCard.dataset.reversed === 'true') query += ' invertida';
      if (topic) query += ' ' + topic;
      query += ' significado';
      window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    }
    hideContextMenu();
  }

  function onCtxNotion() {
    if (!contextCard) return;
    const cardData = window.TAROT.findCardAnywhere(contextCard.dataset.id);
    if (cardData) {
      const url = 'https://www.notion.so/search?query=' + encodeURIComponent(cardData.name);
      window.open(url, '_blank');
    }
    hideContextMenu();
  }

  function onCtxAnswer() {
    if (!contextCard) return;
    const cardData = window.TAROT.findCardAnywhere(contextCard.dataset.id);
    if (!cardData) { hideContextMenu(); return; }

    const reversed = contextCard.dataset.reversed === 'true';
    const verdict  = window.TAROT.getCardAnswer(cardData, reversed);
    const topic    = window.TAROT.getActiveTopic && window.TAROT.getActiveTopic();
    showAnswer(cardData, reversed, verdict, topic);
    hideContextMenu();
  }

  function showAnswer(card, reversed, verdict, topic) {
    const v = VERDICT_TEXT[verdict];
    document.getElementById('answerTopic').textContent =
      topic ? 'Sobre ' + TOPIC_LABELS[topic] : 'Respuesta general';
    document.getElementById('answerCard').textContent =
      card.name + (reversed ? ' (invertida)' : '');
    const verdictEl = document.getElementById('answerVerdict');
    verdictEl.textContent = v.label;
    verdictEl.dataset.verdict = verdict;
    document.getElementById('answerDetail').textContent = v.detail;
    answerOverlay.hidden = false;
  }

  function hideAnswer() {
    if (answerOverlay) answerOverlay.hidden = true;
  }

  function onCtxReturn() {
    if (!contextCard) return;
    window.TAROT.returnCardToDeck(contextCard);
    hideContextMenu();
  }

  function onDocumentClick(e) {
    if (!contextMenu.contains(e.target)) hideContextMenu();
  }

  /* ================================================================
     NAV DRAWER (hamburger)
     ================================================================ */

  function initNavDrawer() {
    const btn      = document.getElementById('navToggle');
    const drawer   = document.getElementById('navDrawer');
    const close    = document.getElementById('navClose');
    const backdrop = document.getElementById('navBackdrop');
    if (!btn || !drawer) return;

    function open() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      backdrop.hidden = false;
    }
    function shut() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      backdrop.hidden = true;
    }

    btn.addEventListener('click', () => {
      drawer.classList.contains('open') ? shut() : open();
    });
    if (close) close.addEventListener('click', shut);
    if (backdrop) backdrop.addEventListener('click', shut);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });
  }

  /* ================================================================
     SPREAD PANEL
     ================================================================ */

  function initSpreadPanel() {
    const btn   = document.getElementById('spreadToggle');
    const panel = document.getElementById('spreadPanel');
    const close = document.getElementById('spreadClose');
    if (!btn || !panel) return;

    function open() {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      renderSpreadList();
    }
    function shut() {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', () => {
      panel.classList.contains('open') ? shut() : open();
    });
    if (close) close.addEventListener('click', shut);

    const apply = document.getElementById('btnApplyTemplate');
    if (apply) apply.addEventListener('click', applySpreadTemplate);
  }

  function renderSpreadList() {
    const list  = document.getElementById('spreadList');
    const count = document.getElementById('spreadCount');
    if (!list) return;

    const drawn = window.TAROT.drawnCards();
    if (count) count.textContent = drawn.length;
    list.innerHTML = '';

    const positions = currentPositionLabels();

    drawn.forEach((card, i) => {
      const li = document.createElement('li');
      li.className = 'spread-item';
      li.innerHTML = `
        <span class="spread-pos">${positions[i] || (i + 1)}</span>
        <span class="spread-name">${card.name}${card.reversed ? ' <em>(inv)</em>' : ''}</span>
      `;
      li.addEventListener('click', () => {
        const els = document.querySelectorAll('.tarot-card');
        const el = els[i];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          zCounter += 1;
          el.style.zIndex = zCounter;
          el.classList.add('focus-flash');
          setTimeout(() => el.classList.remove('focus-flash'), 800);
        }
      });
      list.appendChild(li);
    });
  }

  /* ── Spread templates (positions on tapete in % of container) ── */
  const TEMPLATES = {
    free: { labels: [], positions: [] },
    one: {
      labels: ['Carta'],
      positions: [{ x: 0.5, y: 0.5 }],
    },
    three: {
      labels: ['Pasado', 'Presente', 'Futuro'],
      positions: [
        { x: 0.30, y: 0.5 },
        { x: 0.50, y: 0.5 },
        { x: 0.70, y: 0.5 },
      ],
    },
    cross: {
      labels: ['Situación', 'Cruza', 'Base', 'Pasado', 'Futuro', 'Corona',
               'Tú', 'Entorno', 'Esperanzas', 'Resultado'],
      positions: [
        { x: 0.40, y: 0.55 },
        { x: 0.40, y: 0.55, rot: 90 },
        { x: 0.40, y: 0.80 },
        { x: 0.22, y: 0.55 },
        { x: 0.58, y: 0.55 },
        { x: 0.40, y: 0.28 },
        { x: 0.82, y: 0.85 },
        { x: 0.82, y: 0.65 },
        { x: 0.82, y: 0.45 },
        { x: 0.82, y: 0.25 },
      ],
    },
    horseshoe: {
      labels: ['Pasado', 'Presente', 'Futuro próximo', 'Consejo', 'Influencias', 'Obstáculos', 'Resultado'],
      positions: [
        { x: 0.20, y: 0.75 },
        { x: 0.30, y: 0.50 },
        { x: 0.40, y: 0.30 },
        { x: 0.55, y: 0.20 },
        { x: 0.70, y: 0.30 },
        { x: 0.80, y: 0.50 },
        { x: 0.90, y: 0.75 },
      ],
    },
  };

  function currentTemplate() {
    const sel = document.getElementById('spreadTemplate');
    const key = sel ? sel.value : 'free';
    return TEMPLATES[key] || TEMPLATES.free;
  }

  function currentPositionLabels() {
    return currentTemplate().labels;
  }

  function applySpreadTemplate() {
    const tpl = currentTemplate();
    const container = cardsContainer;
    const positionsLayer = document.getElementById('spreadPositions');
    if (!container) return;

    // Clear table + clear position markers
    window.TAROT.clearTable();
    if (positionsLayer) positionsLayer.innerHTML = '';

    if (!tpl.positions.length) {
      renderSpreadList();
      return;
    }

    const rect = container.getBoundingClientRect();
    const cardW = 120;
    const cardH = 210;

    // Render labels behind
    if (positionsLayer) {
      tpl.positions.forEach((p, i) => {
        const marker = document.createElement('div');
        marker.className = 'spread-marker';
        marker.style.left = (p.x * rect.width - cardW / 2) + 'px';
        marker.style.top  = (p.y * rect.height - cardH / 2) + 'px';
        marker.textContent = tpl.labels[i] || (i + 1);
        if (p.rot) marker.style.transform = `rotate(${p.rot}deg)`;
        positionsLayer.appendChild(marker);
      });
    }

    // Draw one card per position into target slot
    let i = 0;
    function drawNext() {
      if (i >= tpl.positions.length) { renderSpreadList(); return; }
      const p = tpl.positions[i];
      const x = p.x * rect.width  - cardW / 2;
      const y = p.y * rect.height - cardH / 2;
      const el = window.TAROT.drawCard({ x, y });
      if (el && p.rot) {
        el.dataset.tplRot = p.rot;
        el.classList.add('rot-' + p.rot);
      }
      i++;
      setTimeout(drawNext, 150);
    }
    drawNext();
  }

  /* ================================================================
     CUSTOM IMAGES (deck back + mat)
     ================================================================ */

  const LS_BACK = 'tarott.deckBack';
  const LS_MAT  = 'tarott.mat';

  function applyDeckBack(dataUrl) {
    const deck = document.getElementById('deck');
    const label = deck && deck.querySelector('.deck-back-label');
    if (!deck) return;
    if (dataUrl) {
      deck.classList.add('custom-back');
      deck.style.backgroundImage = `url("${dataUrl}")`;
      if (label) label.style.display = 'none';
    } else {
      deck.classList.remove('custom-back');
      deck.style.backgroundImage = '';
      if (label) label.style.display = '';
    }
  }

  function applyMat(dataUrl) {
    const tapete = document.querySelector('.tapete');
    if (!tapete) return;
    if (dataUrl) {
      tapete.classList.add('custom-mat');
      tapete.style.backgroundImage = `url("${dataUrl}")`;
    } else {
      tapete.classList.remove('custom-mat');
      tapete.style.backgroundImage = '';
    }
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  function initCustomImages() {
    // Restore from localStorage
    try {
      const back = localStorage.getItem(LS_BACK);
      const mat  = localStorage.getItem(LS_MAT);
      if (back) applyDeckBack(back);
      if (mat)  applyMat(mat);
    } catch (e) { /* ignore */ }

    const backInput = document.getElementById('backImageInput');
    if (backInput) {
      backInput.addEventListener('change', async e => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const url = await readFileAsDataUrl(f);
        applyDeckBack(url);
        try { localStorage.setItem(LS_BACK, url); } catch (e) {}
      });
    }

    const matInput = document.getElementById('matImageInput');
    if (matInput) {
      matInput.addEventListener('change', async e => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const url = await readFileAsDataUrl(f);
        applyMat(url);
        try { localStorage.setItem(LS_MAT, url); } catch (e) {}
      });
    }

    const reset = document.getElementById('btnResetCustom');
    if (reset) {
      reset.addEventListener('click', () => {
        applyDeckBack(null);
        applyMat(null);
        try {
          localStorage.removeItem(LS_BACK);
          localStorage.removeItem(LS_MAT);
        } catch (e) {}
        if (backInput) backInput.value = '';
        if (matInput)  matInput.value = '';
      });
    }
  }

  /* ================================================================
     INIT
     ================================================================ */

  function init() {
    cardsContainer = document.getElementById('cardsContainer');
    contextMenu    = document.getElementById('contextMenu');
    ctxSearch      = document.getElementById('ctxSearch');
    ctxAnswer      = document.getElementById('ctxAnswer');
    ctxNotion      = document.getElementById('ctxNotion');
    ctxReturn      = document.getElementById('ctxReturn');
    answerOverlay  = document.getElementById('answerOverlay');

    cardsContainer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup',   onMouseUp);

    cardsContainer.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove',  onTouchMove,  { passive: false });
    document.addEventListener('touchend',   onTouchEnd);

    cardsContainer.addEventListener('dblclick', onDblClick);
    cardsContainer.addEventListener('contextmenu', onContextMenu);

    ctxSearch.addEventListener('click', onCtxSearch);
    ctxAnswer.addEventListener('click', onCtxAnswer);
    if (ctxNotion) ctxNotion.addEventListener('click', onCtxNotion);
    ctxReturn.addEventListener('click', onCtxReturn);

    const closeBtn = document.getElementById('answerClose');
    if (closeBtn) closeBtn.addEventListener('click', hideAnswer);
    if (answerOverlay) {
      answerOverlay.addEventListener('click', function (e) {
        if (e.target === answerOverlay) hideAnswer();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideAnswer();
    });

    document.addEventListener('click', onDocumentClick);

    cardsContainer.querySelectorAll('.tarot-card').forEach(bringToTop);
    observeNewCards();

    initNavDrawer();
    initSpreadPanel();
    initCustomImages();

    // Hook so app.js can notify us when drawn set changes
    if (window.TAROT) {
      window.TAROT.onDrawnChanged = renderSpreadList;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
