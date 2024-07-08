import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class ReceiveHeadersService {

  private _refreshrequired=new Subject<void>();
  constructor(
    private http: HttpClient,
  ) { 
  }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  GetReceiveHeaderByTransNo(TransactionNo: string) : Observable<any>{
    return this.http.get<any>(_url+'GetReceiveHeaderByTransNo/'+TransactionNo);
  }
  GetReceiveHeaderByReceiptNo(ReceiptNo: string) : Observable<any>{
    return this.http.get<any>(_url+'GetReceiveHeaderByReceiptNo/'+ReceiptNo);
  }
  GetReceiveHeadersByTransDateFromByTransDateTo(TransDateFrom, TransDateTo) : Observable<any>{
    return this.http.get<any>(_url+'GetReceiveHeadersByTransDateFromByTransDateTo/'+TransDateFrom+'/'+TransDateTo);
  }
}
