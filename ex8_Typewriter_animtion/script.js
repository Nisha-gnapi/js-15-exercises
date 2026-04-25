const phrases = [
  "Hello, World!",
  "I am learning JavaScript.",
  "This is a typewriter effect.",
  "Keep coding!"
];

const display = document.querySelector("#typewriter");

let index = 0;

// ◆ Type function
function type(phrase, i = 0, onComplete) {
  if (i > phrase.length) {
    setTimeout(onComplete, 1500);
    return;
  }

  display.textContent = phrase.slice(0, i);

  setTimeout(() => {
    type(phrase, i + 1, onComplete);
  }, 80);
}

// ◆ Erase function
function erase(onComplete) {
  const text = display.textContent;

  if (text.length === 0) {
    onComplete();
    return;
  }

  display.textContent = text.slice(0, -1);

  setTimeout(() => {
    erase(onComplete);
  }, 50);
}

// ◆ Loop controller
function startCycle() {
  const currentPhrase = phrases[index];

  type(currentPhrase, 0, () => {
    erase(() => {
      index = (index + 1) % phrases.length;
      startCycle();
    });
  });
}

// Start animation
startCycle();