import { Component ,  EventEmitter, Input, Output } from '@angular/core';
import { DicoService } from '../../Service/dico.service';
import { Mot } from '../../../classes/Mot';
import { NotifMot } from '../../../classes/NotifMot';
import { KeysPipe} from '../08_KeysPipe/keys.pipe';
import { HighlightDirective} from '../../Directive/highlight.directive';
import { Directive, ElementRef, Renderer } from '@angular/core';
import {Message} from 'primeng/primeng';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/Rx';

@Component({
  //moduleId: module.id is Solution for templateUrl issue
  moduleId: module.id,
    selector: 'dico_body',
    templateUrl:'dico_body.component.html',
    directives : [Directive, ElementRef, Renderer , HighlightDirective]
})
export class DicoBodyComp {

  @Input() mots_def :  Mot[];
  @Input() mots_relation :  Mot[];
  @Input() mots_relation_orderby :  Mot[][];
  @Input() mots_by_assoc: Dictionnary;
  @Input() value : number;
  @Input() data_mots_recherches_relation : any;
  @Input() mots_find_by_relation : any ;
  @Output() motClick = new EventEmitter<string>();
  cmpt_mot_recherches : number ;

    msgsProgress: Message[];



    ngOnInit() {
        let interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 30) + 1;
            if(this.value >= 100) {
                this.value = 100;
                clearInterval(interval);
                this.msgsProgress = [{severity: 'info', summary: 'Success', detail: 'Process Completed'}];
              clearInterval(interval);
            }
        }, 2000);
    }



    msgs: Message[] = [];

    showInfo() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
    }

    showWarn() {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Warn Message', detail:'There are unsaved changes'});
    }

    showError() {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error Message', detail:'Validation failed'});
    }

    showMultiple() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Message 1', detail:'PrimeNG rocks'});
        this.msgs.push({severity:'info', summary:'Message 2', detail:'PrimeUI rocks'});
        this.msgs.push({severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'});
        this.value = 0;
    }

    clear() {
        this.msgs = [];
    }


    data: any;

    dataLineChart: any;

    msgsLineChart: Message[];

    selectData(event) {
        this.msgsLineChart = [];
        this.msgsLineChart.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    }

  constructor(private dicoService  : DicoService)
  {
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

  cliked_word(name: string)
  {

    this.motClick.emit(name.trim());
    console.log("motClick "+name.trim());
  }
}

interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
    item(key: string): any;
}


class Dictionnary implements IDictionary{
  _keys: string[];
  _values: any[];

/*
  constructor(init: { key: string; value: any; }[]) {

    for (var x = 0; x < init.length; x++) {
      this[init[x].key] = init[x].value;
      this._keys.push(init[x].key);
      this._values.push(init[x].value);
    }
  }
  */

  constructor() {
      this._keys = [];
      this._values = [];
  }

  add(key: string, value: any) {
    this[key] = value;
    this._keys.push(key);
    this._values.push(value);
  }

  remove(key: string) {
    var index = this._keys.indexOf(key, 0);
    this._keys.splice(index, 1);
    this._values.splice(index, 1);

    delete this[key];
  }

  item(key: string): any {
        return this._values[key];
    }

  keys(): string[] {
    return this._keys;
  }

  values(): any[] {
    return this._values;
  }

  containsKey(key: string) {
    if (typeof this[key] === "undefined") {
      return false;
    }

    return true;
  }

  toLookup(): IDictionary {
    return this;
  }
}
