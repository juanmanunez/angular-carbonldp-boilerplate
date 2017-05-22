import { NgModuleRef, enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { CARBON_PROTOCOL, CARBON_DOMAIN, DEBUG } from "app/config";
import { AppModule } from "app/app.module";
import { carbonProvider, appInjector } from "angular-carbonldp/boot";
import { Class as Carbon } from "carbonldp/Carbon";

let hasSSL:boolean = CARBON_PROTOCOL.toLowerCase() === "https";
let carbon:Carbon = new Carbon( CARBON_DOMAIN, hasSSL );

carbonProvider.initialize( <any>carbon );

if( ! DEBUG ) enableProdMode();

platformBrowserDynamic().bootstrapModule( AppModule ).then( ( moduleRef:NgModuleRef<AppModule> ) => {
	// Give angular-carbonldp access to the main injector of the module
	appInjector( moduleRef.injector );
} ).catch( ( error ) => {
	console.error( "Couldn't bootstrap the application" );
	console.error( error );
	return Promise.reject( error );
} );