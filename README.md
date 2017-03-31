# Angular + Webpack + CarbonLDP Boilerplate

A boilerplate to get you started creating web applications using Angular + JSPM + CarbonLDP

## Setup
1. Install dependencies
    - [node.js 6+](https://nodejs.org/en/)
2. cd into the project's root directory
3. Run `npm install`
5. Open `config/dev.config.json`, and change the configuration to match your platform installation 
6. Run `npm start` 

    This script will launch the `webpack-dev-server` which uses the `webpack.dev.js` file to bundle and serve the app following the settings from `dev.config.json`

## Next Steps
### Saving the project as a new Git repository
When you are ready to save your project as a new Git repository just delete the `.git` folder in the root directory of the project, and execute `git init` like with any new git project.

## NPM Tasks
- `build`: Builds the bundled version of the web app by running the `build:prod` task.
- `build:prod`: Builds the bundled version of the web app running the `webpack.prod.js file` using the `prod.config.js` settings

	**Note:** This task will [AoT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) compile your code. 
	Make sure your code is compatible with the current [AoT limitations](https://github.com/rangle/angular-2-aot-sandbox)
	
- `clean:dist`: Cleans `dist` directory
- `start`: Runs `server:dev`
- `serve:dev`: Serves the bundled version of the web app running the `webpack.dev.js file` using the `dev.config.js` settings

## File Structure

    .
    ├── config                              # Configuration files used while bundling the application
    │   ├── dev.config.json                 # Settings used during DEVELOPMENT mode of the application
    │   ├── head.config.js                  # HTML head elements injected into the application index.html
    │   ├── prod.config.json                # Settings used during PRODUCTION mode of the application
    │   ├── webpack.common.js               # Webpack's settings used by DEV and PROD modes
    │   ├── webpack.dev.js                  # Webpack bundling settings for DEVELOPMENT mode
    │   ├── webpack.helpers.js              # Helpers used by webpack's webpack.common/dev/prod.js files
    │   └── webpack.prod.js                 # Webpack bundling settings for PRODUCTION mode
    ├── dist                                # Distribution related files
    ├── src                                 # All source files
    │   ├── app                             # Source files of the Angular application
    │   ├── index.html                      # Entry point for the app
    │   ├── main.ts                         # Entry file of angular, it bootstrap the main angular module
    │   └── polyfills.ts                    # File that imports all the required polyfills
    ├── .gitignore                          # Ignore file for git
    ├── CHANGELOG                           # File to track package changes
    ├── package.json                        # npm configuration file
    ├── README.md                           # this
    └── tsconfig.json                       # Typescript compiler configuration file



## TODO
- Add e2e testing
