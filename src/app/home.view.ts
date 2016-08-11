import {Component, AfterView} from "@angular/core";

import {RequiresActiveContext} from "angular2-carbonldp/decorators";

import template from "./home.view.html!text"

@RequiresActiveContext( {redirectTo: [ "/Error" ]} )
@Component( {
	selector: "home",
	template: template,
	styles: [],
	directives: [],
} )
export class HomeView {

}

export default HomeView;
