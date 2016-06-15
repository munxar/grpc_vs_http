const http = require("http");

// run a http request
function run(size) {
    let count = size;
    return new Promise((resolve, reject) => {
        for(let i=0; i<size; i++) {
            var req = http.request({
                path: "/",
                port: 3000,
                method: 'POST'
            }, res => {
                res.setEncoding("utf-8");
                res.on("data", chunk => {
                    count--;
                    if(count === 0) {
                        resolve();
                    }
                });
                res.on("error", err => {
                    reject();
                });
            });
            req.write(JSON.stringify({name:"munxar"}));
            req.end();
        }
    });
}

module.exports = run;