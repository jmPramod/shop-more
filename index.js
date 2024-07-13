
require('dotenv').config();
const port = process.env.PORT;
const { connectMongooseDB } = require('./config/db.connect');
const { createServer } = require('./server');


const app = createServer()
//!server running
connectMongooseDB();
app.listen(port, () => {
  console.log(
    `Server is running on port http://localhost:${port}/login/ !!!`
  );
});


module.exports = { app }
