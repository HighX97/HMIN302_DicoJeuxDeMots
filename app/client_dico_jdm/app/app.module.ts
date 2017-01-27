import { NgModule }      from '@angular/core';
//Modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { JsonpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {AutoCompleteModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';

import {DropdownModule} from 'primeng/primeng';



//import {Ng2PageScrollModule} from 'ng2-page-scroll';

//Directives


//Components
import { AppComponent }  from './app.component';
import {DicoComp} from './Component/Dico/dico.component';
import {DicoNavComp} from './Component/Dico/dico_nav.component';
import { DicoAlertComp} from './Component/Dico/dico_alert.component';
import { DicoBodyComp} from './Component/Dico/dico_body.component';
import {HighlightDirective} from './Directive/highlight.directive';

import {DicoService} from './Service/dico.service';
import { CountryService } from "./Service/country.service";





//Pipe
import {Pipe, PipeTransforme} from '@angular/core';

import { KeysPipe} from './Component/08_KeysPipe/keys.pipe';



@NgModule({
  imports: [ DropdownModule , ChartModule , GrowlModule , ProgressBarModule ,TooltipModule , MultiSelectModule ,AutoCompleteModule ,Ng2AutoCompleteModule , Ng2CompleterModule ,BrowserModule , FormsModule , HttpModule , JsonpModule , RouterModule.forRoot([
      { path: 'dico', component: DicoNavComp },
      { path: '', component: DicoNavComp },
{ path: '**', component: DicoNavComp }
    ])],
  declarations: [ AppComponent ,
  DicoComp,
  DicoNavComp,
  DicoAlertComp,
  DicoBodyComp,
  HighlightDirective,
    KeysPipe
],
    providers: [ DicoService  , CountryService],
    bootstrap: [ AppComponent ]
  })
  export class AppModule { }
