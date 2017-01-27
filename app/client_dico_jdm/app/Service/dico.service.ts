import {Injectable} from '@angular/core';
import {Http, Headers , Response, Request, RequestOptions, RequestMethod, URLSearchParams} from '@angular/http';
import { Subject }    from 'rxjs/Subject';
import { Mot } from '../../classes/Mot';
import 'rxjs/add/operator/map';
@Injectable()
export class DicoService
{
  private dicoSource = new Subject<Mot[]>();

  // Observable string streams
  dico$ = this.dicoSource.asObservable();

  constructor(private http:Http)
  {
    console.info('Service Dico initialisé');
  }

  private extractData(res: Response)
  {
    let body = res.json();
    console.log("body.data"+(body.data || { }))
    return body.data || { };
  }


  public search_word_default()
  {
    console.log("Service search_word : "+'viande');
    var search_mot = {
      mot : 'viande'
    };
    var headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://ouwasav.com:3000/api/mot/",
    search_mot ,{ headers : headers} )
    .map(this.extractData);
  }

  public search_word(name: string)
  {
    console.log("Service search_word : "+'name');
    var search_mot = {
      mot : name
    };
    var headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://ouwasav.com:3000/api/mot/",
    search_mot ,{ headers : headers} )
    .map(this.extractData);
  }

  public search_word_get_relation (name: string)
  {
    console.log("Service search_word GET : "+name);

    var params = new URLSearchParams();
    params.set('mot',name);

    return this.http.get("http://ouwasav.com:3000/api/mot/relation?", {
   search: params}).map(this.extractData);
  }

  public search_word_get_areteType (name: string)
  {
    console.log("Service search_word GET : "+name);

    var params = new URLSearchParams();
    params.set('mot',name);

    return this.http.get("http://ouwasav.com:3000/api/mot/areteType?", {
   search: params}).map(this.extractData);
  }

  public search_word_get_def (name: string)
  {
    console.log("Service search_word GET : "+name);

    var params = new URLSearchParams();
    params.set('mot',name);

    return this.http.get("http://ouwasav.com:3000/api/mot/def?", {
   search: params}).map(this.extractData);
  }

  public get_aretesTypes ()
  {
    console.log("Service aretesTypes GET");

    var headers = new Headers();
    headers.append('access-control-allow-origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.append('access-control-allow-headers', 'Origin, X-Requested-With, content-type, Accept');

    headers.append('content-type', 'application/json; charset=utf-8');
    //headers.append('Parameter',"mot="+name);

    var options = new RequestOptions({
      method: RequestMethod.Get,
      url: "http://ouwasav.com:3000/api/aretesTypes",
      headers: headers
    });
    console.log("http://ouwasav.com:3000/api/aretesTypes");
    return this.http.request(new Request(options))
    .map(this.extractData);
  }

  public searchWord(name: string) {
      return this.http.get('http://ouwasav.com:3000/api/mot?mot='+name)
                  .toPromise()
                  .then(res => <any[]> res.json().data)
                  .then(data => { return data; });
  }

  public searchRelation(name: string) {
      return this.http.get('http://ouwasav.com:3000/api/areteType?relation='+name)
                  .toPromise()
                  .then(res => <any[]> res.json().data)
                  .then(data => { return data; });
  }

  public search_word_by_relation (mot: string  , relation : string)
  {
    console.log("mot : " + mot);
    console.log("relation  : " +relation);
    console.log('http://ouwasav.com:3000/api/mot/byRelation?mot='+mot+'&relation='+relation);
    return this.http.get('http://ouwasav.com:3000/api/mot/byRelation?mot='+mot.substring(0,mot.length-1)+'&relation='+relation)
                .toPromise()
                .then(res => <any[]> res.json().data)
                .then(data => { return data; });
  }

  /*
  http://ouwasav.com:3000/api/mot/areteType?&mot=chien
  */

  public search_Relation(name: string)
  {
    console.log("Service aretesTypes GET");

    var headers = new Headers();
    headers.append('access-control-allow-origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.append('access-control-allow-headers', 'Origin, X-Requested-With, content-type, Accept');

    headers.append('content-type', 'application/json; charset=utf-8');
    //headers.append('Parameter',"mot="+name);

    var options = new RequestOptions({
      method: RequestMethod.Get,
      url: "http://ouwasav.com:3000/api/aretesTypes",
      headers: headers
    });
    console.log("http://ouwasav.com:3000/api/aretesTypes");
    return this.http.request(new Request(options))
    .map(this.extractData);
  }

  public search_word_def (name: string)
  {
    console.log("Service search_word POST : "+name);
    var search_mot = {
      mot : name
    };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post("http://ouwasav.com:3000/api/mot/def_assoc/",
    search_mot ,{ headers : headers} )
    .map(this.extractData);
  }

}
