# Comic Vine API

## Installation

Use one package manager like yarn or npm to install the dependencies to the both folders (backend and frontend). I'm using the package.json outside of these folders, then you just need to run the command below on the main folder.

```bash
yarn
```

This command will enter on the both folders and will install the dependencies to the both projects.

## Usage

You just need to run the command below to execute the both projects simultaneously (backend and frontend).

```bash
yarn start
```

After these steps, the browser will open a new tab at localhost:3000 to see the application running.

## Support

Some tests are implemented in the frontend. To execute them, follow the steps.

```bash
cd front
yarn test
```

Prettier and Lint are implemented in the backend. To execute them, follow the steps.

```bash
cd back
yarn lint # here you can see the errors related to Lint
yarn lint:fix # here we are fixing the errors related to Lint
yarn format # here you can see the errors related to Prettier
yarn format:fix # here we are fixing the errors related to Prettier
```
