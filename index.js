const fs = require("fs");

const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//function to serv CSS
app.use(express.static('public'));

//get and join to display index.html 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

//read get /notes and join to show notes.html
app.get('notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  const notes = require('./db/db.json');
  res.json(notes);
});

//add new notes to db.json with post method
app.post('/api/notes', (req, res) => {
  //set db.json file to variables
  const db = require('./db/db.json');
  const newNote = req.body;
  //each newNote gets an id
  newNote.id = db.length;
  // add newNOte to db.json
  db.push(newNote);
  //write new array to db.json
  fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
    if (err) throw err;
  })
  return res.json(newNote)
})

//delete notes with delete method
app.delete('/api/notes/:id', (req, res) => {
  const db = require('./db/db.json');
  //filter and return new array to
  const newNoteArr = db.filter(item => {
    return JSON.parse(req.params.id)
  })
  //add new array to db.json
  fs.writeFile('./db/db.json', JSON.stringify(newNoteArr), (err) => {
    if (err) throw err;
    return res.json(req.params.id)
  })
})

app.listen(PORT, () => {
  console.log('Server is listenin to PORT: ${PORT}')
})
