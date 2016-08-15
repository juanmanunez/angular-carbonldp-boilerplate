import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RequiresActiveContextGuard, AuthenticatedGuard, NotAuthenticatedGuard } from "angular2-carbonldp/guards";

import { HomeView } from "app/home.view";
import { LoginView } from "app/login.view";
import { SecuredView } from "app/secured.view"
import { ErrorView } from "app/error.view";

const appRoutes:Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{
		path: "home",
		component: HomeView,
		canActivate: [ RequiresActiveContextGuard ],
		data: {
			onReject: [ "/error" ],
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
	RequiresActiveContextGuard,
	AuthenticatedGuard,
	NotAuthenticatedGuard,
];

export const routing:ModuleWithProviders = RouterModule.forRoot( appRoutes );
