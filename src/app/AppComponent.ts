import { Component } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";

import Carbon from "carbonldp/Carbon";

import template from "./template.html!";
import style from "./style.css!text";

@Component( {
	selector: "app",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES ]
} )
export default class App {
	private version:string;

	constructor( private carbon:Carbon ) {
		this.version = this.carbon.version;
	}
}
