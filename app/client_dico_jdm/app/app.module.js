"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
//Modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var router_1 = require("@angular/router");
var ng2_completer_1 = require("ng2-completer");
var ng2_auto_complete_1 = require("ng2-auto-complete");
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng");
var primeng_4 = require("primeng/primeng");
var primeng_5 = require("primeng/primeng");
var primeng_6 = require("primeng/primeng");
var primeng_7 = require("primeng/primeng");
//import {Ng2PageScrollModule} from 'ng2-page-scroll';
//Directives
//Components
var app_component_1 = require("./app.component");
var dico_component_1 = require("./Component/Dico/dico.component");
var dico_nav_component_1 = require("./Component/Dico/dico_nav.component");
var dico_alert_component_1 = require("./Component/Dico/dico_alert.component");
var dico_body_component_1 = require("./Component/Dico/dico_body.component");
var highlight_directive_1 = require("./Directive/highlight.directive");
var dico_service_1 = require("./Service/dico.service");
var country_service_1 = require("./Service/country.service");
var keys_pipe_1 = require("./Component/08_KeysPipe/keys.pipe");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [primeng_7.DropdownModule, primeng_6.ChartModule, primeng_5.GrowlModule, primeng_4.ProgressBarModule, primeng_3.TooltipModule, primeng_2.MultiSelectModule, primeng_1.AutoCompleteModule, ng2_auto_complete_1.Ng2AutoCompleteModule, ng2_completer_1.Ng2CompleterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, http_2.JsonpModule, router_1.RouterModule.forRoot([
                { path: 'dico', component: dico_nav_component_1.DicoNavComp },
                { path: '', component: dico_nav_component_1.DicoNavComp },
                { path: '**', component: dico_nav_component_1.DicoNavComp }
            ])],
        declarations: [app_component_1.AppComponent,
            dico_component_1.DicoComp,
            dico_nav_component_1.DicoNavComp,
            dico_alert_component_1.DicoAlertComp,
            dico_body_component_1.DicoBodyComp,
            highlight_directive_1.HighlightDirective,
            keys_pipe_1.KeysPipe
        ],
        providers: [dico_service_1.DicoService, country_service_1.CountryService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map