# OwnRecipes Web Frontend

This is the official web frontend for OwnRecipes. OwnRecipes is an open source recipe management site. You can share recipes with friends, rate recipes, store your favorite recipes to find easily, and more!

See [the homepage](https://github.com/ownrecipes/OwnRecipes) for more information about OwnRecipes.

This project was forked from OpenEats. See [the homepage](https://github.com/open-eats/OpenEats) for more information about OpenEats!

## Main differences to OpenEats

OwnRecipes was rewritten from scratch. The main goal was to keep compatibility to the OpenEats API, while providing a more modern solution.
You could run ownrecipes-web with openeats-api, though it doesn't make too much sense.

ownrecipes-web comes with several, but not exclusively, improvements:

* It is built with [CRA](https://create-react-app.dev/) and is not ejected. That makes upgrading to future releases easier. But it comes with costs of reduced customizability.
* The code is typed with [TypeScript](https://www.typescriptlang.org/), reducing coding errors and increasing the maintainability.
* The GUI is nice, modern and fully responsive.
* Many smaller improvements, like enhanced parsing of measurements, auto-completion for tags and new filters for tags.
* Support for sub-path hosting was added, making it a solid choice to run on a Raspberry Pi.
* It can be switched into a private mode, where login is required to avoid Copyright infringement.
* Much, much more.

## Dev Tips

### Running tests

To run the (offline) unit tests:

```npm run test```

To run tests locally:

```bash
cd ownrecipes-api
docker-compose -f test.yml -p test build
docker-compose -f test.yml -p test run --rm --entrypoint sh web
./node_modules/.bin/jest --coverage
```

### Generating locale files

After adding new `defineMessages` you'll need to update the locale files. Instead of doing it manually you can run this script to do it for you.

```bash
npm run locales
```

**Adding new languages:**

1. Add the new language code to the package.json, script "locales".
2. Add the new language code to src/common/language.ts:
    * enum LanguageCode
    * function getMessageFromLang
4. Generate the locale files (see command above).
5. Define the messages in the just created language file.

#### Building the demo site

The demo site is built using pure js and relies on populating the redux store when the app starts. If more data needs to be added be sure to update [the demo json](https://github.com/ownrecipes/ownrecipes-web/tree/master/modules/common/demo).

Run:

```bash
git checkout gh-pages-deploy
git rebase development
npm install
npm run deploy
```

This will generate all the require files in the build folder. These files will copied directly into the demo repo, thus the changes will be applied immediately.
