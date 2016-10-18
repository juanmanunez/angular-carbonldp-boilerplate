import { NgModule } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import { URL_BASE } from "app/config";

import { routing, appRoutingProviders } from "./app.routing";
import { AppComponent } from "./app.component";
import { HomeView } from "./home.view";
import { LoginView } from "./login.view";
import { SecuredView } from "./secured.view";
import { ErrorView } from "./error.view";

@NgModule( {
	imports: [
		BrowserModule,
		routing
	],
	declarations: [
		AppComponent,
		HomeView,
		LoginView,
		SecuredView,
		ErrorView,
	],
	providers: [
		appRoutingProviders,
		{
			provide: APP_BASE_HREF,
			useValue: URL_BASE
		},
		CARBON_PROVIDERS,
		CARBON_SERVICES_PROVIDERS
	],
	bootstrap: [ AppComponent ],
} )
export class AppModule {
}