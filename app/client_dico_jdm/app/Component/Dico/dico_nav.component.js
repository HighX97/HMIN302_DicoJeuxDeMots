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
var platform_browser_1 = require("@angular/platform-browser");
var dico_service_1 = require('../../Service/dico.service');
var ng2_completer_1 = require('ng2-completer');
var country_service_1 = require("../../Service/country.service");
var DicoNavComp = (function () {
    function DicoNavComp(dicoService, completerService, _sanitizer, countryService) {
        this.dicoService = dicoService;
        this.completerService = completerService;
        this._sanitizer = _sanitizer;
        this.countryService = countryService;
        this.mot_api = "http://ouwasav.com:3000/api/mot?mot=:keyword";
        this.value = 0;
        /*
         0 = Recherche entrée exacte et approvimative
         1 = Recherche entrée via relations
         2 = Recherche entrée via forme de chaine
        */
        this.searchMode = 0;
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
        this.switch_btn = 0;
        this.mots_recherches_def = [];
        this.mots_recherches_relation = [];
        this.cmpt_mot_recherches = 0;
        this.data_mots_recherches_relation = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
    }
    DicoNavComp.prototype.razbtn = function () {
        var _this = this;
        this.switch_btn = 0;
        this.dicoService.search_word_default()
            .subscribe(function (mots) {
            _this.mots = mots;
            //console.log(this.mots);
        });
    };
    DicoNavComp.prototype.order_mot_by_arete = function (mots_relation) {
        //console.log("order_mot_by_arete : " + mots_relation);
        var mots_relation_orderby = [];
        for (var mot in mots_relation) {
            //console.log("order_mot_by_arete : " + mots_relation[mot].name);
            var stop = true;
            var i = 0;
            while (stop) {
                //console.log("i : " + i);
                //Si le tableau est vide
                if (mots_relation_orderby[i] == null) {
                    mots_relation_orderby[i] = [];
                    mots_relation_orderby[i].push(mots_relation[mot]);
                    //Condition d'aret
                    stop = false;
                    mots_relation_orderby[i].push(mots_relation[mot]);
                    //Condition d'aret
                    stop = false;
                }
                else {
                    if (mots_relation_orderby[i][0].rt_name == mots_relation[mot].rt_name) {
                        mots_relation_orderby[i].push(mots_relation[mot]);
                        //Condition d'aret
                        stop = false;
                    }
                    else {
                        i++;
                    }
                }
            }
        }
        //console.log("order_mot_by_arete");
        return mots_relation_orderby;
    };
    DicoNavComp.prototype.search_word = function (name) {
        console.log(name.name);
        console.log("search_word : " + name.name);
        console.log(name.name.substring(name.name.length - 1, name.name.length));
        console.log(name.name.substring(0, name.name.length - 1));
        if (name.name.substring(name.name.length - 1, name.name.length) == " ") {
            this.search_word_def(name.name.substring(0, name.name.length - 1));
            this.search_word_relation(name.name.substring(0, name.name.length - 1));
            this.search_word_areteType(name.name.substring(0, name.name.length - 1));
        }
        else {
            this.search_word_def(name.name);
            this.search_word_relation(name.name);
            this.search_word_areteType(name.name);
        }
    };
    DicoNavComp.prototype.search_word2 = function (name) {
        console.log(name);
        console.log("search_word : " + name);
        console.log(name.substring(name.length - 1, name.length));
        console.log(name.substring(0, name.length - 1));
        if (name.substring(name.length - 1, name.length) == " ") {
            this.search_word_def(name.substring(0, name.length - 1));
            this.search_word_relation(name.substring(0, name.length - 1));
            this.search_word_areteType(name.substring(0, name.length - 1));
        }
        else {
            this.search_word_def(name);
            this.search_word_relation(name);
            this.search_word_areteType(name);
        }
    };
    DicoNavComp.prototype.search_word_by_relation = function () {
        var _this = this;
        this.value = 0;
        this.switch_btn = 1;
        this.value = this.value + Math.floor(Math.random() * 10) + 1;
        this.dicoService.search_word_by_relation(this.searchedWord.name, this.searchedRelation.name).then(function (mots) {
            _this.value = 75;
            _this.mots_find_by_relation = mots;
            var i = 0;
            //this.mots_par_assoc();
            if (mots.length > 0) {
                _this.switch_btn = 2;
            }
            else {
                _this.switch_btn = 3;
            }
            _this.value += 50;
            if (_this.value > 100) {
                _this.value = 100;
            }
        });
    };
    DicoNavComp.prototype.extractGraphData = function () {
        var labels = [];
        var data = [];
        for (var m in this.mots_relation_orderby) {
            console.log("extractGraphData : this.mots_relation_orderby[m].length" + this.mots_relation_orderby[m].length);
            data.push(this.mots_relation_orderby[m].length);
            var i = 0;
            for (var n in this.mots_relation_orderby[m]) {
                if (i++ > 0) {
                    break;
                }
                labels.push(this.mots_relation_orderby[m][n].rt_name);
                console.log("extractGraphData this.mots_relation_orderby[m][n] : " + this.mots_relation_orderby[m][n].rt_name);
            }
        }
        this.data_mots_recherches_relation = {
            labels: labels,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: data
                }
            ]
        };
    };
    DicoNavComp.prototype.search_word_def = function (name) {
        var _this = this;
        this.value = 0;
        this.switch_btn = 1;
        this.value = this.value + Math.floor(Math.random() * 10) + 1;
        this.searchedWord = name;
        this.dicoService.search_word_get_def(name)
            .subscribe(function (mots) {
            _this.value = 75;
            _this.mots = mots;
            var i = 0;
            //this.mots_par_assoc();
            if (mots.length > 0) {
                _this.switch_btn = 2;
                var notifMot = {
                    id: _this.cmpt_mot_recherches++,
                    mot: name,
                    state: 2,
                    dateSearch: new Date()
                };
                console.log(_this.mots_recherches);
                _this.mots_recherches_def.push(notifMot);
            }
            else {
                _this.switch_btn = 3;
                var notifMot = {
                    id: _this.cmpt_mot_recherches++,
                    mot: name,
                    state: 3,
                    dateSearch: new Date()
                };
                console.log(_this.mots_recherches);
                _this.mots_recherches_def.push(notifMot);
            }
            _this.value += 50;
            if (_this.value > 100) {
                _this.value = 100;
            }
            _this.data_mots_recherches_relation = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            };
        });
    };
    DicoNavComp.prototype.search_word_relation = function (name) {
        var _this = this;
        this.value = this.value + Math.floor(Math.random() * 10) + 1;
        this.switch_btn = 1;
        this.searchedWord = name;
        this.dicoService.search_word_get_relation(name)
            .subscribe(function (mots) {
            _this.mots_relation = mots;
            _this.mots_relation_orderby = _this.order_mot_by_arete(mots);
            _this.extractGraphData();
            var i = 0;
            //this.mots_par_assoc();
            if (mots.length > 0) {
                _this.switch_btn = 2;
                var notifMot = {
                    id: _this.cmpt_mot_recherches++,
                    mot: name,
                    state: 2,
                    dateSearch: new Date()
                };
                //console.log(notifMot);
                _this.mots_recherches_relation.push(notifMot);
            }
            else {
                _this.switch_btn = 3;
                var notifMot = {
                    id: _this.cmpt_mot_recherches++,
                    mot: name,
                    state: 3,
                    dateSearch: new Date()
                };
                //console.log(notifMot);
                _this.mots_recherches_relation.push(notifMot);
            }
            //console.log(notifMot);
            _this.value += 50;
            if (_this.value > 100) {
                _this.value = 100;
            }
        });
        this.data_mots_recherches_relation = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
    };
    DicoNavComp.prototype.search_word_areteType = function (name) {
        var _this = this;
        this.switch_btn = 1;
        this.searchedWord = name;
        this.dicoService.search_word_get_areteType(name)
            .subscribe(function (aretesTypes) {
            _this.aretesTypes = aretesTypes;
        });
    };
    DicoNavComp.prototype.toogle_arete = function (event, id) {
        console.log(event.target.checked);
        var checked = event.target.checked;
        /*
        if checked
        {
  
      }
      else
      {
  
    }
    */
    };
    DicoNavComp.prototype.filterMot = function (name) {
        var _this = this;
        var query = name;
        this.dicoService.searchWord(name).then(function (mots) {
            _this.mots_auto_complete = mots;
            //this.mots_auto_complete = this.filterCountry(query, countries);
        });
    };
    DicoNavComp.prototype.filterRelation = function (name) {
        var _this = this;
        var query = name;
        this.dicoService.searchRelation(name).then(function (relations) {
            _this.relations_auto_complete = relations;
            //this.mots_auto_complete = this.filterCountry(query, countries);
        });
    };
    DicoNavComp = __decorate([
        core_1.Component({
            //moduleId: module.id is Solution for templateUrl issue
            moduleId: module.id,
            selector: 'dico_nav',
            templateUrl: 'dico_nav.component.html',
            styleUrls: ['dico_nav.component.css']
        }), 
        __metadata('design:paramtypes', [dico_service_1.DicoService, ng2_completer_1.CompleterService, platform_browser_1.DomSanitizer, country_service_1.CountryService])
    ], DicoNavComp);
    return DicoNavComp;
}());
exports.DicoNavComp = DicoNavComp;
//# sourceMappingURL=dico_nav.component.js.map