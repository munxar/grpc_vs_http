var http = require("http");

function handler(req, res) {
    req.setEncoding("utf-8");

    req.on("data", function(data) {
        var body = JSON.parse(data);
        res.writeHead(200, {
            "content-type": "application/json"
        });
        res.end(JSON.stringify({message: 'Hello ' + body.name}));
    });
}

var server = http.createServer(handler);

module.exports = {
    start: () => new Promise(resolve => server.listen(3000, resolve)),
    stop: () => new Promise(resolve  => {
        server.close();
        resolve();
    })
};
