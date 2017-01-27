"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
require("./rxjs-operators");
var dico_component_1 = require("./Component/Dico/dico.component");
var dico_nav_component_1 = require("./Component/Dico/dico_nav.component");
var dico_alert_component_1 = require("./Component/Dico/dico_alert.component");
var dico_body_component_1 = require("./Component/Dico/dico_body.component");
var dico_service_1 = require("./Service/dico.service");
var highlight_directive_1 = require("./Directive/highlight.directive");
var country_service_1 = require("./Service/country.service");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        //moduleId: module.id is Solution for templateUrl issue
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: 'app.component.html',
        directives: [dico_component_1.DicoComp, dico_nav_component_1.DicoNavComp, dico_alert_component_1.DicoAlertComp, dico_body_component_1.DicoBodyComp, core_2.Directive, core_2.ElementRef, core_2.Renderer, highlight_directive_1.HighlightDirective],
        providers: [dico_service_1.DicoService, country_service_1.CountryService]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map