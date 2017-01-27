import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Directive, ElementRef, Renderer } from '@angular/core';
import './rxjs-operators';
import {HTTP_PROVIDERS, Http, Response} from '@angular/http';
import {DicoComp} from './Component/Dico/dico.component';
import {DicoNavComp} from './Component/Dico/dico_nav.component';
import {DicoAlertComp} from './Component/Dico/dico_alert.component';
import {DicoBodyComp} from './Component/Dico/dico_body.component';
import {DicoService} from './Service/dico.service';
import {HighlightDirective} from './Directive/highlight.directive';
import { CountryService } from "./Service/country.service";

@Component({
  //moduleId: module.id is Solution for templateUrl issue
  moduleId: module.id,
    selector: 'my-app',
    templateUrl : 'app.component.html'
,
directives : [DicoComp , DicoNavComp ,DicoAlertComp, DicoBodyComp, Directive, ElementRef, Renderer , HighlightDirective] ,
providers :[DicoService , CountryService]
})
export class AppComponent { }
