/// <reference path="./../../typings/typings.d.ts" />
System.register(["angular2/platform/browser", "angular2/core", "angular2/common", "angular2/router", "angular2/http", "carbon/Carbon", "./AppComponent"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, core_1, common_1, router_1, http_1, Carbon_1, AppComponent_1;
    var CARBON_PROVIDER;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (AppComponent_1_1) {
                AppComponent_1 = AppComponent_1_1;
            }],
        execute: function() {
            CARBON_PROVIDER = core_1.provide(Carbon_1.default, {
                useFactory: function () {
                    var carbon = new Carbon_1.default();
                    carbon.setSetting("domain", "dev.carbonldp.com");
                    return carbon;
                },
            });
            browser_1.bootstrap(AppComponent_1.default, [
                common_1.FORM_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                core_1.provide(router_1.APP_BASE_HREF, { useValue: "/" }),
                CARBON_PROVIDER,
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map