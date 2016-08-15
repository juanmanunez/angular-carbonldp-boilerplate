import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "angular2-carbonldp/services";

import template from "./home.view.html!text"

@Component( {
	selector: "home",
	template: template,
	styles: [],
	directives: [],
} )
export class HomeView {
	constructor( private router:Router, @Inject( AuthService.Token ) private authService:AuthService.Class ) {}

	login():void {
		this.authService.login( "miguel.aragon@base22.com", "miguel", true ).then( () => {
			this.router.navigate( [ "/secured" ] );
		} );
	}

	logout():void {
		this.authService.logout();
	}
}

export default HomeView;
