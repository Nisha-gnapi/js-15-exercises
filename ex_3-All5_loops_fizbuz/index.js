// 🔹 Common logic (reuse everywhere)
function getFizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n;
}

// -------------------------------
// Version 1 — for loop
const result1 = [];
for (let i = 1; i <= 30; i++) {
  result1.push(getFizzBuzz(i));
}

// -------------------------------
// Version 2 — while loop
const result2 = [];
let i = 1;
while (i <= 30) {
  result2.push(getFizzBuzz(i));
  i++;
}

// -------------------------------
// Version 3 — do-while loop
const result3 = [];
let j = 1;
do {
  result3.push(getFizzBuzz(j));
  j++;
} while (j <= 30);

// -------------------------------
// Version 4 — for...of
const result4 = [];
const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

for (const n of numbers) {
  result4.push(getFizzBuzz(n));
}

// -------------------------------
// Version 5 — for...in
const result5 = [];
const numObj = {};

for (let k = 1; k <= 30; k++) {
  numObj[k] = k;
}

for (const key in numObj) {
  result5.push(getFizzBuzz(Number(key)));
}

// -------------------------------
// Compare all outputs
console.log("All outputs same?",
  JSON.stringify(result1) === JSON.stringify(result2) &&
  JSON.stringify(result2) === JSON.stringify(result3) &&
  JSON.stringify(result3) === JSON.stringify(result4) &&
  JSON.stringify(result4) === JSON.stringify(result5)
);

// Print one result
console.log(result1);