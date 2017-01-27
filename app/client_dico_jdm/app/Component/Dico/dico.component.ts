import { Component } from '@angular/core';
import { DicoService } from '../../Service/dico.service';
import { Mot } from '../../../classes/Mot';
import { NotifMot } from '../../../classes/NotifMot';
import { KeysPipe} from '../08_KeysPipe/keys.pipe';
import { HighlightDirective} from '../../Directive/highlight.directive';
import { DicoNavComp} from './dico_nav.component';
import { DicoAlertComp} from './dico_alert.component';
import { DicoBodyComp} from './dico_body.component';
import { Directive, ElementRef, Renderer } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/Rx';

@Component({
  //moduleId: module.id is Solution for templateUrl issue
  moduleId: module.id,
    selector: 'dico',
    templateUrl:'dico.component.html',
    directives : [DicoNavComp , DicoAlertComp , DicoBodyComp , Directive, ElementRef, Renderer , HighlightDirective]
})
export class DicoComp
{
}
