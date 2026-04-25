const input = document.querySelector("#input");
const postBtn = document.querySelector("#post");
const clearBtn = document.querySelector("#clear");
const messageList = document.querySelector("#messages");
const statusEl = document.querySelector("#status");


// ======================
// ◆ XSS Detection (UI only)
// ======================
function detectXSS(text) {
  const patterns = [
    /<script>/i,
    /onerror=/i,
    /onload=/i,
    /javascript:/i
  ];
  return patterns.some(p => p.test(text));
}


// ======================
// ◆ SAFE RENDER (Always safe)
// ======================
function renderSafe(text) {
  const li = document.createElement("li");
  li.textContent = text; // ✔ secure
  messageList.appendChild(li);
}


// ======================
// ◆ Post Message
// ======================
postBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  // ◆ Detection (visual only)
  const isMalicious = detectXSS(text);

  if (isMalicious) {
    statusEl.textContent = "⚠️ Potential malicious input detected (rendered safely)";
    statusEl.style.color = "red";
  } else {
    statusEl.textContent = "✔ Input accepted";
    statusEl.style.color = "green";
  }

  // ◆ Always safe rendering
  renderSafe(text);

  input.value = "";
});


// ======================
// ◆ Clear Messages
// ======================
clearBtn.addEventListener("click", () => {
  messageList.innerHTML = "";
  statusEl.textContent = "";
});