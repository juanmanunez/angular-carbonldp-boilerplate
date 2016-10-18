import { NgModule } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import { URL_BASE } from "app/config";

import { routing, appRoutingProviders } from "app/app.routing";
import { AppComponent } from "app/app.component";
import { HomeView } from "app/home.view";
import { LoginView } from "app/login.view";
import { SecuredView } from "app/secured.view";
import { ErrorView } from "app/error.view";

import { BackgroundVideoComponent } from "app/background-video.component";

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

		BackgroundVideoComponent,
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