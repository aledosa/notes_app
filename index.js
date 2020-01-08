const express = require("express");

// initializing
const app = express();

// settings
app.set("port", process.env.PORT || 8080);

// middlewares
app.use(express.json());

// routes
app.use("/api/notes", require("./src/Router/NotesRouter"));

app.listen(app.get("port"), () => {
  console.log(`Server is working on port ${app.get("port")}`);
});

module.exports = app;
