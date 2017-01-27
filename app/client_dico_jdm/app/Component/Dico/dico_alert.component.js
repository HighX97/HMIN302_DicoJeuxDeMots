"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var dico_service_1 = require("../../Service/dico.service");
require("rxjs/add/operator/map");
require("rxjs/operator/delay");
require("rxjs/operator/mergeMap");
require("rxjs/operator/switchMap");
require("rxjs/Rx");
var DicoAlertComp = (function () {
    function DicoAlertComp(dicoService) {
        this.dicoService = dicoService;
    }
    return DicoAlertComp;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DicoAlertComp.prototype, "mot", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DicoAlertComp.prototype, "switch_btn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DicoAlertComp.prototype, "aretesTypes", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DicoAlertComp.prototype, "mots_recherches_def", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DicoAlertComp.prototype, "mots_recherches_relation", void 0);
DicoAlertComp = __decorate([
    core_1.Component({
        //moduleId: module.id is Solution for templateUrl issue
        moduleId: module.id,
        selector: 'dico_alert',
        templateUrl: 'dico_alert.component.html'
    }),
    __metadata("design:paramtypes", [dico_service_1.DicoService])
], DicoAlertComp);
exports.DicoAlertComp = DicoAlertComp;
//# sourceMappingURL=dico_alert.component.js.map