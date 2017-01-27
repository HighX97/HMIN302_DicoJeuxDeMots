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
var core_1 = require('@angular/core');
var hero_1 = require('./hero');
var HeroParentComponent = (function () {
    function HeroParentComponent() {
        this.heroes = hero_1.HEROES;
        this.master = 'Master';
        this.args = ['ARGS', 'ARGS2', 'ARGS3'];
    }
    HeroParentComponent = __decorate([
        core_1.Component({
            selector: 'hero-parent',
            template: "\n    <h2>{{master}} controls {{heroes.length}} heroes</h2>\n    <hero-child *ngFor=\"let hero of heroes\"\n      [hero]=\"hero\"\n      [master]=\"master\"\n      [args]=\"args\">\n    </hero-child>\n    <div class=\"alert alert-success\">\n  <strong>Success!</strong> Indicates a successful or positive action.\n</div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HeroParentComponent);
    return HeroParentComponent;
}());
exports.HeroParentComponent = HeroParentComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=hero-parent.component.js.map