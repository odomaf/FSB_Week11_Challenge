# 🏁 Sprint Notes (Express.js + JSON Persistence)

This project is a themed version of a classic Express.js note-taking app.

- **Main/** = the finished demo (what I will show in class)
- **Develop/** = the starter code you will complete

The goal is to practice:
- Express.js routing (HTML + API routes)
- Reading/writing a JSON file with `fs`
- Creating unique IDs for stored data
- (Bonus) Deleting data with a route parameter
- Deploying an Express app to Render

---

## 📁 Folder Guide


### `Develop/`
This is starter code. Some methods are intentionally left as `TODO`. 

For your code to be successfully deployed on Render or Netifly etc, move all code in Develop folder into the Top Level Directory of your Git repository

---

## ✅ Your Task

You will complete the back-end so users can write and save notes.

### HTML Routes
- `GET /notes` → returns `notes.html`
- `GET *` → returns `index.html` (fallback)

### API Routes
- `GET /api/notes` → returns all saved notes
- `POST /api/notes` → saves a new note and returns it
- ⭐ BONUS: `DELETE /api/notes/:id` → deletes a note by id

### Data Storage
- Notes are stored in `Develop/db/db.json`
- Use `fs` (via the helper methods in `Develop/db/store.js`)

---

## 🧪 How to Run Locally

From either folder (`Main` or `Develop`):

```bash
npm install
node server.js
```

Then visit:

- Home: `http://localhost:3001/`
- Notes: `http://localhost:3001/notes`

---

## 🚀 Deploy to Render (Student Checklist)

1. Make sure your server uses:
   ```js
   const PORT = process.env.PORT || 3001;
   ```
2. Push your repo to GitHub.
3. Create a **New Web Service** on Render.
4. Connect your GitHub repo.
5. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Deploy and test the live URL.

---
