const connectToMongo = require('./db.js');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

//Avialable routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})