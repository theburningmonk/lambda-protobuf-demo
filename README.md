# lambda-protobuf-demo

Demo using API Gateway and Lambda with Protocol Buffer.

In this demo you'll find 3 handlers:

* json - always return response in JSON
* proto - always return response in protocol buffer format, you need to set the
`Accept` header to `application/x-protobuf` for this to work otherwise API Gateway
just returns the base64 string instead
* contentNegotiated - uses the `Accept` header to decide whether to return JSON
or protocol buffer, and return `406 Not Acceptable` if the `Accept` header is 
neither `application/json` nor `application/x-protobuf`

For more details, please read this [blog post](https://medium.com/@theburningmonk/using-protocol-buffers-with-api-gateway-and-aws-lambda-22c3804f3e76).

### Deployment

If you're on Linux, run `./deploy.sh`.

If you're not on Linux, run `docker-compose up`.

Why use `docker` for deployment? Because the `protobufjs` library used to encode
Protocol Buffer messages has a dependency that is distributed as a native
binary. So in order to get the right version you need to run grab the dependency
on a Linux system, `docker` provides a nice abstraction to do that.