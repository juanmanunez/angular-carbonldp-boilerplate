import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthenticatedGuard, NotAuthenticatedGuard } from "angular-carbonldp/guards";
import { ActiveContextResolver } from "angular-carbonldp/resolvers";

import { HomeView } from "app/home/home.view";
import { LoginView } from "app/login/login.view";
import { SecuredView } from "app/secured/secured.view"
import { ErrorView } from "app/errors/error/error.view";
import { NotFoundErrorView } from "app/errors/not-found-error/not-found-error.view";

const appRoutes:Routes = [
	{path: "", redirectTo: "/home", pathMatch: "full"},
	{
		path: "home",
		component: HomeView,
		resolve: {
			activeContext: ActiveContextResolver
		},
		data: {
			onError: [ "/error" ],
		}
	},
	{
		path: "login",
		component: LoginView,
		canActivate: [ NotAuthenticatedGuard ],
		data: {
			onReject: [ "/secured" ],
			onError: [ "/error" ],
		}
	},
	{
		path: "secured",
		component: SecuredView,
		canActivate: [ AuthenticatedGuard ],
		data: {
			onReject: [ "/login" ],
			onError: [ "/error" ],
		}
	},
	{
		path: "**",
		component: NotFoundErrorView,
		data: {
			title: "404 | Boilerplate",
		}
	},
	{path: "error", component: ErrorView}
];


export const appRoutingProviders:any[] = [
	ActiveContextResolver,
	AuthenticatedGuard,
	NotAuthenticatedGuard,
];

export const routing:ModuleWithProviders = RouterModule.forRoot( appRoutes );
