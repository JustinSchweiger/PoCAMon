require('dotenv').config()
const port = process.env.PORT;
const express = require('express');
const app = express();

app.use(express.static('pages'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});