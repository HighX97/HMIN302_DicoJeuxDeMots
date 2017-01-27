import {Injectable} from '@angular/core';
import {Http, Headers , Response, Request, RequestOptions, RequestMethod, URLSearchParams} from '@angular/http';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class CountryService {

    constructor(private http: Http) {}


    getCountries() {
        return this.http.get('http://ouwasav.com:3000/api/mot?mot=chat')
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }

    getCountriesP(name: string) {
        return this.http.get('http://ouwasav.com:3000/api/mot?mot='+name)
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }
}
