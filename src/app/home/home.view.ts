import { Component, Inject } from "@angular/core";

import { AuthService } from "angular-carbonldp/services";

@Component( {
	selector: "home",
	templateUrl: "./home.view.html",
	styles: [],
} )
export class HomeView {
	authService:AuthService.Class;

	constructor( @Inject( AuthService.Token ) authService:AuthService.Class ) {
		this.authService = authService;
	}
}

export default HomeView;
