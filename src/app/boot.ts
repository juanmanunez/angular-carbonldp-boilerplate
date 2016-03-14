/// <reference path="./../../typings/typings.d.ts" />

import { bootstrap } from "angular2/platform/browser";
import { provide } from "angular2/core";
import { Provider } from "angular2/src/core/di/provider";
import { FORM_PROVIDERS } from "angular2/common";
import { ROUTER_PROVIDERS, APP_BASE_HREF } from "angular2/router";
import { HTTP_PROVIDERS } from "angular2/http";

import Carbon from "carbon/Carbon";

import AppComponent from "./AppComponent";

const CARBON_PROVIDER:Provider = provide( Carbon, {
	useFactory:():Carbon => {
		let carbon:Carbon = new Carbon();
		carbon.setSetting( "domain", "dev.carbonldp.com" );
		return carbon;
	},
} );

const CARBON_APP_PROVIDER:Provider = provide( Carbon, {
	useFactory:():Carbon => {
		let carbon:Carbon = new Carbon();
		carbon.setSetting( "domain", "dev.carbonldp.com" );
		return carbon;
	},
} );

bootstrap( AppComponent, [
	FORM_PROVIDERS,
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,

	provide( APP_BASE_HREF, { useValue: "/" } ),

	CARBON_PROVIDER,
	CARBON_APP_PROVIDER,
] );
