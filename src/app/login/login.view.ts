import { Component, Inject, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "angular-carbonldp/services";
import { Class as Credentials } from "carbonldp/Auth/Credentials";
import { Class as Carbon } from "carbonldp/Carbon";
import { Class as HTTPError } from "carbonldp/HTTP/Errors/HTTPError";

@Component( {
	selector: "login-view",
	templateUrl: "./login.view.html",
	styleUrls: [ "login.view.css" ]
} )
export class LoginView {
	router:Router;
	carbon:Carbon;
	authService:AuthService.Class;

	login:{ email:string, password:string, rememberMe:boolean } = {
		email: "",
		password: "",
		rememberMe: false
	};
	hasAccount:boolean = true;
	error:HTTPError;

	constructor( router:Router, carbon:Carbon, @Inject( AuthService.Token ) authService:AuthService.Class ) {
		this.router = router;
		this.carbon = carbon;
		this.authService = authService;
	}

	onSubmit( data:{ email:string, password:string, rememberMe:boolean }, $event ):void {
		$event.preventDefault();

		let username:string = data.email;
		let password:string = data.password;
		let rememberMe:boolean = data.rememberMe;

		this.error = null;
		this.authService.login( username, password, rememberMe ).then( ( credentials:Credentials ) => {
			this.onLogin();
		} ).catch( ( error:HTTPError ) => {
			this.error = error;
			console.error( error );
		} );
	}

	onLogin():void {
		this.router.navigate( [ "/secured" ] );
	}

}

