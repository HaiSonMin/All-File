const TYPE_PROMOTION = {
  bigSale: "bigSale",
  default: "default",
  discount: "discount",
  preOrder: "preOrder",
  blackFriday: "blackFriday",
};

const defaultPrice = (originalPrice) => originalPrice;
const bigSalePrice = (originalPrice) => originalPrice * 0.7;
const preOrderPrice = (originalPrice) => originalPrice * 0.9;
const discountPrice = (originalPrice) => originalPrice * 0.8;
const blackFridayPrice = (originalPrice) => originalPrice * 0.85;

const getPriceStrategyPattern = {
  default: defaultPrice,
  bigSale: bigSalePrice,
  discount: discountPrice,
  preOrder: preOrderPrice,
  blackFriday: blackFridayPrice,
};

const getPrice = (originalPrice, typePromotion) => {
  const price = getPriceStrategyPattern[typePromotion]?.(originalPrice);
  if (!price) return "TypePromotion not correct";
  return price;
};

console.log(getPrice(10000000, TYPE_PROMOTION.default));
