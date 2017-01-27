import { Component , Input} from '@angular/core';
import { DicoService } from '../../Service/dico.service';
import { Mot } from '../../../classes/Mot';
import { NotifMot } from '../../../classes/NotifMot';
import { AreteType } from '../../../classes/AreteType';
import { KeysPipe} from '../08_KeysPipe/keys.pipe';
import { HighlightDirective} from '../../Directive/highlight.directive';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/Rx';

@Component({
  //moduleId: module.id is Solution for templateUrl issue
  moduleId: module.id,
    selector: 'dico_alert',
    templateUrl:'dico_alert.component.html'
})
export class DicoAlertComp
{

  @Input()  mot: string;
  @Input()  switch_btn: number;
  @Input() aretesTypes :  AreteType[];
  @Input() mots_recherches_def :  NotifMot[];
  @Input() mots_recherches_relation :  NotifMot[];

  constructor(private dicoService  : DicoService)
  {
  }

}
