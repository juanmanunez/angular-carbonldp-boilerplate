import {Component} from "@angular/core";

import {Authenticated} from "angular2-carbonldp/decorators";

@Authenticated( {redirectTo: [ "/Home" ]} )
@Component( {
	selector: "secured",
	styles: [],
	directives: [],
} )
export class SecuredView {

}

export default SecuredView;
