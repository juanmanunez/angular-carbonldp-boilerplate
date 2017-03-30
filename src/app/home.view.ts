import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "angular-carbonldp/services";

@Component( {
	selector: "home",
	templateUrl: "./home.view.html",
	styles: [],
} )
export class HomeView {
	authService:AuthService.Class;

	constructor( private router:Router, @Inject( AuthService.Token ) authService:AuthService.Class ) {
		this.authService = authService;
	}

	login():void {
		this.authService.login( "admin@carbonldp.com", "hello", true ).then( () => {
			this.router.navigate( [ "/secured" ] );
		} );
	}

	logout():void {
		this.authService.logout();
	}
}

export default HomeView;
