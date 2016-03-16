import { Component } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { ROUTER_DIRECTIVES, Location, RouteConfig, RouterLink, Router } from "angular2/router";

import Carbon from "carbonldp/Carbon";
import { Context } from "carbonldp/App";

import template from "./template.html!";

@Component( {
	selector: "app",
	template: template,
	directives: [ CORE_DIRECTIVES ]
} )
export default class App {
	private carbon:Carbon;
	private version:string;

	constructor( carbon:Carbon, appContext:Context ) {
		this.carbon = carbon;
		this.version = Carbon.version;
		console.log( appContext );
	}
}
