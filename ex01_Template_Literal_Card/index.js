// Step 1: Declare variables
const name = "Priya";
const age = 22;
const city = "Bengaluru";
const hobby = "photography";

// Step 2: Function using template literals
function introduce(name, age, city, hobby) {
  return `Hi! My name is ${name}. 
I am ${age >= 18 ? "an adult" : "a young person"} living in ${city}. 
My favourite hobby is ${hobby}.`;
}

// Step 4: Call function 3 times
console.log(introduce("Priya", 22, "Bengaluru", "photography"));
console.log(introduce("Arjun", 16, "Chennai", "gaming"));
console.log(introduce("Meena", 30, "Hyderabad", "reading"));