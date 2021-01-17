## Express Rest Api Boilerplate

Express Rest Api with [JWT](https://jwt.io/) Authentication and support for [Typescript](https://www.typescriptlang.org/) and other common library which provide for you ready starter application. 

Functionalities:
- code based on [Typescript](https://www.typescriptlang.org/)
- suport for [postgresql](https://www.postgresql.org/) and example migration script
- authentication via [JWT](https://jwt.io/)
- environments for `development` via [dotenv](https://www.npmjs.com/package/dotenv)
- linting via [eslint](https://github.com/eslint/eslint)
- tests running with [Jest](https://github.com/facebook/jest) and [SuperTest](https://www.npmjs.com/package/supertest)
- built with [npm sripts](#npm-scripts)
- status codes via [http-status-codes](https://www.npmjs.com/package/http-status-codes)
- git hooks via [husky](https://www.npmjs.com/package/husky)
- security elements from [helmet](https://www.npmjs.com/package/helmet)
- logger via [morgan](https://www.npmjs.com/package/morgan)
- example User & Auth controller, with jwt authentication

## Installation and usage guide for development

Before start: 
- Setup postgres database: [Postgres Docs](https://www.postgresql.org/docs/current/tutorial-start.html)
- Clone this repository: `git clone https://github.com/r0ndi/express-rest-api-boilerplate.git`

```sh
# cd into project
$ cd express-rest-api-boilerplate
# change .env.development file for yourself
# install dependencies
$ npm install
# build TS to JS in watching mode
$ npm run build-watch
# run nodemon server in dev mode
$ npm run dev -- start-watch
```

## Npm scripts

`npm run dev -- {{ script name }}` - run scripts in dev mode\
`npm run start` - start server\
`npm run start-watch` - start server in watching mode\
`npm run build` - compile *.ts files to *.js files into `/dist`\
`npm run build-watch` - start compile files in watching mode\
`npm run lint` - checking code structure\
`npm run test` - run tests

## Licence

MIT @ Konrad Sądel