var gRPC = require("./gRPC");
var http = require("./http");

const loops = 100;
console.log("duration for %s requests:", loops);

gRPC.server.start()
    .then(() => {
        console.time("gRPC");
        return gRPC.client(loops).then(() => console.timeEnd("gRPC"));
    })
    .then(() => gRPC.server.stop())
    .then(() => http.server.start())
    .then(() => {
        console.time("http");
        return http.client(loops).then(() => console.timeEnd("http"));
    })
    .then(() => http.server.stop())
    .catch(console.error.bind(console))
;
