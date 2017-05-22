import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { Class as Carbon } from "carbonldp/Carbon";
import { AuthService } from "angular-carbonldp/services";

@Component( {
	selector: "secured",
	templateUrl: "secured.view.html",
	styles: [],
} )
export class SecuredView {
	router:Router;
	carbon:Carbon;
	authService:AuthService.Class;
	user:string = "";

	constructor( router:Router, carbon:Carbon, @Inject( AuthService.Token ) authService:AuthService.Class ) {
		this.router = router;
		this.carbon = carbon;
		this.authService = authService;
		this.user = (this.carbon.auth.authenticatedUser && this.carbon.auth.authenticatedUser.name ) ? this.carbon.auth.authenticatedUser.name : "User";
	}

	logout():void {
		this.authService.logout();
		this.router.navigate( [ "/login" ] );
	}
}

export default SecuredView;
