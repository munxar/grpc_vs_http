var grpc = require('grpc');
var hello_proto = grpc.load(__dirname + "/product.proto").helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
}

var server = new grpc.Server();
server.addProtoService(hello_proto.Greeter.service, {sayHello: sayHello});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

module.exports = {
    start: () => {
        server.start();
        return Promise.resolve();
    },
    stop: () => new Promise(resolve => server.tryShutdown(resolve))
};
