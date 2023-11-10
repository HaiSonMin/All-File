function getPriceProduct(originalPrice, promotion = "") {
  if (promotion === "default") return originalPrice;
  if (promotion === "preOrder") return originalPrice * 0.9;
  if (promotion === "blackFriday") return originalPrice * 0.85;
  if (promotion === "bigSale") return originalPrice * 0.7;
  // ......
  // Add more if we have new promotion
  // Violates the solid principle
}

console.log(getPriceProduct(100000, "default"))
console.log(getPriceProduct(100000, "preOrder"))
console.log(getPriceProduct(100000, "blackFriday"))
console.log(getPriceProduct(100000, "bigSale"))