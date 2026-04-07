export const testData = {
  baseUrl: "https://www.saucedemo.com/",
  users: {
    standard: {
      username: "standard_user",
      password: "secret_sauce",
    },
    lockedOut: {
      username: "locked_out_user",
      password: "secret_sauce",
    },
    problem: {
      username: "problem_user",
      password: "secret_sauce",
    },
  },
  checkout: {
    firstName: "Marco",
    lastName: "Lopez",
    postalCode: "42101",
  },
  products: {
    backpack: "Sauce Labs Backpack",
  },
  messages: {
    lockedOutError: "Epic sadface: Sorry, this user has been locked out.",
  },
};

// this data should be in .env file, password must never be shared in the code
