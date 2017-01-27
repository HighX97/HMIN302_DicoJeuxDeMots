import { Component} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { DicoService } from '../../Service/dico.service';
import { Mot } from '../../../classes/Mot';
import { NotifMot } from '../../../classes/NotifMot';
import { AreteType } from '../../../classes/AreteType';
import { KeysPipe} from '../08_KeysPipe/keys.pipe';
import { HighlightDirective} from '../../Directive/highlight.directive';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CountryService } from "../../Service/country.service";
import {SelectItem} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';


@Component({
  //moduleId: module.id is Solution for templateUrl issue
  moduleId: module.id,
  selector: 'dico_nav',
  templateUrl:'dico_nav.component.html',
  styleUrls:['dico_nav.component.css']
})
export class DicoNavComp {

  mots :  Mot[];
  aretesTypes :  AreteType[];
  mots_relation :  Mot[];
  mots_find_by_relation :  any[];
  mots_recherches_def :  NotifMot[];
  mots_recherches_relation :  NotifMot[];
  mots_relation_orderby :  Mot[][];
  switch_btn : number;
  cmpt_mot_recherches : number;
  mot_api: string = "http://ouwasav.com:3000/api/mot?mot=:keyword";

  value: number = 0;
  msgsProgress: Message[];
  data_mots_recherches_relation : any;

  /*
   0 = Recherche entrée exacte et approvimative
   1 = Recherche entrée via relations
   2 = Recherche entrée via forme de chaine
  */
  searchMode : number = 0;


    searchedWord : string;
    searchedRelation : string;




  constructor(private dicoService  : DicoService ,
    private completerService: CompleterService ,
    private _sanitizer: DomSanitizer,
    private countryService: CountryService)
    {
      this.switch_btn = 0;
      this.mots_recherches_def = [];
      this.mots_recherches_relation = [];
      this.cmpt_mot_recherches=0;


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


    razbtn()
    {
      this.switch_btn = 0;
      this.dicoService.search_word_default()
      .subscribe(mots => {
        this.mots = mots;
        //console.log(this.mots);
      });
    }

    order_mot_by_arete(mots_relation :  Mot[]) : Mot[][]
    {
      //console.log("order_mot_by_arete : " + mots_relation);
      var mots_relation_orderby = [];
      for (var mot in mots_relation)
      {
        //console.log("order_mot_by_arete : " + mots_relation[mot].name);
        var stop = true ;
        var i = 0;
        while (stop)
        {
          //console.log("i : " + i);
          //Si le tableau est vide
          if (mots_relation_orderby[i] == null)
          {
            mots_relation_orderby[i] = [];
            mots_relation_orderby[i].push(mots_relation[mot]);
            //Condition d'aret
            stop = false ;
            mots_relation_orderby[i].push(mots_relation[mot]);
            //Condition d'aret
            stop = false ;
          }
          else
          {
            if(mots_relation_orderby[i][0].rt_name == mots_relation[mot].rt_name)
            {
              mots_relation_orderby[i].push(mots_relation[mot]);
              //Condition d'aret
              stop = false ;
            }
            else
            {
              i++;
            }
          }
        }
      }
      //console.log("order_mot_by_arete");
      return mots_relation_orderby;
    }

    search_word(name: any)
    {
      console.log(name.name);

      console.log("search_word : "+name.name);
      console.log(name.name.substring(name.name.length-1,name.name.length));
      console.log(name.name.substring(0,name.name.length-1));
      if (name.name.substring(name.name.length-1,name.name.length) == " ")
      {
        this.search_word_def(name.name.substring(0,name.name.length-1));
        this.search_word_relation(name.name.substring(0,name.name.length-1));
        this.search_word_areteType(name.name.substring(0,name.name.length-1));
      }
      else
      {
        this.search_word_def(name.name);
        this.search_word_relation(name.name);
        this.search_word_areteType(name.name);
      }
    }

    search_word2(name: string)
    {
      console.log(name);

      console.log("search_word : "+name);
      console.log(name.substring(name.length-1,name.length));
      console.log(name.substring(0,name.length-1));
      if (name.substring(name.length-1,name.length) == " ")
      {
        this.search_word_def(name.substring(0,name.length-1));
        this.search_word_relation(name.substring(0,name.length-1));
        this.search_word_areteType(name.substring(0,name.length-1));
      }
      else
      {
        this.search_word_def(name);
        this.search_word_relation(name);
        this.search_word_areteType(name);
      }
    }

    search_word_by_relation()
    {
      this.value = 0 ;


      this.switch_btn =1;
      this.value = this.value + Math.floor(Math.random() * 10) + 1 ;

      this.dicoService.search_word_by_relation(this.searchedWord.name,this.searchedRelation.name).then(mots => {
        this.value = 75;
        this.mots_find_by_relation = mots;
        var i=0;
        //this.mots_par_assoc();
        if (mots.length > 0)
        {
          this.switch_btn = 2 ;
        }
        else
        {
          this.switch_btn = 3 ;
        }
        this.value += 50;
        if (this.value > 100)
        {
          this.value = 100;
        }
      });
    }

    extractGraphData()
    {
        var labels = [];
        var data = [];
        for (var m in this.mots_relation_orderby)
        {
          console.log("extractGraphData : this.mots_relation_orderby[m].length"+this.mots_relation_orderby[m].length);
          data.push(this.mots_relation_orderby[m].length);
          var i = 0 ;
          for (var n in this.mots_relation_orderby[m])
          {
            if (i++ > 0) { break; }
            labels.push(this.mots_relation_orderby[m][n].rt_name);
            console.log("extractGraphData this.mots_relation_orderby[m][n] : "+this.mots_relation_orderby[m][n].rt_name);
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
    }


    search_word_def(name: string)
    {
      this.value = 0 ;


      this.switch_btn =1;
      this.value = this.value + Math.floor(Math.random() * 10) + 1 ;
      this.searchedWord = name;


      this.dicoService.search_word_get_def(name)
      .subscribe(mots => {
        this.value = 75;
        this.mots = mots;
        var i=0;
        //this.mots_par_assoc();
        if (mots.length > 0)
        {
          this.switch_btn = 2 ;
          var notifMot = {
            id: this.cmpt_mot_recherches++ ,
            mot: name ,
            state: 2 ,
            dateSearch: new Date()
          };
          console.log(this.mots_recherches);
          this.mots_recherches_def.push(notifMot);
        }
        else
        {
          this.switch_btn = 3 ;
          var notifMot = {
            id: this.cmpt_mot_recherches++ ,
            mot: name ,
            state: 3 ,
            dateSearch: new Date()
          };
          console.log(this.mots_recherches);
          this.mots_recherches_def.push(notifMot);
        }
        this.value += 50;
        if (this.value > 100)
        {
          this.value = 100;
        }

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
      });
    }

    search_word_relation(name: string)
    {
      this.value = this.value + Math.floor(Math.random() * 10) + 1 ;
      this.switch_btn =1;
      this.searchedWord = name;
      this.dicoService.search_word_get_relation(name)
      .subscribe(mots => {
        this.mots_relation = mots;

        this.mots_relation_orderby = this.order_mot_by_arete(mots);
        this.extractGraphData();
        var i=0;
        //this.mots_par_assoc();
        if (mots.length > 0)
        {
          this.switch_btn = 2 ;
          var notifMot = {
            id: this.cmpt_mot_recherches++ ,
            mot: name ,
            state: 2 ,
            dateSearch: new Date()
          };
          //console.log(notifMot);
          this.mots_recherches_relation.push(notifMot);
        }
        else
        {
          this.switch_btn = 3 ;
          var notifMot = {
            id: this.cmpt_mot_recherches++ ,
            mot: name ,
            state: 3 ,
            dateSearch: new Date()
          };
          //console.log(notifMot);
          this.mots_recherches_relation.push(notifMot);
        }
        //console.log(notifMot);
        this.value += 50;
        if (this.value > 100)
        {
          this.value = 100;
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

    }






    search_word_areteType(name: string)
    {
      this.switch_btn =1;
      this.searchedWord = name;
      this.dicoService.search_word_get_areteType(name)
      .subscribe(aretesTypes => {
        this.aretesTypes = aretesTypes;
      });
    }

    country: any;

    countries: any[];

    filteredCountriesSingle: any[];
    mots_auto_complete: any[];
    relations_auto_complete :  any[];

    filteredCountriesMultiple: any[];

    brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];

    filteredBrands: any[];

    brand: string;



    toogle_arete(event , id) {
      console.log(event.target.checked);
      let checked = event.target.checked;
      /*
      if checked
      {

    }
    else
    {

  }
  */
}

filterMot(name: string) {
  let query = name;
  this.dicoService.searchWord(name).then(mots => {
    this.mots_auto_complete = mots;
    //this.mots_auto_complete = this.filterCountry(query, countries);
  });
}

filterRelation(name: string) {
  let query = name;
  this.dicoService.searchRelation(name).then(relations => {
    this.relations_auto_complete = relations;
    //this.mots_auto_complete = this.filterCountry(query, countries);
  });
}

}
