import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";

import { Class as Carbon } from "carbonldp/Carbon";
import { activeContext } from "angular-carbonldp/boot";

@Component( {
	selector: "bp-error",
	templateUrl: "./error.view.html",
	styleUrls: [ "./error.view.css" ],
} )
export class ErrorView implements OnInit, AfterViewInit {
	error:any;
	errorType:string;

	constructor( private router:Router, private carbon:Carbon ) {}

	ngOnInit():void {
		activeContext.promise.then( () => {
			// The active context was successfully loaded, the user must have landed here by visiting the direct URL
			// Let's redirect him to the home page
			this.router.navigate( [ "/home" ] );
		} );
	}

	ngAfterViewInit():void {
		activeContext.promise.catch( ( error ) => {
			this.error = error;
			this.errorType = "requestID" in this.error ? this.error.name : null;

			if( this.errorType === null ) console.error( this.error );
		} );
	}
}

export default ErrorView;
