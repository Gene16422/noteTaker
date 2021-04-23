// Display notes.html when /notes is accessed
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Display index.html when all other routes are accessed
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

//updates the json file whenever a note is added or deleted
function updateDb() {
    fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
        if (err) throw err;
        return true;
    });
}
