// There are files that reference this two dependencies and therefore they get included in the bundled file
// This causes a conflict with angular2-polyfills.js, as that file also declares them
// To avoid this, angular2-polyfills.js is no longer included in the index.html and zone and reflect are declared here instead
import "zone.js";
import "reflect-metadata";
import "zone.js/dist/long-stack-trace-zone";

import { NgModuleRef, enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { CARBON_PROTOCOL, CARBON_DOMAIN, CARBON_APP_SLUG, DEBUG } from "app/config";
import { AppModule } from "./app.module";

import { activeContext, appInjector } from "angular2-carbonldp/boot";

import Carbon from "carbonldp/Carbon";

let carbon:Carbon = new Carbon();
// Here you can configure your carbon context, extend your ObjectSchemas, etc.
// Example:
if( CARBON_PROTOCOL.toLowerCase() === "http" ) carbon.setSetting( "http.ssl", false );
carbon.setSetting( "domain", CARBON_DOMAIN );

// Uncomment the next statement and replace the string with your app slug. After that, delete the Error below.
if( CARBON_APP_SLUG ) activeContext.initialize( carbon, CARBON_APP_SLUG );

if( ! DEBUG ) enableProdMode();

platformBrowserDynamic().bootstrapModule( AppModule ).then( ( moduleRef:NgModuleRef<AppModule> ) => {
	// Give angular2-carbonldp access to the main injector of the module
	appInjector( moduleRef.injector );
} ).catch( ( error ) => {
	console.error( "Couldn't bootstrap the application" );
	console.error( error );
	return Promise.reject( error );
} );
