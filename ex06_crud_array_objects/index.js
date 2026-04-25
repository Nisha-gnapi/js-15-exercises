let contactBook = [
  { id: 1, name: "Priya Sharma", email: "priya@gmail.com", phone: "9876543210", tags: ["friend","college"] },
  { id: 2, name: "Arjun Nair", email: "arjun@work.com", phone: "9123456789", tags: ["work","mentor"] },
  { id: 3, name: "Meera Iyer", email: "meera@gmail.com", phone: "9988776655", tags: ["friend"] },
  { id: 4, name: "Kiran Rao", email: "kiran@yahoo.com", phone: "9012345678", tags: ["family"] },
  { id: 5, name: "Rohan Das", email: "rohan@gmail.com", phone: "9090909090", tags: ["work","friend"] }
];

// ◆ Add
const addContact = (book, contact) => [
  ...book,
  { id: Date.now(), ...contact }
];

// ◆ Search
const searchContacts = (book, query) => {
  const q = query.toLowerCase();

  return book.filter(({ name, email, tags }) =>
    name.toLowerCase().includes(q) ||
    email.toLowerCase().includes(q) ||
    tags.some(tag => tag.toLowerCase().includes(q))
  );
};

// ◆ Update
const updateContact = (book, id, changes) =>
  book.map(c => c.id === id ? { ...c, ...changes } : c);

// ◆ Delete
const deleteContact = (book, id) =>
  book.filter(c => c.id !== id);

// ◆ Group by Tag
const groupByTag = (book) =>
  book.reduce((acc, { name, tags }) => {
    tags.forEach(tag => {
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(name);
    });
    return acc;
  }, {});


// ◆ Usage
contactBook = addContact(contactBook, {
  name: "Anjali",
  email: "anjali@gmail.com",
  phone: "9999",
  tags: ["friend"]
});

console.log(searchContacts(contactBook, "gmail"));
console.log(updateContact(contactBook, 1, { phone: "1111" }));
console.log(deleteContact(contactBook, 2));
console.log(groupByTag(contactBook));