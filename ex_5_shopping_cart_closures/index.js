function createCart() {
  const items = []; // 🔒 private
  let discountPercent = 0;

  return {
    // 🔹 Add Item
    addItem(name, price, qty) {
      const existing = items.find(item => item.name === name);

      if (existing) {
        existing.qty += qty; // increase quantity
      } else {
        items.push({ name, price, qty });
      }
    },

    // 🔹 Remove Item
    removeItem(name) {
      const index = items.findIndex(item => item.name === name);
      if (index !== -1) {
        items.splice(index, 1);
      }
    },

    // 🔹 Get Items (copy)
    getItems() {
      return [...items];
    },

    // 🔹 Get Total (with discount)
    getTotal() {
      const total = items.reduce((sum, item) => {
        return sum + item.price * item.qty;
      }, 0);

      const discount = (total * discountPercent) / 100;
      return total - discount;
    },

    // 🔹 Apply Discount
    applyDiscount(percent) {
      discountPercent = percent;
    },

    // 🔹 Clear Cart
    clearCart() {
      items.length = 0;
    },
  };
}

// -------------------
// Usage
const cart = createCart();

cart.addItem("Apple", 0.5, 3);
cart.addItem("Apple", 0.5, 2); // should merge → qty = 5
cart.addItem("Banana", 1, 2);

console.log(cart.getItems());

cart.applyDiscount(20);

console.log("Total:", cart.getTotal());

cart.removeItem("Apple");

console.log(cart.getItems());

console.log(cart.items); // undefined (proof of closure)