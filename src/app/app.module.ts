import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { CARBON_PROVIDERS } from "angular-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular-carbonldp/services";

import { BASE_URL } from "app/config";

import { routing, appRoutingProviders } from "app/app.routing";
import { AppComponent } from "app/app.component";
import { HomeView } from "app/home/home.view";
import { LoginView } from "app/login/login.view";
import { SecuredView } from "app/secured/secured.view";
import { ErrorView } from "app/errors/error/error.view";
import { NotFoundErrorView } from "app/errors/not-found-error/not-found-error.view";
import { BackgroundVideoComponent } from "app/errors/error/background-video.component";

@NgModule( {
	imports: [
		BrowserModule,
		FormsModule,
		routing
	],
	declarations: [
		AppComponent,
		HomeView,
		LoginView,
		SecuredView,
		ErrorView,
		NotFoundErrorView,
		BackgroundVideoComponent,
	],
	providers: [
		appRoutingProviders,
		{
			provide: APP_BASE_HREF,
			useFactory: BASE_URL
		},
		CARBON_PROVIDERS,
		CARBON_SERVICES_PROVIDERS
	],
	bootstrap: [ AppComponent ],
} )
export class AppModule {
}