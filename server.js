const express = require("express");
const path = require("path");

const notesData = require("./db/db.json");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/notes", (req, res) => {
  //console.log({ notesData });
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log({ notesData });
  res.json(notesData);
});

app.listen(PORT, () => {
  console.log(`Serving static assets at http://localhost:${PORT}`);
});
