// There are files that reference this two dependencies and therefore they get included in the bundled file
// This causes a conflict with angular2-polyfills.js, as that file also declares them
// To avoid this, angular2-polyfills.js is no longer included in the index.html and zone and reflect are declared here instead
import { NgModuleRef, enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app.module";

import { appInjector } from "angular2-carbonldp/boot";

import Carbon from "carbonldp/Carbon";

let carbon:Carbon = new Carbon();
// Here you can configure your carbon context, extend your ObjectSchemas, etc.
// Example:
carbon.setSetting( "domain", "<%- carbon.domain %>" );

// Uncomment the next statement and replace the string with your app slug. After that, delete the Error below.
// activeContext.initialize( carbon, "yout-app-slug/" );
throw new Error( "You haven't declared your app slug, please open boot.ts and change line 23" );
//
if( "<%- angular.debug %>" === "false" ) enableProdMode();

platformBrowserDynamic().bootstrapModule( AppModule ).then( ( moduleRef:NgModuleRef<AppModule> ) => {
	// Give angular2-carbonldp access to the main injector of the module
	appInjector( moduleRef.injector );
} ).catch( ( error ) => {
	console.error( "Couldn't bootstrap the application" );
	console.error( error );
	return Promise.reject( error );
} );
