const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let state =
  JSON.parse(localStorage.getItem("socializerState") || "null") ||
  JSON.parse(localStorage.getItem("rendezvousState") || "null") ||
  defaults;
let modalAction = null;

function money(amount) {
  return Number(amount).toLocaleString("pl-PL", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }) + " zł";
}

function save() {
  localStorage.setItem("socializerState", JSON.stringify(state));
  render();
}

function render() {
  renderVenues(state.venues);
  renderExpenses(state.expenses);
  renderAttendance(state.people);

  const total = state.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const people = state.people.length || 1;
  const confirmed = state.people.filter((person) => person.status === "Potwierdzono").length;

  $("#attendingCount").textContent = confirmed;
  $("#venueCount").textContent = state.venues.length;
  $("#budgetTotal").textContent = money(total);
  $("#expenseTotal").textContent = money(total);
  $("#perPerson").textContent = money(total / people);
  $("#splitPeople").textContent = `${people} osób`;
  $("#splitAmount").textContent = money(total / people);
}

function openModal(title, fields, onSubmit) {
  $("#modalTitle").textContent = title;
  $("#modalFields").innerHTML = fields.map((field) => `
    <div class="field">
      <label>${field.label}</label>
      <input name="${field.name}" type="${field.type || "text"}" value="${field.value || ""}" ${field.required ? "required" : ""}>
    </div>
  `).join("");
  modalAction = onSubmit;
  $("#modal").showModal();
}

function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  setTimeout(() => $("#toast").classList.remove("show"), 2200);
}

function initializeEvents() {
  $$("[data-modal-close]").forEach((button) => {
    button.onclick = () => {
      modalAction = null;
      $("#modal").close();
    };
  });

  $("#modal").addEventListener("close", () => {
    modalAction = null;
  });

  $("#modal").addEventListener("click", (event) => {
    if (event.target === $("#modal")) {
      modalAction = null;
      $("#modal").close();
    }
  });

  $("#modalForm").addEventListener("submit", (event) => {
    event.preventDefault();

    modalAction?.(Object.fromEntries(new FormData(event.currentTarget)));
    modalAction = null;
    $("#modal").close();
  });

  $("#addVenueBtn").onclick = () => openModal("Dodaj miejscówkę", [
    { name: "name", label: "Nazwa miejscówki", required: true },
    { name: "desc", label: "Opis" },
    { name: "icon", label: "Emoji", value: "⌖" },
  ], (data) => {
    state.venues.push({ name: data.name, desc: data.desc || "Nowa propozycja", icon: data.icon, votes: 0 });
    save();
    toast("Dodano miejscówkę");
  });

  $("#addExpenseBtn").onclick = () => openModal("Dodaj koszt", [
    { name: "name", label: "Nazwa kosztu", required: true },
    { name: "detail", label: "Szczegóły" },
    { name: "amount", label: "Kwota (zł)", type: "number", required: true },
  ], (data) => {
    state.expenses.push({ name: data.name, detail: data.detail || "Dodano ręcznie", amount: Number(data.amount) });
    save();
    toast("Dodano koszt");
  });

  $("#addPersonBtn").onclick = () => openModal("Dodaj uczestnika", [
    { name: "name", label: "Imię i nazwisko", required: true },
    { name: "status", label: "Status (Potwierdzono lub Oczekuje)", value: "Oczekuje" },
  ], (data) => {
    const parts = data.name.trim().split(" ");
    state.people.push({
      name: data.name,
      initials: (parts[0]?.[0] || "") + (parts[1]?.[0] || ""),
      status: data.status.includes("Potwier") ? "Potwierdzono" : "Oczekuje",
      color: "#c9d4c4",
    });
    save();
    toast("Dodano uczestnika");
  });

  $("#venueList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-vote]");
    if (!button) return;

    const venue = state.venues[Number(button.dataset.vote)];
    venue.voted = !venue.voted;
    venue.votes += venue.voted ? 1 : -1;
    save();
  });

  $("#inviteBtn").onclick = () => {
    navigator.clipboard?.writeText(location.href);
    toast("Link do spotkania skopiowany");
  };
  $("#shareBtn").onclick = () => $("#inviteBtn").click();

  $(".mobile-menu").onclick = () => $(".sidebar").classList.toggle("open");

  $$(".nav-item").forEach((button) => {
    button.onclick = () => {
      $$(".nav-item").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      if (button.dataset.view === "overview") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        $("#" + button.dataset.view)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
  });
}

document.body.innerHTML = renderLayout();
initializeEvents();
render();
