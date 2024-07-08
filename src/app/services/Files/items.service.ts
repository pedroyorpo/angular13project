import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private _refreshrequired=new Subject<void>();

  constructor(
      private http: HttpClient,
    ) { 
    
    }
  
   get RequiredRefresh(){
      return this._refreshrequired;
    }

    GetItems() : Observable<any>{
      return this.http.get<any>(_url+'GetItems');
    }
    GetItemsToSale() : Observable<any>{
      return this.http.get<any>(_url+'GetItemsToSale');
    }
    
    GetCBOItems() : Observable<any>{
      return this.http.get<any>(_url+'GetCBOItems');
    }
  
    SaveEditItems(data: any) : Observable<any>{
      return this.http.post<any>(_url+'SaveEditItems',data).pipe(
        tap(()=>{
          this.RequiredRefresh.next();
        })
      );
    }
    GetItemsByItemId(id) : Observable<any>{
      return this.http.get<any>(_url+'GetItemsByItemId/'+id);
    }
   
    
    DeleteItem(ItemId:string) : Observable<any>{
      return this.http.get<any>(_url+'DeleteItem/'+ItemId).pipe(
        tap(()=>{
          this.RequiredRefresh.next();
        })
      );
    }


}
