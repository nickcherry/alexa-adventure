# Alexa RPG

## Dependencies

To install required Node dependencies, run the following from the project root:

```shell
  npm install
```

## Secrets

All the app's sensitive data should reside in a `secrets.json`, where it will be excluded from version control. To copy the expected template for `secrets.json`, run the following from the project root:

```shell
cp app/rpg/secrets.template.json app/rpg/secrets.json
```

Then substitute valid credentials in for the placeholders.


## Development Server

To start the [alexa-app-server](https://github.com/matt-kruse/alexa-app-server), run the following from the project root:

```shell
npm start
```

The alexa-app-server testing utility will be available at [http://localhost:8080/alexa/rpg](http://localhost:8080/alexa/rpg).

## Deployment

To generate a zip file of the files required by Lambda, run the following from the project root:

```shell
npm run build
```

This will generate a `build.zip` file, which should be uploaded to Amazon.

## Tests

To run the test suite, run the following from the project root:

```shell
npm test
```

To run the test suite with debugging enabled, run the following from the project root:

```shell
npm run test-debug
```
