import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  private _refreshrequired=new Subject<void>();

  constructor(
      private http: HttpClient,
    ) { 
    
    }
  
   get RequiredRefresh(){
      return this._refreshrequired;
    }

    GetModules() : Observable<any>{
      return this.http.get<any>(_url+'GetModules');
    }
  


}
