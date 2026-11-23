// Initial data is loaded from data.js.

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const storedState =
  JSON.parse(localStorage.getItem("socializerState") || "null") ||
  JSON.parse(localStorage.getItem("rendezvousState") || "null") ||
  defaults;

let state = storedState;
let modalAction = null;

function money(amount) {
  return (
    Number(amount).toLocaleString("pl-PL", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }) + " zł"
  );
}

function save() {
  localStorage.setItem("socializerState", JSON.stringify(state));
  render();
}

function render() {
  $("#venueCount").textContent = state.venues.length;

  $("#venueList").innerHTML = state.venues
    .map(
      (venue, index) => `
        <article class="venue">
          <div class="venue-photo">${venue.icon || "⌖"}</div>
          <div>
            <h3>${venue.name}</h3>
            <p>${venue.desc}</p>
          </div>
          <button class="vote ${venue.voted ? "voted" : ""}" data-vote="${index}">
            ♥ ${venue.votes}
          </button>
        </article>
      `,
    )
    .join("");

  const total = state.expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0,
  );
  const people = state.people.length || 1;
  const confirmed = state.people.filter(
    (person) => person.status === "Potwierdzono",
  ).length;
  const perPerson = total / people;

  $("#budgetTotal").textContent = money(total);
  $("#expenseTotal").textContent = money(total);
  $("#attendingCount").textContent = confirmed;
  $("#perPerson").textContent = money(perPerson);
  $("#splitPeople").textContent = `${people} osób`;
  $("#splitAmount").textContent = money(perPerson);

  $("#expenseList").innerHTML = state.expenses
    .map(
      (expense) => `
        <div class="expense-item">
          <div>
            <strong>${expense.name}</strong><br>
            <small>${expense.detail}</small>
          </div>
          <strong>${money(expense.amount)}</strong>
        </div>
      `,
    )
    .join("");

  $("#peopleList").innerHTML = state.people
    .map(
      (person) => `
        <div class="person">
          <div class="person-avatar" style="background:${person.color || "#ddd"}">
            ${person.initials}
          </div>
          <div>
            <strong>${person.name}</strong>
            <small>${person.status}</small>
          </div>
          <span class="status ${person.status === "Oczekuje" ? "pending" : ""}">
            ${person.status === "Potwierdzono" ? "✓" : "•"}
          </span>
        </div>
      `,
    )
    .join("");
}

function openModal(title, fields, onSubmit) {
  $("#modalTitle").textContent = title;
  $("#modalFields").innerHTML = fields
    .map(
      (field) => `
        <div class="field">
          <label>${field.label}</label>
          <input
            name="${field.name}"
            type="${field.type || "text"}"
            value="${field.value || ""}"
            ${field.required ? "required" : ""}
          >
        </div>
      `,
    )
    .join("");

  modalAction = onSubmit;
  $("#modal").showModal();
}

function toast(message) {
  const toastElement = $("#toast");
  toastElement.textContent = message;
  toastElement.classList.add("show");

  setTimeout(() => {
    toastElement.classList.remove("show");
  }, 2200);
}

$("#modalForm").addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") {
    return;
  }

  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));

  modalAction?.(data);
  $("#modal").close();
});

$("#addVenueBtn").onclick = () => {
  openModal(
    "Dodaj miejscówkę",
    [
      { name: "name", label: "Nazwa miejscówki", required: true },
      { name: "desc", label: "Opis" },
      { name: "icon", label: "Emoji", value: "⌖" },
    ],
    (data) => {
      state.venues.push({
        name: data.name,
        desc: data.desc || "Nowa propozycja",
        icon: data.icon,
        votes: 0,
      });
      save();
      toast("Dodano miejscówkę");
    },
  );
};

$("#addExpenseBtn").onclick = () => {
  openModal(
    "Dodaj koszt",
    [
      { name: "name", label: "Nazwa kosztu", required: true },
      { name: "detail", label: "Szczegóły" },
      {
        name: "amount",
        label: "Kwota (zł)",
        type: "number",
        required: true,
      },
    ],
    (data) => {
      state.expenses.push({
        name: data.name,
        detail: data.detail || "Dodano ręcznie",
        amount: Number(data.amount),
      });
      save();
      toast("Dodano koszt");
    },
  );
};

$("#addPersonBtn").onclick = () => {
  openModal(
    "Dodaj uczestnika",
    [
      { name: "name", label: "Imię i nazwisko", required: true },
      {
        name: "status",
        label: "Status (Potwierdzono lub Oczekuje)",
        value: "Oczekuje",
      },
    ],
    (data) => {
      const parts = data.name.trim().split(" ");
      state.people.push({
        name: data.name,
        initials:
          (parts[0]?.[0] || "") + (parts[1]?.[0] || ""),
        status: data.status.includes("Potwier")
          ? "Potwierdzono"
          : "Oczekuje",
        color: "#c9d4c4",
      });
      save();
      toast("Dodano uczestnika");
    },
  );
};

$("#venueList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-vote]");
  if (!button) {
    return;
  }

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

$(".mobile-menu").onclick = () => {
  $(".sidebar").classList.toggle("open");
};

$$('.nav-item').forEach((button) => {
  button.onclick = () => {
    $$(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    const view = button.dataset.view;

    if (view !== "overview") {
      $("#" + view)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
});

render();
