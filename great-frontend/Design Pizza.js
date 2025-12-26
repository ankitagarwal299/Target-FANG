// Store class with pricing details
class Store {
  constructor(name) {
    this.name = name;
    this.prices = {
      base: {},
      size: {},
      topping: {},
      drink: {}
    };
  }

  setPrices(prices) {
    this.prices = prices;
  }

  getPrice(category, item) {
    return this.prices[category]?.[item] ?? 0;
  }
}

// Pizza class
class Pizza {
  constructor(base, size, toppings = []) {
    this.base = base;
    this.size = size;
    this.toppings = toppings;
  }

  calculatePrice(store) {
    let price = store.getPrice("base", this.base) + store.getPrice("size", this.size);
    for (const topping of this.toppings) {
      price += store.getPrice("topping", topping);
    }
    return price;
  }
}

// Drink class
class Drink {
  constructor(name) {
    this.name = name;
  }

  calculatePrice(store) {
    return store.getPrice("drink", this.name);
  }
}

// Order class
class Order {
  constructor() {
    this.pizzas = [];
    this.drinks = [];
  }

  addPizza(pizza) {
    this.pizzas.push(pizza);
  }

  addDrink(drink) {
    this.drinks.push(drink);
  }

  getTotal(store) {
    const pizzaTotal = this.pizzas.reduce((sum, pizza) => sum + pizza.calculatePrice(store), 0);
    const drinkTotal = this.drinks.reduce((sum, drink) => sum + drink.calculatePrice(store), 0);
    return pizzaTotal + drinkTotal;
  }
}

// Example usage
const store = new Store("SFO");
store.setPrices({
  base: { thin: 5, thick: 6 },
  size: { small: 2, medium: 3, large: 4 },
  topping: { pepperoni: 2, bacon: 4, mushroom: 3 },
  drink: { cola: 2, water: 1 }
});

const pizza1 = new Pizza("thin", "small", ["pepperoni"]);
const pizza2 = new Pizza("thick", "medium", ["bacon", "mushroom"]);
const drink1 = new Drink("cola");

const order = new Order();
order.addPizza(pizza1);
order.addPizza(pizza2);
order.addDrink(drink1);

console.log("Total Order Price:", order.getTotal(store)); // Output: Total Order Price: 24
