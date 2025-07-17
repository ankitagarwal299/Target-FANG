const Base = Object.freeze({
  THIN: "THIN",
  THICK: "THICK"
})

const Size = Object.freeze({
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE"
})

const Topping = Object.freeze({
  PEPPPERONI: "PEPPPERONI",
  BACON: "BACON",
  MUSHROOM: "MUSHROOM"
})



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

  getPrice(store) {
    let total = store.basePrices[this.base] + store.sizePrices[this.size];

     if (this.toppings.length > 0) {
        let toppingPrices = this.toppings.reduce((acc, topping) => {
          acc += store.toppingPrices[topping]
          return acc;
        },0)
        
        total+=toppingPrices;
     }
    return total
  }
}



class Drink {
  constructor(name) {
    this.name = name;
  }

  getPrice(store) {
    return store.drinkPrices[this.name]
  }
}

class Order {
  constructor(pizzas, drinks, deals= []) {
    this.pizzas = pizzas;
    this.drinks = drinks;
  }


  totalPrice(store) {
    let pizzaPrices = this.pizzas.map(p => p.getPrice(store));
    let drinksPrices = this.drinks.map(d => d.getPrice(store));

    const total = pizzaPrices.reduce((a, b) => a + b, 0) + drinksPrices.reduce((a, b) => a + b, 0);

    return total
  }
}

let store = new Store(
  "SFO",
  {
    [Base.THIN]: 5,
    [Base.THICK]: 6,
  },
  {
    [Size.SMALL]: 2,
    [Size.MEDIUM]: 3,
    [Size.LARGE]: 4,
  },
  {
    [Topping.PEPPPERONI]: 2,
    [Topping.MUSHROOM]: 3,
    [Topping.BACON]: 4,
  },
  {
    "cola": 2,
    "water": 1
  }
)

let pizza1 = new Pizza(Base.THIN, Size.SMALL, [Topping.PEPPPERONI]);
let pizza2 = new Pizza(Base.THICK, Size.MEDIUM, [Topping.PEPPPERONI, Topping.BACON]);

let drink1 = new Drink("cola");
let drink2 = new Drink("water");

let order = new Order([pizza1,pizza2], [drink1]);
console.log("Total price with deals:", order.totalPrice(store));
