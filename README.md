# xk6-cognito

An example module for https://k6.io/ to get a cognito access token using USER_SRP_AUTH flow.

See:
- to create k6 extension: https://github.com/grafana/xk6-sql/blob/master/sql.go , https://k6.io/blog/extending-k6-with-xk6/#building-the-extension-with-xk6 
- to get a cognito access token: https://github.com/alexrudd/cognito-srp


## Install

### Pre-built binaries 

``` sh
go install go.k6.io/xk6/cmd/xk6@latest
xk6 build master   --with github.com/tmieulet/xk6-cognito

./k6 run --vus 1 --duration 2s /scripts/examples/loadTest.js

```

### Build from source


``` sh
git clone https://github.com/tmieulet/xk6-cognito.git && cd xk6-cognito
docker run --rm -v $(pwd):/scripts -it --entrypoint sh golang:1.17-alpine

cd /scripts/
go install go.k6.io/xk6/cmd/xk6@latest
xk6 build v0.32.0  --with github.com/tmieulet/xk6-cognito="/scripts"


```

### Example

In examples, change all values with ```exToChange``` then run ``` mkdir -p /scripts/target && xk6 run --vus 1 --duration 2s /scripts/examples/loadTest.js```
