import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { Class as Context } from "carbonldp/Context";
import { ContextToken } from "angular-carbonldp/boot";
import { AuthService } from "angular-carbonldp/services";

@Component( {
	selector: "secured",
	templateUrl: "secured.view.html",
	styles: [],
} )
export class SecuredView {
	router:Router;
	context:Context;
	authService:AuthService.Class;
	user:string = "";

	constructor( router:Router, @Inject( ContextToken ) context:Context, @Inject( AuthService.Token ) authService:AuthService.Class ) {
		this.router = router;
		this.context = context;
		this.authService = authService;
		this.user = this.context.auth.authenticatedAgent[ "name" ] ? this.context.auth.authenticatedAgent.name : this.context.auth.authenticatedAgent.email;
	}

	logout():void {
		this.authService.logout();
		this.router.navigate( [ "/login" ] );
	}
}

export default SecuredView;
