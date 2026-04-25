function describe(value) {
  let type;

  // Handle null first (VERY IMPORTANT)
  if (value === null) {
    type = "null";
  }
  // Handle NaN
  else if (Number.isNaN(value)) {
    type = "NaN";
  }
  // Handle array
  else if (Array.isArray(value)) {
    type = "array";
  }
  // Handle others using typeof
  else {
    type = typeof value;
  }

  return {
    type: type,
    isTruthy: Boolean(value),
    isNull: value === null,
    isNaN: Number.isNaN(value),
  };
}

// Test values
const testValues = [
  42,
  "hello",
  true,
  null,
  undefined,
  [],
  {},
  0,
  NaN,
  Symbol("id"),
];

// Display as table
console.table(
  testValues.map((v) => ({
    value: String(v),
    ...describe(v),
  }))
);