// script.js
import data from "./data.json" with { type: "json" };

let currentPeriod = localStorage.getItem("period") || "weekly";
const tabs = document.querySelectorAll(".tab");

document.querySelector(`#${currentPeriod}`)?.classList.add("active");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active")?.classList.remove("active");
    tab.classList.add("active");
    localStorage.setItem("period", tab.id);
    render(tab.id);
  });
});

const titleToClass = (t) => {
  const key = t.toLowerCase().replace(/\s+/g, '');
  return key === 'selfcare' ? 'selfCare' : key;
};

const lastLabel = {
  daily: `Yesterday`,
  weekly: `Last Week`,
  monthly: `Last Month`,
};

function render(period = currentPeriod) {
  for (const category of data) {
    const cls = titleToClass(category.title);
    const card = document.querySelector(`.card.${cls} .card-overlay`);
    if (!card) continue;

    const hoursEl = card.querySelector('.taskHours p');
    const spanEl = card.querySelector('.timeSpan p');
    if (!hoursEl || !spanEl) continue;

    const values = category.timeframes?.[period];
    if (!values) continue;

    hoursEl.textContent = `${values.current}hrs`;
    spanEl.textContent = `${lastLabel[period]} - ${values.previous}hrs`
  }
}

render();