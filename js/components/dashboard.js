function renderDashboard() {
  return `
    <section class="hero">
      <div>
        <p class="eyebrow">NAJBLIŻSZE SPOTKANIE</p>
        <h1>Letni wypad nad wodę</h1>
        <div class="meta-row">
          <span>▣ 24 sierpnia 2026</span>
          <span>◷ 10:30</span>
          <span>⌖ Jeziorsko</span>
        </div>
      </div>
      <button class="primary-btn" id="inviteBtn">+ Zaproś znajomych</button>
    </section>

    <section class="stats">
      <article><span class="stat-icon coral">◎</span><div><strong id="attendingCount">0</strong><small>Potwierdzonych</small></div></article>
      <article><span class="stat-icon blue">⌖</span><div><strong id="venueCount">0</strong><small>Pomysły na miejsca</small></div></article>
      <article><span class="stat-icon gold">₽</span><div><strong id="budgetTotal">0 zł</strong><small>Łączny koszt</small></div></article>
      <article><span class="stat-icon green">↗</span><div><strong id="perPerson">0 zł</strong><small>Na osobę</small></div></article>
    </section>

    <div class="dashboard-grid">
      ${renderVenuesSection()}
      ${renderExpensesSection()}
      ${renderAttendanceSection()}
      ${renderDirectionsSection()}
    </div>
  `;
}
