# lambda-protobuf-demo

Demo using API Gateway and Lambda with Protocol Buffer.

### Deployment

If you're on Linux, run `./deploy.sh`.

If you're not on Linux, run `docker-compose up`.

Why use `docker` for deployment? Because the `protobufjs` library used to encode
Protocol Buffer messages has a dependency that is distributed as a native
binary. So in order to get the right version you need to run grab the dependency
on a Linux system, `docker` provides a nice abstraction to do that.