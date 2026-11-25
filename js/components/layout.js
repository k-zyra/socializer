function renderLayout() {
  return `
    <aside class="sidebar">
      <a class="brand" href="#" aria-label="Socializer">
        <span class="brand-mark">S</span>
        <span>socializer</span>
      </a>
      <nav class="nav" aria-label="Główna nawigacja">
        <button class="nav-item active" data-view="overview"><span>⌂</span> Przegląd</button>
        <button class="nav-item" data-view="venues"><span>⌖</span> Miejscówki</button>
        <button class="nav-item" data-view="expenses"><span>₽</span> Koszty</button>
        <button class="nav-item" data-view="attendance"><span>◎</span> Obecność</button>
      </nav>
      <div class="sidebar-bottom">
        <div class="mini-profile">
          <div class="avatar">MK</div>
          <div><strong>Marta</strong><small>Organizatorka</small></div>
        </div>
      </div>
    </aside>

    <main>
      <header class="topbar">
        <button class="mobile-menu" aria-label="Otwórz menu">☰</button>
        <div class="breadcrumb"><span>Spotkania</span><b>/</b><strong>Letni wypad nad wodę</strong></div>
        <button class="icon-button" id="shareBtn" title="Udostępnij">↗</button>
      </header>
      <div class="content">
        ${renderDashboard()}
      </div>
    </main>

    <dialog id="modal">
      <form method="dialog" id="modalForm">
        <div class="modal-header"><h2 id="modalTitle">Dodaj</h2><button type="button" class="close-btn" data-modal-close aria-label="Zamknij">×</button></div>
        <div id="modalFields"></div>
        <div class="modal-actions"><button type="button" class="secondary-btn" data-modal-close>Anuluj</button><button type="submit" class="primary-btn">Zapisz</button></div>
      </form>
    </dialog>
    <div id="toast" class="toast" role="status"></div>
  `;
}
