const container = document.querySelector("#stars");
const labelEl = document.querySelector("#label");
const avgEl = document.querySelector("#average");

const ratings = [];
let selected = 0;

const labels = ["", "Terrible", "Poor", "OK", "Good", "Excellent"];

// ◆ Create stars
const stars = Array.from({ length: 5 }, (_, i) => {
  const star = document.createElement("span");
  star.textContent = "★";
  star.dataset.value = i + 1;
  container.appendChild(star);
  return star;
});

// ◆ Highlight logic
function highlightStars(n) {
  stars.forEach((star, i) => {
    star.classList.toggle("active", i < n);
  });
}

// ◆ Label
function getRatingLabel(n) {
  return labels[n];
}

// ◆ Update average
function updateAverage() {
  if (ratings.length === 0) {
    avgEl.textContent = "No ratings yet";
    return;
  }

  const sum = ratings.reduce((a, b) => a + b, 0);
  const avg = (sum / ratings.length).toFixed(1);

  avgEl.textContent = `Average: ${avg}`;
}

// =====================
// ◆ Mouse Events
// =====================

stars.forEach(star => {
  const value = Number(star.dataset.value);

  // Hover
  star.addEventListener("mouseover", () => {
    highlightStars(value);
    labelEl.textContent = getRatingLabel(value);
  });

  // Click
  star.addEventListener("click", () => {
    selected = value;
    ratings.push(value);

    labelEl.textContent = getRatingLabel(value);
    updateAverage();
  });
});

// Restore on mouseout
container.addEventListener("mouseout", () => {
  highlightStars(selected);
  labelEl.textContent = getRatingLabel(selected);
});

// =====================
// ◆ Keyboard Support
// =====================

container.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    selected = Math.min(5, selected + 1);
    highlightStars(selected);
    labelEl.textContent = getRatingLabel(selected);
  }

  if (e.key === "ArrowLeft") {
    selected = Math.max(1, selected - 1);
    highlightStars(selected);
    labelEl.textContent = getRatingLabel(selected);
  }

  if (e.key === "Enter") {
    ratings.push(selected);
    updateAverage();
  }
});