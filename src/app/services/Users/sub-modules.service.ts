import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class SubModulesService {
  private _refreshrequired=new Subject<void>();
  constructor(
    private http: HttpClient,
  ) { 
  
  }

 get RequiredRefresh(){
    return this._refreshrequired;
  }

  GetSubModules() : Observable<any>{
    return this.http.get<any>(_url+'GetSubModules');
  }


}
