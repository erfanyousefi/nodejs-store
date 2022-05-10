const Application = require("./app/server");
new Application(4000, "mongodb://localhost:27017/storeDB")