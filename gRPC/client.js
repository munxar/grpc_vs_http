var grpc = require('grpc');
var hello_proto = grpc.load(__dirname + "/product.proto").helloworld;
var client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());

function run(size) {
    let count = size;
    return new Promise((resolve, reject) => {
        for(var i=0;i <size; i++) {
            client.sayHello({name: "munxar"}, function(err, response) {
                count--;
                if(err) {
                    reject(err);
                }
                if(count === 0) {
                    resolve();
                }
            });
        }
    });
}

module.exports = run;