import {Component, ViewEncapsulation} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {HomeView} from "app/home.view";
import {SecuredView} from "app/secured.view"
import {ErrorView} from "app/error.view";

import template from "./app.component.html!text";
import style from "./app.component.css!text";

@Component( {
	selector: "app",
	template: template,
	styles: [ style ],
	encapsulation: ViewEncapsulation.None,
	directives: [ ROUTER_DIRECTIVES ]
} )
@RouteConfig( [
	{path: "", redirectTo: [ "./Home" ]},
	{path: "home", as: "Home", component: HomeView},
	{path: "secured", as: "Secured", component: SecuredView},
	{path: "error", as: "Error", component: ErrorView}
] )
export class AppComponent {
	constructor() {}
}

export default AppComponent;
