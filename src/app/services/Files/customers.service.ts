import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private _refreshrequired=new Subject<void>();

  constructor(
      private http: HttpClient,
    ) { 
    
    }
  
   get RequiredRefresh(){
      return this._refreshrequired;
    }

    GetItems() : Observable<any>{
      return this.http.get<any>(_url+'GetCustomers');
    }
    
   
    GetCustomerByCustomerId(id) : Observable<any>{
      return this.http.get<any>(_url+'GetCustomerByCustomerId/'+id);
    }
  
    SaveEditCustomers(data: any) : Observable<any>{
      return this.http.post<any>(_url+'SaveEditCustomers',data).pipe(
        tap(()=>{
          this.RequiredRefresh.next();
        })
      );
    }

    DeleteCustomer(CustomerId:string) : Observable<any>{
      return this.http.delete<any>(_url+'DeleteCustomer/'+CustomerId).pipe(
        tap(()=>{
          this.RequiredRefresh.next();
        })
      );
    }
    GetCBOCustomers() : Observable<any>{
      return this.http.get<any>(_url+'GetCBOCustomers');
    }
  

}
