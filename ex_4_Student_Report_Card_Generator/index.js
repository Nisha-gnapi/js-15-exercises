const students = [
  { name: "Priya", scores: [85, 92, 78, 88, 79] },
  { name: "Arjun", scores: [72, 65, 80, 70, 68] },
  { name: "Meera", scores: [95, 98, 92, 97, 100] },
  { name: "Kiran", scores: [50, 55, 48, 62, 58] },
  { name: "Rohan", scores: [78, 82, 75, 80, 85] },
];

// 🔹 Average
const getAverage = (scores) => {
  const total = scores.reduce((sum, s) => sum + s, 0);
  return (total / scores.length).toFixed(1);
};

// 🔹 Grade
const getGrade = (avg) => {
  if (avg >= 90) return "A";
  if (avg >= 80) return "B";
  if (avg >= 70) return "C";
  if (avg >= 60) return "D";
  return "F";
};

// 🔹 Report Generator
const generateReport = (student) => {
  const avg = Number(getAverage(student.scores));
  const grade = getGrade(avg);
  const high = Math.max(...student.scores);
  const low = Math.min(...student.scores);

  return `${student.name} — Average: ${avg} — Grade: ${grade} — High: ${high} — Low: ${low}`;
};

// 🔹 All Reports using map()
const reports = students.map(generateReport);
console.log(reports);

// 🔹 Top Student using reduce()
const topStudent = students.reduce((top, curr) => {
  return getAverage(curr.scores) > getAverage(top.scores) ? curr : top;
});

console.log("Top Student:", topStudent.name);

// 🔹 Biggest Range using reduce()
const mostImproved = students.reduce((best, curr) => {
  const rangeCurr = Math.max(...curr.scores) - Math.min(...curr.scores);
  const rangeBest = Math.max(...best.scores) - Math.min(...best.scores);

  return rangeCurr > rangeBest ? curr : best;
});

console.log("Biggest Range Student:", mostImproved.name);