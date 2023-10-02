# LUCkyRegex

This tool allows you to test Lucene regular expressions within the browser. It is made possible by the following:

- A .net WASM service that runs on the client side and utilizes [Lucene.net](https://lucenenet.apache.org/)
- A Next.js project that integrates with the .net service

This tool can be accessed [https://target.github.io/LUCkyRegex/](here).

## Dependencies

- Node.js 18+
- .NET 7.

## To run locally:

### Install npm packages

`yarn install`

### Install .net tooling

Download and install .NET 7 from [https://dotnet.microsoft.com/en-us/download](https://dotnet.microsoft.com/en-us/download)

### Install necessary WASM tooling

```
dotnet workload install wasm-tools
dotnet workload install wasm-experimental
```

### Run start-up script

`./run.sh`

## To build:

Run `./build.sh`

The application can now be served up using a static server, such as `serve`

For example:

`cd docs`

`npm install -g serve`

`serve docs`
