import { NgModuleRef, enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { CARBON_PROTOCOL, CARBON_DOMAIN, CARBON_APP_SLUG, DEBUG } from "app/config";
import { AppModule } from "app/app.module";
import { activeContext, appInjector } from "angular-carbonldp/boot";
import { Class as Carbon } from "carbonldp/Carbon";

let carbon:Carbon = new Carbon();
// Here you can configure your carbon context, extend your ObjectSchemas, etc.
// Example:
carbon.setSetting( "domain", CARBON_DOMAIN );
if( CARBON_PROTOCOL.toLowerCase() === "http" ) carbon.setSetting( "http.ssl", false );

if( CARBON_APP_SLUG ) activeContext.initialize( carbon, CARBON_APP_SLUG );

if( ! DEBUG ) enableProdMode();

platformBrowserDynamic().bootstrapModule( AppModule ).then( ( moduleRef:NgModuleRef<AppModule> ) => {
	// Give angular-carbonldp access to the main injector of the module
	appInjector( moduleRef.injector );
} ).catch( ( error ) => {
	console.error( "Couldn't bootstrap the application" );
	console.error( error );
	return Promise.reject( error );
} );