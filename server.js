import * as http from "http";
import * as fs from "fs";
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    const datePart = req.url?.replace('/', '') || null;
    if (!datePart) {
        res.statusCode = 400;
        res.end();
        return;
    }
    var date = new Date(datePart);
    if (!date.getTime) {
        res.statusCode = 400;
        res.end();
        return;
    }
    const now = new Date();
    if (now.getTime() < date.getTime()) {
        res.statusCode = 400;
        res.end();
        return;
    }
    const filePath = `./public/${req.url}.json`;
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.statusCode = 404;
            res.end();
            return;
        }
        res.statusCode = 200;
        res.end(content, 'utf-8');
    });
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
