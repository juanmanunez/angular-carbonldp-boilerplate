import { Component } from "@angular/core";
import { Class as Carbon } from "carbonldp/Carbon";

@Component( {
	selector: "home",
	templateUrl: "./home.view.html",
	styles: [],
} )
export class HomeView {
	public carbon:Carbon;


	constructor( carbon:Carbon ) {
		this.carbon = carbon;
		console.log( this.carbon.version );
	}
}

export default HomeView;
