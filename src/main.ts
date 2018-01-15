import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { DEBUG } from "app/config";
import { AppModule } from "app/app.module";

if( ! DEBUG ) enableProdMode();

platformBrowserDynamic().bootstrapModule( AppModule ).catch( ( error ) => {
	console.error( "Couldn't bootstrap the application" );
	console.error( error );
	return Promise.reject( error );
} );