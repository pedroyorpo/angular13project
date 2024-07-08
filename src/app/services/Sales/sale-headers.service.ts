import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class SaleHeadersService {

  private _refreshrequired=new Subject<void>();
  constructor(
    private http: HttpClient,
  ) { 
  }

  get RequiredRefresh(){
    return this._refreshrequired;
  }


  GetSaleHeaderByTransDateFromByTransDateTo(TransDateFrom: string, TransDateTo: string) : Observable<any>{
    return this.http.get<any>(_url+'GetSaleHeaderByTransDateFromByTransDateTo/'+TransDateFrom+'/'+TransDateTo);
  }
  GetSaleHeaderByTransNo(TransactionNo: string) : Observable<any>{
    return this.http.get<any>(_url+'GetSaleHeaderByTransNo/'+TransactionNo);
  }
  GetSaleHeaderByReceiptNo(ReceiptNo: string) : Observable<any>{
    return this.http.get<any>(_url+'GetSaleHeaderByReceiptNo/'+ReceiptNo);
  }

}
