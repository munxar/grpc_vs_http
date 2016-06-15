#speed comparison between gRPC and http

## setup
npm i

## run
npm start

## explanation
in both cases a very small message with one attribute is used:

{
    name: "munxar"
}

then 100 of this messages are send with gRPC and a pure node http 
implementation (POST, message in body). The servers both reply with a 
message of the form:

{
    message: 'Hello munxar'
}

time is measured with console.time.
 
## outcome
http is by factor 2 slower than gRPC on my machine, which was expected. 
each http request is doing a full HTTP request/response cycle, while 
gRPC just uses one.

additionally gRPC can rely on binary buffers serialization, http version 
uses the good old JSON.stringify / JSON.parse.

## todo
- check different message sizes
- make more complex messages (arrays, trees)
 
## numbers 
*2.2 GHz Intel Core i7 | 8 GB 1600 MHz DDR3 | node v6.2.1*

duration for 100 requests:
gRPC: 58.618ms
rest: 116.591ms
