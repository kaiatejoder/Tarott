/* =============================================================
   interactions.js — Task 3: Card Interactions
   Drag/drop (mouse + touch), double-click/double-tap return,
   long-press context menu (mobile), right-click context menu,
   context menu actions, and z-index management.
   ============================================================= */

(function () {
  'use strict';

  /* ── Module-level state ── */
  let zCounter      = 10;     // incremented each time a card is brought to top
  let isDragging    = false;  // true while a drag is in progress
  let wasDragged    = false;  // set to true if pointer moved during a drag; reset on mousedown/touchstart
  let dragCard      = null;   // the card element currently being dragged
  let dragOffsetX   = 0;
  let dragOffsetY   = 0;

  let contextCard   = null;   // card that was right-clicked / long-pressed
  let longPressTimer = null;  // touch long-press timer

  // Double-tap tracking (touch)
  let lastTapTime   = 0;
  let lastTapCard   = null;

  /* ── DOM references (set after DOMContentLoaded) ── */
  let cardsContainer;
  let contextMenu;
  let ctxSearch;
  let ctxAnswer;
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

  /* ── Z-index for newly drawn cards via MutationObserver ── */

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

  /* ================================================================
     MOUSE DRAG
     ================================================================ */

  function onMouseDown(e) {
    const card = e.target.closest('.tarot-card');
    if (!card) return;

    e.preventDefault();  // prevent text selection during drag

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
    const newLeft = e.clientX - containerRect.left - dragOffsetX;
    const newTop  = e.clientY - containerRect.top  - dragOffsetY;

    dragCard.style.left = newLeft + 'px';
    dragCard.style.top  = newTop  + 'px';
  }

  function onMouseUp() {
    if (!isDragging || !dragCard) return;

    dragCard.classList.remove('dragging');
    isDragging = false;
    dragCard   = null;
  }

  /* ================================================================
     TOUCH DRAG
     ================================================================ */

  function onTouchStart(e) {
    const card = e.target.closest('.tarot-card');
    if (!card) return;

    // Double-tap detection (return to deck)
    const now = Date.now();
    if (lastTapCard === card && now - lastTapTime < 300) {
      // Double-tap — return card to deck
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

    // Start long-press timer → show context menu at 600 ms
    clearLongPressTimer();
    longPressTimer = setTimeout(function () {
      longPressTimer = null;
      // Only fire if we haven't moved (wasDragged stays false until touchmove)
      if (!wasDragged) {
        // Use last known touch coordinates
        const t = e.touches[0] || e.changedTouches[0];
        showContextMenu(card, t.clientX, t.clientY);
      }
    }, 600);
  }

  function onTouchMove(e) {
    if (!isDragging || !dragCard) return;

    e.preventDefault();   // prevent page scroll while dragging a card
    wasDragged = true;
    clearLongPressTimer();

    const touch = e.touches[0];
    const containerRect = cardsContainer.getBoundingClientRect();
    const newLeft = touch.clientX - containerRect.left - dragOffsetX;
    const newTop  = touch.clientY - containerRect.top  - dragOffsetY;

    dragCard.style.left = newLeft + 'px';
    dragCard.style.top  = newTop  + 'px';
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

  /* ================================================================
     DOUBLE-CLICK (mouse — return to deck)
     ================================================================ */

  function onDblClick(e) {
    const card = e.target.closest('.tarot-card');
    if (!card) return;

    // Ignore if this was the end of a real drag
    if (wasDragged) return;

    window.TAROT.returnCardToDeck(card);
  }

  /* ================================================================
     RIGHT-CLICK CONTEXT MENU
     ================================================================ */

  function onContextMenu(e) {
    const card = e.target.closest('.tarot-card');
    e.preventDefault();   // always suppress native menu on container
    if (!card) return;

    showContextMenu(card, e.clientX, e.clientY);
  }

  /* ================================================================
     CONTEXT MENU ACTIONS
     ================================================================ */

  const TOPIC_LABELS = {
    amor:     'Amor',
    trabajo:  'Trabajo',
    familia:  'Familia',
    amigos:   'Amigos',
  };

  const VERDICT_TEXT = {
    yes:   { label: 'SÍ',     detail: 'Las energías favorecen esta cuestión.' },
    no:    { label: 'NO',     detail: 'Las energías no acompañan en este momento.' },
    maybe: { label: 'QUIZÁS', detail: 'Hay matices: medita la pregunta y vuelve a tirar.' },
  };

  function onCtxSearch() {
    if (!contextCard) return;
    const cardData = window.TAROT.CARDS.find(
      function (c) { return c.id === contextCard.dataset.id; }
    );
    if (cardData) {
      const topic = window.TAROT.getActiveTopic && window.TAROT.getActiveTopic();
      let query = 'tarot ' + cardData.name + ' Rider Waite';
      if (contextCard.dataset.reversed === 'true') query += ' invertida';
      if (topic) query += ' ' + topic;
      query += ' significado';
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
      window.open(url, '_blank');
    }
    hideContextMenu();
  }

  function onCtxAnswer() {
    if (!contextCard) return;
    const cardData = window.TAROT.CARDS.find(
      function (c) { return c.id === contextCard.dataset.id; }
    );
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

  /* ================================================================
     HIDE MENU ON OUTSIDE CLICK
     ================================================================ */

  function onDocumentClick(e) {
    // Hide if click is outside the context menu
    if (!contextMenu.contains(e.target)) {
      hideContextMenu();
    }
  }

  /* ================================================================
     INIT — wire up all listeners after DOM is ready
     ================================================================ */

  function init() {
    cardsContainer = document.getElementById('cardsContainer');
    contextMenu    = document.getElementById('contextMenu');
    ctxSearch      = document.getElementById('ctxSearch');
    ctxAnswer      = document.getElementById('ctxAnswer');
    ctxReturn      = document.getElementById('ctxReturn');
    answerOverlay  = document.getElementById('answerOverlay');

    // --- Mouse drag (delegated on container) ---
    cardsContainer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup',   onMouseUp);

    // --- Touch drag (delegated on container) ---
    cardsContainer.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove',  onTouchMove,  { passive: false });
    document.addEventListener('touchend',   onTouchEnd);

    // --- Double-click return (delegated on container) ---
    cardsContainer.addEventListener('dblclick', onDblClick);

    // --- Right-click context menu ---
    cardsContainer.addEventListener('contextmenu', onContextMenu);

    // --- Context menu item clicks ---
    ctxSearch.addEventListener('click', onCtxSearch);
    ctxAnswer.addEventListener('click', onCtxAnswer);
    ctxReturn.addEventListener('click', onCtxReturn);

    // --- Answer overlay close ---
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

    // --- Dismiss context menu on outside click ---
    document.addEventListener('click', onDocumentClick);

    // --- Assign z-index to cards already on the table (e.g. from initDeck) ---
    cardsContainer.querySelectorAll('.tarot-card').forEach(bringToTop);

    // --- Watch for future cards added by drawCard() ---
    observeNewCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
