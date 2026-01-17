const express = require("express");
const path = require("path");
const uuid = require("./helpers/uuid");
const fs = require("fs/promises");
const notesData = require("./db/db.json");

const app = express();
const PORT = 3001;

const DB_DIR = path.join(__dirname, "db");
const DB_FILE = path.join(DB_DIR, "db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//verify data directory exists and we have access to the file
async function verifyDb() {
  try {
    //try to make directory, if it already exists, will jump to catch
    await fs.mkdir(DB_DIR, { recursive: true });
    //test for access to the file, if file does not exist will jump to catch
    await fs.access(DB_FILE);
  } catch {
    //if dir and file exist, we'll end up here, where we write an empty array to the file
    await fs.writeFile(DB_FILE, JSON.stringify([]), "utf-8");
  }
}

//read notes file and return data as json
async function readNotes() {
  //make sure our data directory and file exist and are working
  await verifyDb();
  //read data from file, parse as JSON, return
  const raw = await fs.readFile(DB_FILE, "utf-8");
  const pretty = JSON.parse(raw);
  console.log("This is what we read from the file");
  console.log({ pretty });
  return pretty;
}

//writes to notes file
async function writeNotes(notesData) {
  //for future reference - stringify arguments are:
  //- object to write to file
  //- function to modify data for stringification, "null" means use standard
  //- 2 is number of spaces to indent to make things pretty
  await fs.writeFile(DB_FILE, JSON.stringify(notesData, null, 2));
}

app.get("/notes", (req, res) => {
  //console.log({ notesData });
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//return saved notes from our db file
//NOTE: the "async" is required in "async (req, res)" OR using on readNotes() will not work
app.get("/api/notes", async (req, res) => {
  try {
    //console.log("Getting the notes: ");
    const notes = await readNotes();
    //console.log(`notes are ${notes.length} long`);
    //console.log("this is what we got back from notes", notes);
    res.json({ status: "success", total: notes.length, body: notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to read notes" });
  }
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log("Adding this note: ", req.body);
  const { title, text } = req.body;
  const newNote = {
    id: uuid(),
    title,
    text,
  };
  notesData.push(newNote);
  console.log("Updated Notes Data: ");
  console.log({ notesData });
});

app.listen(PORT, () => {
  console.log(`Serving static assets at http://localhost:${PORT}`);
});
