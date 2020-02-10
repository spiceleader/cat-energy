# Project «Pognali» by [HTML Academy](https://htmlacademy.ru)

[![Build status][travis-image]][travis-url] [![Dependency status][dependency-image]][dependency-url]

Project based on this [Gulp template](https://github.com/spiceleader/startup-gulp-template#readme)

Code by: [Rostyslav Miniukov](https://github.com/spiceleader/)

---

## Usage

`npm install` - install dependencies.

`npm start` - building project in dev mode and launching local server.

`npm run build` - building project.

`npm run deploy` - building project and deploying it on [GitHub Pages](https://pages.github.com).

`npm run dist` - building project and archieving it in zip.

`npm test` - launching linting test.

---

## Template Structure

```bash
.
├── build/            # project build directory (created automatically)
├── dist/             # directory in which the assembled project is archived (created automatically)
├── source/           # directory for placing project source files
│   ├── fonts/        # fonts directory
│   ├── img/          # images directory
│   │   └── content/  # content images directory for converting to webp format
│   │   └── icons/    # vector images directory for generating svg sprite
│   ├── js/           # JavaScript directory
│   ├── sass/         # styles directory
│   └── index.html    # page mark-up file
├── .babelrc          # Babel config
├── .editorconfig     # Editor config
├── .eslintrc.json    # ESLint config
├── .gitattributes    # Git attributes file
├── .gitignore        # Git ignore file
├── .npmrc            # npm config
├── .stylelintrc.json # stylelint config
├── .travis.yml       # Travis CI config
├── gulpfile.js       # Gulp tasks file
├── package.json      # npm dependencies and project settings file
├── package-lock.json # npm lock-file
└── README.md         # project documents
```

[travis-image]: https://travis-ci.org/spiceleader/pognali.svg?branch=master
[travis-url]: https://travis-ci.org/spiceleader/pognali
[dependency-image]: https://david-dm.org/spiceleader/pognali/dev-status.svg?style=flat-square
[dependency-url]: https://david-dm.org/spiceleader/pognali?type=dev
