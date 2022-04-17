const connectToMongo = require('./db.js');
const express = require('express')
var cors = require('cors')
const path = require("path")
require("dotenv").config()


connectToMongo();
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")))


//Avialable routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})