class Discount {
  constructor(product, valueDiscount, typeDiscount) {
    this.product = product;
    this.valueDiscount = valueDiscount;
    this.typeDiscount = typeDiscount;
  }
  calcPriceDiscount() {
    if (this.typeDiscount === "percentage")
      return (this.product.price * this.valueDiscount) / 100;
    return this.valueDiscount;
  }
}

class Shipping {
  constructor(valueShipping) {
    this.valueShipping = valueShipping;
  }

  calcPriceShipping() {
    return this.valueShipping;
  }
}

class Tax {
  constructor(product, valueTax) {
    this.product = product;
    this.valueTax = valueTax;
  }
  calcPriceTax() {
    return (this.product.price * this.valueTax) / 100;
  }
}

class Product {
  constructor(name, price, origin) {
    this.name = name;
    this.price = price;
    this.origin = origin;
  }
}

class ProductInfo {
  constructor(product, discount, shipping, tax) {
    this.product = product;
    this.discount = discount;
    this.shipping = shipping;
    this.tax = tax;
  }

  getCost() {
    const costDiscount = this.discount.calcPriceDiscount();
    const costShipping = this.shipping.calcPriceShipping();
    const tax = this.tax.calcPriceTax();
    const finalCost = this.product.price - costDiscount + costShipping + tax;
    return finalCost;
  }

  getAllInformation() {
    return `This is ${this.product.name} have price ${this.getCost()} and made in ${this.product.origin}`;
  }
}

const iphone13 = new Product("Iphone", 2000, "USA");
const discount001 = new Discount(iphone13, 10, "percentage");
const shipping001 = new Shipping(10);
const tax001 = new Tax(iphone13, 20);

const productInfo = new ProductInfo(iphone13, discount001, shipping001, tax001);

console.log(productInfo.getCost());
console.log(productInfo.getAllInformation());
