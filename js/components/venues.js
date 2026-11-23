function renderVenuesSection() {
  return `
    <section class="card venues-card" id="venues">
      <div class="card-header">
        <div><p class="eyebrow">GŁOSUJEMY</p><h2>Pomysły na miejscówkę</h2></div>
        <button class="text-btn" id="addVenueBtn">+ Dodaj</button>
      </div>
      <div id="venueList" class="venue-list"></div>
    </section>
  `;
}

function renderVenues(venues) {
  $("#venueList").innerHTML = venues.map((venue, index) => `
    <article class="venue">
      <div class="venue-photo">${venue.icon || "⌖"}</div>
      <div><h3>${venue.name}</h3><p>${venue.desc}</p></div>
      <button class="vote ${venue.voted ? "voted" : ""}" data-vote="${index}">♥ ${venue.votes}</button>
    </article>
  `).join("");
}
