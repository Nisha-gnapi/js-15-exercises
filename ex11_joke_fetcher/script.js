
// ======================
// ◆ DOM Elements
// ======================
const btn = document.querySelector("#btn");
const spinner = document.querySelector("#spinner");
const setupEl = document.querySelector("#setup");
const punchlineEl = document.querySelector("#punchline");
const errorEl = document.querySelector("#error");
const copyBtn = document.querySelector("#copyBtn");


// ======================
// ◆ Fallback Jokes
// ======================
const fallback = [
  {
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs."
  },
  {
    setup: "Why did the developer go broke?",
    punchline: "Because he used up all his cache."
  }
];


// ======================
// ◆ Fetch Joke Function
// ======================
async function fetchJoke() {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Programming?type=twopart");

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    return {
      setup: data.setup,
      punchline: data.delivery
    };

  } catch (err) {
    return {
      setup: "Why do programmers prefer dark mode?",
      punchline: "Because light attracts bugs."
    };
  }
}


// ======================
// ◆ Button Click Logic
// ======================
btn.addEventListener("click", async () => {

  // Reset UI
  btn.disabled = true;
  spinner.style.display = "block";
  errorEl.textContent = "";
  setupEl.textContent = "";
  punchlineEl.textContent = "";
  copyBtn.style.display = "none";

  try {
    const { setup, punchline } = await fetchJoke();

    // Show setup
    setupEl.textContent = "😂 " + setup;

    // Delay punchline (comic effect)
    setTimeout(() => {
      punchlineEl.textContent = "👉 " + punchline;
      copyBtn.style.display = "inline-block";
    }, 1500);

  } catch (err) {
    errorEl.textContent = "Oops! Could not fetch a joke.";
  } finally {
    spinner.style.display = "none";
    btn.disabled = false;
  }
});


// ======================
// ◆ Copy Joke
// ======================
copyBtn.addEventListener("click", () => {
  const text = `${setupEl.textContent} ${punchlineEl.textContent}`;
  navigator.clipboard.writeText(text);
});
















































