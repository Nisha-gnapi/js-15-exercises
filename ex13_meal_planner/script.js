const BASE = "https://www.themealdb.com/api/json/v1/1";
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const btn = document.querySelector("#btn");
const statusEl = document.querySelector("#status");
const resultEl = document.querySelector("#result");


// ======================
// ◆ RENDER FUNCTION
// ======================
function renderMeal(meal, category) {
  resultEl.innerHTML = `
    <h3>${meal.strMeal}</h3>
    <p>Category: ${category}</p>
    <img src="${meal.strMealThumb}" width="200"/>
    <p>
      ${meal.strIngredient1} - ${meal.strMeasure1}<br>
      ${meal.strIngredient2} - ${meal.strMeasure2}<br>
      ${meal.strIngredient3} - ${meal.strMeasure3}
    </p>
  `;
}


// ======================
// ◆ VERSION 1: PROMISE CHAIN
// ======================
function loadMealChain() {

  statusEl.textContent = "Finding category...";

  fetch(`${BASE}/categories.php`)
    .then(r => r.json())
    .then(data => {
      const category = rand(data.categories).strCategory;

      statusEl.textContent = "Finding meal...";

      return fetch(`${BASE}/filter.php?c=${category}`)
        .then(r => r.json())
        .then(data => ({ meals: data.meals, category }));
    })
    .then(({ meals, category }) => {
      const meal = rand(meals);

      statusEl.textContent = "Loading recipe...";

      return fetch(`${BASE}/lookup.php?i=${meal.idMeal}`)
        .then(r => r.json())
        .then(data => ({ meal: data.meals[0], category }));
    })
    .then(({ meal, category }) => {
      statusEl.textContent = "";
      renderMeal(meal, category);
    })
    .catch(err => {
      statusEl.textContent = "Error loading meal";
    });
}


// ======================
// ◆ VERSION 2: ASYNC / AWAIT
// ======================
async function loadMealAsync() {
  try {
    statusEl.textContent = "Finding category...";

    const catRes = await fetch(`${BASE}/categories.php`);
    const catData = await catRes.json();
    const category = rand(catData.categories).strCategory;

    statusEl.textContent = "Finding meal...";

    const mealRes = await fetch(`${BASE}/filter.php?c=${category}`);
    const mealData = await mealRes.json();
    const meal = rand(mealData.meals);

    statusEl.textContent = "Loading recipe...";

    const detailRes = await fetch(`${BASE}/lookup.php?i=${meal.idMeal}`);
    const detailData = await detailRes.json();

    statusEl.textContent = "";

    renderMeal(detailData.meals[0], category);

  } catch (err) {
    statusEl.textContent = "Error loading meal";
  }
}


// ======================
// ◆ BUTTON
// ======================
btn.addEventListener("click", () => {
  loadMealAsync(); // change to loadMealChain() to test other version
});