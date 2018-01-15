import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { BASE_URL, CARBON_DOMAIN, CARBON_PROTOCOL } from "app/config";

import { routing } from "app/app.routing";
import { AppComponent } from "app/app.component";
import { HomeView } from "app/home/home.view";
import { NotFoundErrorView } from "app/errors/not-found-error/not-found-error.view";
import { Class as Carbon } from "carbonldp";
import { Class as Context } from "carbonldp/Context";

@NgModule( {
	imports: [
		BrowserModule,
		FormsModule,
		routing
	],
	declarations: [
		AppComponent,
		HomeView,
		NotFoundErrorView,
	],
	providers: [
		{
			provide: APP_BASE_HREF,
			useFactory: BASE_URL
		},
		{
			provide: Carbon,
			useFactory: aotCarbonFactory,
		},
	],
	bootstrap: [ AppComponent ],
} )
export class AppModule {
}


let carbon:Carbon = new Carbon( CARBON_DOMAIN, CARBON_PROTOCOL.toLowerCase() === "https" );
export function aotCarbonFactory():Context {
	return carbon;
}