import {Component, AfterViewInit} from "@angular/core";
import {Router, OnActivate} from "@angular/router-deprecated";

import {activeContext} from "angular2-carbonldp/boot";

import {BackgroundVideoComponent} from "./background-video.component";

import template from "./error.view.html!text";
import style from "./error.view.css!text";

@Component( {
	selector: "bp-error",
	template: template,
	styles: [ style ],
	directives: [ BackgroundVideoComponent ],
} )
export class ErrorView implements AfterViewInit, OnActivate {
	private error:any;
	private errorType:string;

	constructor( private router:Router ) {}

	ngAfterViewInit():void {
		activeContext.promise.catch( ( error ) => {
			this.error = error;
			this.errorType = "requestID" in this.error ? this.error.name : null;

			if( this.errorType === null ) console.error( this.error );
		} );
	}

	ngOnActivate():void {
		activeContext.promise.then( () => {
			// The active context was successfully loaded, the user must have landed here by visiting the direct URL
			// Let's redirect him to the home page
			this.router.navigate( [ "/Home" ] );
		} );
	}
}

export default ErrorView;
