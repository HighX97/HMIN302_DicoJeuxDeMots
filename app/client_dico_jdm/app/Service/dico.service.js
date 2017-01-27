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
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
var DicoService = (function () {
    function DicoService(http) {
        this.http = http;
        this.dicoSource = new Subject_1.Subject();
        // Observable string streams
        this.dico$ = this.dicoSource.asObservable();
        console.info('Service Dico initialisé');
    }
    DicoService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("body.data" + (body.data || {}));
        return body.data || {};
    };
    DicoService.prototype.search_word_default = function () {
        console.log("Service search_word : " + 'viande');
        var search_mot = {
            mot: 'viande'
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post("http://ouwasav.com:3000/api/mot/", search_mot, { headers: headers })
            .map(this.extractData);
    };
    DicoService.prototype.search_word = function (name) {
        console.log("Service search_word : " + 'name');
        var search_mot = {
            mot: name
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post("http://ouwasav.com:3000/api/mot/", search_mot, { headers: headers })
            .map(this.extractData);
    };
    DicoService.prototype.search_word_get_relation = function (name) {
        console.log("Service search_word GET : " + name);
        var params = new http_1.URLSearchParams();
        params.set('mot', name);
        return this.http.get("http://ouwasav.com:3000/api/mot/relation?", {
            search: params
        }).map(this.extractData);
    };
    DicoService.prototype.search_word_get_areteType = function (name) {
        console.log("Service search_word GET : " + name);
        var params = new http_1.URLSearchParams();
        params.set('mot', name);
        return this.http.get("http://ouwasav.com:3000/api/mot/areteType?", {
            search: params
        }).map(this.extractData);
    };
    DicoService.prototype.search_word_get_def = function (name) {
        console.log("Service search_word GET : " + name);
        var params = new http_1.URLSearchParams();
        params.set('mot', name);
        return this.http.get("http://ouwasav.com:3000/api/mot/def?", {
            search: params
        }).map(this.extractData);
    };
    DicoService.prototype.get_aretesTypes = function () {
        console.log("Service aretesTypes GET");
        var headers = new http_1.Headers();
        headers.append('access-control-allow-origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
        headers.append('access-control-allow-headers', 'Origin, X-Requested-With, content-type, Accept');
        headers.append('content-type', 'application/json; charset=utf-8');
        //headers.append('Parameter',"mot="+name);
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
            url: "http://ouwasav.com:3000/api/aretesTypes",
            headers: headers
        });
        console.log("http://ouwasav.com:3000/api/aretesTypes");
        return this.http.request(new http_1.Request(options))
            .map(this.extractData);
    };
    DicoService.prototype.searchWord = function (name) {
        return this.http.get('http://ouwasav.com:3000/api/mot?mot=' + name)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    DicoService.prototype.searchRelation = function (name) {
        return this.http.get('http://ouwasav.com:3000/api/areteType?relation=' + name)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    DicoService.prototype.search_word_by_relation = function (mot, relation) {
        console.log("mot : " + mot);
        console.log("relation  : " + relation);
        console.log('http://ouwasav.com:3000/api/mot/byRelation?mot=' + mot + '&relation=' + relation);
        return this.http.get('http://ouwasav.com:3000/api/mot/byRelation?mot=' + mot.substring(0, mot.length - 1) + '&relation=' + relation)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    /*
    http://ouwasav.com:3000/api/mot/areteType?&mot=chien
    */
    DicoService.prototype.search_Relation = function (name) {
        console.log("Service aretesTypes GET");
        var headers = new http_1.Headers();
        headers.append('access-control-allow-origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
        headers.append('access-control-allow-headers', 'Origin, X-Requested-With, content-type, Accept');
        headers.append('content-type', 'application/json; charset=utf-8');
        //headers.append('Parameter',"mot="+name);
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
            url: "http://ouwasav.com:3000/api/aretesTypes",
            headers: headers
        });
        console.log("http://ouwasav.com:3000/api/aretesTypes");
        return this.http.request(new http_1.Request(options))
            .map(this.extractData);
    };
    DicoService.prototype.search_word_def = function (name) {
        console.log("Service search_word POST : " + name);
        var search_mot = {
            mot: name
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.post("http://ouwasav.com:3000/api/mot/def_assoc/", search_mot, { headers: headers })
            .map(this.extractData);
    };
    return DicoService;
}());
DicoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DicoService);
exports.DicoService = DicoService;
//# sourceMappingURL=dico.service.js.map