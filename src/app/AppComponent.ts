import { Component } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { ROUTER_DIRECTIVES, Location, RouteConfig, RouterLink, Router } from "angular2/router";

import Carbon from "carbon/Carbon";

import template from "./template.html!";
import * as AppContext from "carbon/App";

@Component( {
	selector: "app",
	template: template,
	directives: [ CORE_DIRECTIVES ]
} )
export default class App {
	private carbon:Carbon;
	private version:string;

	constructor( carbon:Carbon, appContext:AppContext.Context ) {
		this.carbon = carbon;
		this.version = Carbon.version;
		console.log( appContext );
	}
}
