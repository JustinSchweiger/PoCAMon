require('dotenv').config()
const http = require("http");
const fs = require("fs");   // for reading files
const host = process.env.HOST;
const port = process.env.PORT

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + "/pages/index.html"));
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${process.env.PORT}/`);
});