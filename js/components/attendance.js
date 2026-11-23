function renderAttendanceSection() {
  return `
    <section class="card attendance-card" id="attendance">
      <div class="card-header">
        <div><p class="eyebrow">UCZESTNICY</p><h2>Lista obecności</h2></div>
        <button class="text-btn" id="addPersonBtn">+ Dodaj</button>
      </div>
      <div id="peopleList" class="people-list"></div>
    </section>
  `;
}

function renderAttendance(people) {
  $("#peopleList").innerHTML = people.map((person) => `
    <div class="person">
      <div class="person-avatar" style="background:${person.color || "#ddd"}">${person.initials}</div>
      <div><strong>${person.name}</strong><small>${person.status}</small></div>
      <span class="status ${person.status === "Oczekuje" ? "pending" : ""}">${person.status === "Potwierdzono" ? "✓" : "•"}</span>
    </div>
  `).join("");
}

function renderDirectionsSection() {
  return `
    <section class="card directions-card">
      <div class="card-header"><div><p class="eyebrow">DOJAZD</p><h2>Wskazówki</h2></div></div>
      <div class="map-art"><div class="route route-a"></div><div class="route route-b"></div><div class="pin">●</div></div>
      <div class="direction"><span class="direction-icon">🚗</span><div><strong>Samochodem</strong><small>Ok. 1 h 20 min z Warszawy</small></div></div>
      <div class="direction"><span class="direction-icon">🚆</span><div><strong>Transportem</strong><small>PKP do Sieradza + taxi</small></div></div>
    </section>
  `;
}
