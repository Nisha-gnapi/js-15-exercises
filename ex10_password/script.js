const input = document.querySelector("#password");
const rulesList = document.querySelector("#rulesList");
const bar = document.querySelector("#bar");
const strengthText = document.querySelector("#strengthText");
const toggle = document.querySelector("#toggle");

const rules = [
  { label: "At least 8 characters", test: p => p.length >= 8 },
  { label: "One uppercase letter", test: p => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: p => /[a-z]/.test(p) },
  { label: "One digit (0–9)", test: p => /[0-9]/.test(p) },
  { label: "One special character", test: p => /[^A-Za-z0-9]/.test(p) }
];

const strengthMap = ["", "Weak", "Weak", "Fair", "Strong", "Very Strong"];
const colourMap = ["", "#B71C1C", "#E65100", "#F57F17", "#1565C0", "#2E7D32"];

// ◆ Render rules initially
rules.forEach(rule => {
  const li = document.createElement("li");
  li.textContent = "❌ " + rule.label;
  rulesList.appendChild(li);
});

// ◆ Input event
input.addEventListener("input", () => {
  const value = input.value;

  let score = 0;

  rules.forEach((rule, i) => {
    const passed = rule.test(value);
    rulesList.children[i].textContent =
      (passed ? "✅ " : "❌ ") + rule.label;

    if (passed) score++;
  });

  // ◆ Update bar
  const percent = (score / 5) * 100;
  bar.style.width = percent + "%";
  bar.style.background = colourMap[score];

  // ◆ Update text
  strengthText.textContent = strengthMap[score];
});

// ◆ Toggle password visibility
toggle.addEventListener("click", () => {
  input.type = input.type === "password" ? "text" : "password";
});