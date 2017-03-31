import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component( {
	selector: "not-found-error-view",
	templateUrl: "./not-found-error.view.html",
	styleUrls: [ "./not-found-error.view.css" ]
} )
export class NotFoundErrorView {
	router:Router;

	constructor( router:Router ) {
	}
}

