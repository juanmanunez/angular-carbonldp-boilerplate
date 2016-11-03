# Angular2 + JSPM + CarbonLDP Boilerplate

A boilerplate to get you started creating web applications using Angular2 + JSPM + CarbonLDP

## Setup
1. Install dependencies
    - [node.js 6+](https://nodejs.org/en/)
    - gulp: `npm install -g gulp`
    - jspm: `npm install -g jspm@beta`
2. cd into the project's root directory
3. Run `npm install`
4. Run `jspm install`
5. Open `config/local.json`, and change the configuration to match your platform installation 
6. Run `npm start` 

    This script will execute a set of tasks including `gulp compile` which uses the EJS file `src/app/config.ejs.ts` to load all the configuration parameters

## Next Steps
### Saving the project as a new Git repository
When you are ready to save your project as a new Git repository just delete the `.git` folder in the root directory of the project, and execute `git init` like with any new git project.

## Gulp Tasks
- `build`: Build the bundled version of the web app. Can be run with `--profile prod` to indicate what configuration file to use.
- `serve`: Serve the development version of the web app.

    **Note:** `live-reload` is not enabled by default. Loading the application is an expensive process that can take some time to finish. Making it on each change may consume too much CPU.

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
- `.npmrc`: npm configuration file
- `CHANGELOG.md`: Informative file that states the latest changes to the project
- `gulpfile.js`: Gulp configuration file
- `jspm.browser.js`: jspm browser specific configuration file
- `jspm.config.js`: Main jspm configuration file
- `npm-shrinkwrap.json`: Configuration to lock npm dependencies
- `package.json`: npm configuration file
- `README.md`: === this
- `tsconfig.json`: Configuration file for typescript's compiler

## TODO
- Add e2e testing
