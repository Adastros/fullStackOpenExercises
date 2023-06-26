const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
  },
  env: {
    BACKEND: "http://localhost:3003/api",
    USERPASSWORD1: "Gameofthrones1",
    USERPASSWORD2: "Birdlaw123",
    USERPASSWORD3: "GamEOfTHroneS!", // to test incorrect password
  },
});
