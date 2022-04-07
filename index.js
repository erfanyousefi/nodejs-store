const Application = require("./app/server");
new Application(5000, "mongodb://localhost:27017/storeDB")