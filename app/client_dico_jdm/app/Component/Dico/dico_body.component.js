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
var highlight_directive_1 = require("../../Directive/highlight.directive");
var core_2 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/operator/delay");
require("rxjs/operator/mergeMap");
require("rxjs/operator/switchMap");
require("rxjs/Rx");
var DicoBodyComp = (function () {
    function DicoBodyComp(dicoService) {
        this.dicoService = dicoService;
        this.motClick = new core_1.EventEmitter();
        this.msgs = [];
        this.cmpt_mot_recherches = 0;
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        this.dataLineChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        };
    }
    DicoBodyComp.prototype.ngOnInit = function () {
        var _this = this;
        var interval = setInterval(function () {
            _this.value = _this.value + Math.floor(Math.random() * 30) + 1;
            if (_this.value >= 100) {
                _this.value = 100;
                clearInterval(interval);
                _this.msgsProgress = [{ severity: 'info', summary: 'Success', detail: 'Process Completed' }];
                clearInterval(interval);
            }
        }, 2000);
    };
    DicoBodyComp.prototype.showInfo = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    };
    DicoBodyComp.prototype.showWarn = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    };
    DicoBodyComp.prototype.showError = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    };
    DicoBodyComp.prototype.showMultiple = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks' });
        this.value = 0;
    };
    DicoBodyComp.prototype.clear = function () {
        this.msgs = [];
    };
    DicoBodyComp.prototype.selectData = function (event) {
        this.msgsLineChart = [];
        this.msgsLineChart.push({ severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index] });
    };
    DicoBodyComp.prototype.cliked_word = function (name) {
        this.motClick.emit(name.trim());
        console.log("motClick " + name.trim());
    };
    return DicoBodyComp;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DicoBodyComp.prototype, "mots_def", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DicoBodyComp.prototype, "mots_relation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DicoBodyComp.prototype, "mots_relation_orderby", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Dictionnary)
], DicoBodyComp.prototype, "mots_by_assoc", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DicoBodyComp.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DicoBodyComp.prototype, "data_mots_recherches_relation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DicoBodyComp.prototype, "mots_find_by_relation", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DicoBodyComp.prototype, "motClick", void 0);
DicoBodyComp = __decorate([
    core_1.Component({
        //moduleId: module.id is Solution for templateUrl issue
        moduleId: module.id,
        selector: 'dico_body',
        templateUrl: 'dico_body.component.html',
        directives: [core_2.Directive, core_2.ElementRef, core_2.Renderer, highlight_directive_1.HighlightDirective]
    }),
    __metadata("design:paramtypes", [dico_service_1.DicoService])
], DicoBodyComp);
exports.DicoBodyComp = DicoBodyComp;
var Dictionnary = (function () {
    /*
      constructor(init: { key: string; value: any; }[]) {
    
        for (var x = 0; x < init.length; x++) {
          this[init[x].key] = init[x].value;
          this._keys.push(init[x].key);
          this._values.push(init[x].value);
        }
      }
      */
    function Dictionnary() {
        this._keys = [];
        this._values = [];
    }
    Dictionnary.prototype.add = function (key, value) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    };
    Dictionnary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    };
    Dictionnary.prototype.item = function (key) {
        return this._values[key];
    };
    Dictionnary.prototype.keys = function () {
        return this._keys;
    };
    Dictionnary.prototype.values = function () {
        return this._values;
    };
    Dictionnary.prototype.containsKey = function (key) {
        if (typeof this[key] === "undefined") {
            return false;
        }
        return true;
    };
    Dictionnary.prototype.toLookup = function () {
        return this;
    };
    return Dictionnary;
}());
//# sourceMappingURL=dico_body.component.js.map