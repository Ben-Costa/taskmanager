const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//app.use('/api/v1/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  //query the database and print out all the notes to the web page
  res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});