# Alexa Adventure

## Dependencies

To install required Node dependencies, run the following from the project root:

```shell
  npm install
```

## Secrets

All the app's sensitive data should reside in a `secrets.json`, where it will be excluded from version control. To copy the expected template for `secrets.json`, run the following from the project root:

```shell
cp apps/adventure/secrets.template.json apps/adventure/secrets.json
```

Then substitute valid credentials in for the placeholders. See [`apps/adventure/settings.js`](apps/adventure/settings.js) for usage.


## Development Server

First, be sure that a local instance of [DynamoDB](https://github.com/Medium/local-dynamo) is running. To start the database, run the following from the project root:

```shell
npm run dynamo
```

Then, to start the [alexa-app-server](https://github.com/matt-kruse/alexa-app-server), be sure that Dynamo is available (`npm run dynamo`) and then run the following from the project root:

```shell
npm start
```

The alexa-app-server testing utility will be available at [http://localhost:8080/alexa/adventure](http://localhost:8080/alexa/adventure). See [`serve.js`](serve.js) for more information.

## Scripts

To simulate a script from the commandline, run the following from the project root, where `hello.json` is a script file within the `apps/adventure/scripts` directory:

```shell
npm run simulate --script=hello.json
```

## Deployment

To generate a zip file of the files required by Lambda, run the following from the project root:

```shell
npm run build
```

This will generate a `build.zip` file, which should be uploaded to Amazon.

## Tests

To run the test suite, be sure that Dynamo is available (`npm run dynamo`), then run the following from the project root:

```shell
npm test
```

To run the test suite with debugging enabled, be sure that Dynamo is available (`npm run dynamo`), then run the following from the project root:

```shell
npm run test-debug
```

To test only the schema (`./apps/adventure/schema.json`), run the following from the project root:

```shell
npm run test-schema
```

## Lint

To lint all javaschema, run the following from the project root:

```shell
npm run lint
```
