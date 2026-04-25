
// ======================
// ◆ Debounce Function
// ======================
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}


// ======================
// ◆ Data (50 items)
// ======================
const items = [
  "India","USA","Canada","Germany","France","Japan","China","Brazil","Italy","Spain",
  "Pizza","Burger","Pasta","Sushi","Tacos","Biryani","Noodles","Sandwich","Steak","Salad",
  "JavaScript","Python","Java","C++","Go","Rust","TypeScript","Ruby","Swift","Kotlin",
  "Apple","Banana","Orange","Mango","Grapes","Pineapple","Strawberry","Watermelon","Peach","Cherry",
  "React","Angular","Vue","Node","Django","Flask","Spring","Laravel","Express","NextJS"
];

const list = document.querySelector("#results");
const counter = document.querySelector("#count");
const searchInput = document.querySelector("#search");


// ======================
// ◆ Initial render
// ======================
function renderAll() {
  list.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  counter.textContent = `Showing ${items.length} of ${items.length}`;
}

renderAll();


// ======================
// ◆ Filter Function
// ======================
function filterItems(query) {

  console.log("Filtering..."); // for debounce check

  const q = query.toLowerCase();

  const hits = items.filter(item =>
    item.toLowerCase().includes(q)
  );

  counter.textContent = `Showing ${hits.length} of ${items.length}`;

  list.innerHTML = "";

  hits.forEach(item => {
    const li = document.createElement("li");

    // Highlight match
    const highlighted = item.replace(
      new RegExp(query, "gi"),
      match => `<mark>${match}</mark>`
    );

    li.innerHTML = highlighted;

    list.appendChild(li);
  });
}


// ======================
// ◆ Event (Debounced)
// ======================
searchInput.addEventListener(
  "input",
  debounce(e => filterItems(e.target.value), 300)
);