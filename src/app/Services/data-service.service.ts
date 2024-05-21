import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IData } from './dashboard';
import { IPRJName } from './dashboard';
import { ISubPRJName } from './dashboard';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private _url = './../../../assets/projectData.json';
  private _prjURL = './../../../assets/asvJSON.json';
  private _subPRJURL = './../../../assets/asvProjectQuaterJSON.json';

  // private _url = './../../../assets/dummy.json';

  exclusive = new Subject<any>();


  constructor(private http: HttpClient) {}

  getProjectData(): Observable<IData[]> {
    return this.http.get<IData[]>(this._url);
  }

  getProjectName(): Observable<IPRJName[]> {
    return this.http.get<IPRJName[]>(this._prjURL);
  }

  getSubProjectName(): Observable<ISubPRJName[]> {
    return this.http.get<ISubPRJName[]>(this._subPRJURL);
  }

  getValue(e: any){
    console.log(e);
  }
}
