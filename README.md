# Alexa Adventure

[![CircleCI](https://circleci.com/gh/nickcherry/alexa-adventure.svg?style=svg&circle-token=180458eacd17b82c3e21349e45c22f44e1a76eb2)](https://circleci.com/gh/nickcherry/alexa-adventure)

## Dependencies

To install required Node dependencies, run the following from the project root:

```shell
  npm install
```

For deployment, [FFmpeg](https://ffmpeg.org/) and [LAME](http://lame.sourceforge.net/) are required to convert audio files to [an Alexa-friendly format](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference#audio). To install these dependencies with Homebrew, run the following:

```shell
brew install lame
brew install ffmpeg
```

## Secrets

All the app's sensitive data should reside in a `secrets.json` file, which will be excluded from version control. To copy the expected template for this file, run the following from the project root:

```shell
cp apps/adventure/secrets.template.json apps/adventure/secrets.json
```

Then substitute valid credentials in for all placeholders. See [`apps/adventure/settings.js`](apps/adventure/settings.js) and [./deploy.sh](deploy.sh) for usage.


## Development Server

First, be sure that a local instance of [DynamoDB](https://github.com/Medium/local-dynamo) is running. To start the database, run the following from the project root:

```shell
npm run dynamo
```

Then, to start the [alexa-app-server](https://github.com/matt-kruse/alexa-app-server), run the following from the project root:

```shell
npm start
```

The alexa-app-server testing utility will be available at [http://localhost:8080/alexa/adventure](http://localhost:8080/alexa/adventure). See [`serve.js`](serve.js) for more information.

## Scripts

To simulate a script from the commandline, first be sure that Dynamo is available (`npm run dynamo`), then run the following from the project root, where `hello.json` is a script file within the `apps/adventure/scripts` directory:

```shell
npm run simulate --script=wizard_of_oz.json
npm run simulate --script=wizard_of_oz.json --compact # minimize State output
```

## Deployment

To deploy, be sure that `app/adventures/secrets.json` is populated and that Dynamo is available (`npm run dynamo`), then run the following from the project root:

```shell
npm run deploy
```

This will generate a `build.zip` file, which should be uploaded to Amazon.

## Custom Slots

To generate values for all custom slots, run the following from the project root:

```shell
npm run custom-slots
```

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

To test only the scripts (`./apps/adventure/scripts/**/*.json`), run the following from the project root:

```shell
npm run test-scripts
```

## Lint

To lint all javascript, run the following from the project root:

```shell
npm run lint
```
