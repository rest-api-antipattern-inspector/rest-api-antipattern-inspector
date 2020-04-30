# rest-api-antipattern-inspector

This is a program for detecting REST design antipatterns in APIs.

## Instructions

### Get started

- An installation of Node.js version 10.0.0 (or higher) is required to run this program.
- Install dependencies with the command: `npm i`
- The unit tests of correctness of the REST design antipattern detecting functions can be run without having to fill in any environment variables, just run the command `npm test`
- Many API calls require API keys, tokens and other configuration values. To be able to run this program on an API, fill in the environment variables needed in a .env file. See the .env.example file to see which configuration values are needed for the various APIs.
- Commands for various actions are listed below.

### Run unit tests

```
npm test
```

### Build & run program

```
npm start <names of APIs separated with space or "all">
```

### Build

```
npm run build
```

### Run program without building

```
npm run program <names of APIs separated with space or "all">
```
