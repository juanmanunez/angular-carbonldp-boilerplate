import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthenticatedGuard, NotAuthenticatedGuard } from "angular-carbonldp/guards";
import { ActiveContextResolver } from "angular-carbonldp/resolvers";

import { HomeView } from "app/home.view";
import { LoginView } from "app/login.view";
import { SecuredView } from "app/secured.view"
import { ErrorView } from "app/error.view";

const appRoutes:Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
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
	{ path: "error", component: ErrorView }
];


export const appRoutingProviders:any[] = [
	ActiveContextResolver,
	AuthenticatedGuard,
	NotAuthenticatedGuard,
];

export const routing:ModuleWithProviders = RouterModule.forRoot( appRoutes );
