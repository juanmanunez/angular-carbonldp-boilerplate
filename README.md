# Angular2 + JSPM + CarbonLDP Boilerplate
A boilerplate to get you started creating web applications using Angular2 + JSPM + CarbonLDP

## Setup
1. Install dependencies
    - [node.js 5+](https://nodejs.org/en/)
    - gulp: `npm install -g gulp`
    - jspm: `npm install -g jspm@beta`
2. cd into the project's root directory
3. run `npm install`
4. Open `src/app/boot.ejs.ts`, uncomment line 26 and fill it with your carbon app' slug (also delete line 27)
5. If needed configure the main carbon context in line 23 of `src/app/boot.ejs.ts`
6. run `npm serve`

## Gulp Tasks
- `build`: Build the bundled version of the web app. Can be run with `--profile prod` to indicate what configuration file to use.
- `serve`: Serve the development version of the web app.
- `serve:dist`: Serve the bundled version of the web app.

## File Structure
- `config`: Configuration files used by the build system to replace values with EJS tags. Each file corresponds to a profile configuration. To build the site using the local.json file you can execute `gulp build --profile local`. More files can be created as needed and do not need to be configured somewhere else.
- `dist`: Distribution related files.
  - `site`: Compiled files. Ready to be served.
  - `index.ejs.html`: index file to be used in the bundled version of the web app.
- `jspm_packages`: jspm dependencies (don't touch them)
- `node_modules`: npm dependencies (don't touch them)
- `src`: All source files
  - `app`: Source files for the Angular2 application
    - `AppComponent.ts`: Main component of the Angular2 app
    - `boot.ejs.ts`: Main entry point for the Angular2 app. Here the app gets configured and bootstrapped.
    - `style.css`: Style file for AppComponent.ts
    - `template.html`: Template file for AppComponent.ts
  - `assets`: Any asset (image, json, etc.). Before adding stylesheets think if they belong to a component.
  - `index.html`: index file for the development version of the web app
- `.gitignore`: Declaration of files to be ignored by git
- `CHANGELOG.md`: Informative file that states the latest changes to the project
- `gulpfile.js`: Gulp configuration file
- `jspm.browser.js`: jspm browser specific configuration file
- `jspm.config.js`: Main jspm configuration file
- `package.json`: npm configuration file
- `README.md`: === this
- `tsconfig.json`: Configuration file for typescript's compiler
- `typings.json`: typings configuration file

## TODO
- Add e2e testing
