const form = document.querySelector("#form");
const cards = document.querySelector("#cards");

let editIndex = null;


// ======================
// ◆ VALIDATION
// ======================
function validate(data) {
  const errors = {};

  if (!data.name || data.name.length < 2 || data.name.length > 50)
    errors.name = "Name must be 2–50 chars";

  if (!/^[a-zA-Z0-9_]{3,20}$/.test(data.username))
    errors.username = "Invalid username";

  if (!data.email.includes("@") || !data.email.includes("."))
    errors.email = "Invalid email";

  if (data.bio.length > 160)
    errors.bio = "Bio max 160 chars";

  try {
    new URL(data.avatar);
  } catch {
    errors.avatar = "Invalid URL";
  }

  return errors;
}


// ======================
// ◆ SHOW ERRORS
// ======================
function showErrors(errors) {
  const errorEls = document.querySelectorAll(".error");
  errorEls.forEach(e => e.textContent = "");

  if (errors.name) errorEls[0].textContent = errors.name;
  if (errors.username) errorEls[1].textContent = errors.username;
  if (errors.email) errorEls[2].textContent = errors.email;
  if (errors.bio) errorEls[3].textContent = errors.bio;
  if (errors.avatar) errorEls[4].textContent = errors.avatar;
}


// ======================
// ◆ IMAGE VALIDATION (FIXED)
// ======================
function checkImage(url) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);

    img.src = url;
  });
}


// ======================
// ◆ CREATE CARD
// ======================
function createCard(data, index) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${data.avatar}">
    <h4>${data.name}</h4>
    <p>@${data.username}</p>
    <p><a href="mailto:${data.email}">${data.email}</a></p>
    <p>${data.bio}</p>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;

  // EDIT
  div.querySelector(".edit").onclick = () => {
    form.name.value = data.name;
    form.username.value = data.username;
    form.email.value = data.email;
    form.bio.value = data.bio;
    form.avatar.value = data.avatar;
    editIndex = index;
  };

  // DELETE
  div.querySelector(".delete").onclick = () => {
    if (confirm("Delete this profile?")) {
      div.remove();
    }
  };

  return div;
}


// ======================
// ◆ SUBMIT
// ======================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    username: form.username.value.trim(),
    email: form.email.value.trim(),
    bio: form.bio.value.trim(),
    avatar: form.avatar.value.trim()
  };

  const errors = validate(data);
  showErrors(errors);

  if (Object.keys(errors).length > 0) return;

  // ◆ CHECK IMAGE
  const validImage = await checkImage(data.avatar);

  if (!validImage) {
    document.querySelectorAll(".error")[4].textContent =
      "Avatar must be a valid image URL";
    return;
  }

  const card = createCard(data, editIndex);

  if (editIndex !== null) {
    cards.children[editIndex].replaceWith(card);
    editIndex = null;
  } else {
    cards.appendChild(card);
  }

  form.reset();
});