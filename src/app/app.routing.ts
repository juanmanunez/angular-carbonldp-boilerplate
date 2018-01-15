import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeView } from "app/home/home.view";
import { NotFoundErrorView } from "app/errors/not-found-error/not-found-error.view";

const appRoutes:Routes = [
	{path: "", redirectTo: "/home", pathMatch: "full"},
	{
		path: "home",
		component: HomeView,
	},
	{
		path: "**",
		component: NotFoundErrorView,
		data: {
			title: "404 | Boilerplate",
		}
	}
];

export const routing:ModuleWithProviders = RouterModule.forRoot( appRoutes );
