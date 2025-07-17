const BaseType = Object.freeze({
  THIN: "thin",
  THICK: "thick"
});

const SizeType = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
});

const ToppingType = Object.freeze({
  PEPPERONI: "pepperoni",
  MUSHROOMS: "mushrooms",
  BACON: "bacon"
});


class Store {
  constructor(name, basePrices, sizePrices, toppingPrices, drinkPrices) {
    this.name = name;
    this.basePrices = basePrices;
    this.sizePrices = sizePrices;
    this.toppingPrices = toppingPrices;
    this.drinkPrices = drinkPrices;
  }
}

class Pizza {
  constructor(base, size, toppings) {
    this.base = base;
    this.size = size;
    this.toppings = toppings;
  }

  price(store) {
    const basePrice = store.basePrices[this.base] || 0;
    const sizePrice = store.sizePrices[this.size] || 0;
    const toppingPrices = this.toppings.map(t => store.toppingPrices[t] || 0);

    if (toppingPrices.length > 0) {
      const maxPrice = Math.max(...toppingPrices);
      toppingPrices.splice(toppingPrices.indexOf(maxPrice), 1);
    }

    return basePrice + sizePrice + toppingPrices.reduce((a, b) => a + b, 0);
  }
}

class Drink {
  constructor(name) {
    this.name = name;
  }

  price(store) {
    return store.drinkPrices[this.name] || 0;
  }
}




class BuyOneGetOnePizzaFree {
  getDiscount(order, store) {
    const prices = order.pizzas.map(p => p.price(store)).sort((a, b) => b - a);
    let discount = 0;
    for (let i = 1; i < prices.length; i += 2) {
      discount += prices[i];
    }
    return discount;
  }
}

class FreeDrinkPerPizza {
  getDiscount(order, store) {
    const drinkPrices = order.drinks.map(d => d.price(store)).sort((a, b) => b - a);
    const freeDrinks = Math.min(order.pizzas.length, drinkPrices.length);
    return drinkPrices.slice(0, freeDrinks).reduce((a, b) => a + b, 0);
  }
}



class Order {
  constructor(pizzas, drinks, deals = []) {
    this.pizzas = pizzas;
    this.drinks = drinks;
    this.deals = deals;
  }

  totalPrice(store) {
    const pizzaPrices = this.pizzas.map(p => p.price(store));
    const drinkPrices = this.drinks.map(d => d.price(store));
    const baseTotal = pizzaPrices.reduce((a, b) => a + b, 0) + drinkPrices.reduce((a, b) => a + b, 0);

    const totalDiscount = this.deals.reduce((sum, deal) => sum + deal.getDiscount(this, store), 0);

    return baseTotal - totalDiscount;
  }
}

const store = new Store(
  "Downtown",
  {
    [BaseType.THIN]: 5,
    [BaseType.THICK]: 6
  },
  {
    [SizeType.SMALL]: 2,
    [SizeType.MEDIUM]: 3,
    [SizeType.LARGE]: 4
  },
  {
    [ToppingType.PEPPERONI]: 1,
    [ToppingType.MUSHROOMS]: 0.5,
    [ToppingType.BACON]: 1.5
  },
  {
    cola: 2,
    water: 1
  }
);

const pizza1 = new Pizza(BaseType.THIN, SizeType.MEDIUM, [ToppingType.PEPPERONI, ToppingType.BACON]);
const pizza2 = new Pizza(BaseType.THICK, SizeType.LARGE, [ToppingType.MUSHROOMS, ToppingType.BACON]);
const drink1 = new Drink("cola");
const drink2 = new Drink("water");

const deals = [new BuyOneGetOnePizzaFree(), new FreeDrinkPerPizza()];
const order = new Order([pizza1, pizza2], [drink1, drink2], deals);

console.log("Total price with deals:", order.totalPrice(store));
