import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private _refreshrequired=new Subject<void>();

  constructor(
      private http: HttpClient,
    ) { 
    
    }
  
   get RequiredRefresh(){
      return this._refreshrequired;
    }

    GetSuppliers() : Observable<any>{
      return this.http.get<any>(_url+'GetSuppliers');
    }
  
   
  
    SaveEditSuppliers(data: any) : Observable<any>{
      return this.http.post<any>(_url+'SaveEditSuppliers',data).pipe(
        tap(()=>{
          this.RequiredRefresh.next();
        })
      );
    }

    DeleteSupplier(SupplierId:string) : Observable<any>{
      return this.http.delete<any>(_url+'DeleteSupplier/'+SupplierId).pipe(
        tap(()=>{
          this.RequiredRefresh.next();
        })
      );
    }


}
