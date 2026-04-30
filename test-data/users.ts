// All credentials are public test accounts provided by saucedemo.com
export const USERS = {
  standard:    { username: "standard_user",          password: "secret_sauce" },
  locked:      { username: "locked_out_user",        password: "secret_sauce" },
  problem:     { username: "problem_user",           password: "secret_sauce" },
  performance: { username: "performance_glitch_user",password: "secret_sauce" },
  invalid:     { username: "invalid_user",           password: "wrong_password" },
};

export const PRODUCTS = {
  backpack:     "Sauce Labs Backpack",
  bikeLight:    "Sauce Labs Bike Light",
  boltTShirt:   "Sauce Labs Bolt T-Shirt",
  fleeceJacket: "Sauce Labs Fleece Jacket",
  onesie:       "Sauce Labs Onesie",
  tShirt:       "Test.allTheThings() T-Shirt (Red)",
};

export const CHECKOUT = {
  firstName: "John",
  lastName:  "Doe",
  zipCode:   "98052",
};

export const SORT_OPTIONS = {
  nameAZ:    "az",
  nameZA:    "za",
  priceLow:  "lohi",
  priceHigh: "hilo",
};
