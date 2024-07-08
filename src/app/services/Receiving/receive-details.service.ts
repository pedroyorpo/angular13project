import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class ReceiveDetailsService {

  private _refreshrequired=new Subject<void>();
  constructor(
    private http: HttpClient,
  ) { 
  }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  GetReceiveDetailsByTransNo(TransactionNo) : Observable<any>{
    return this.http.get<any>(_url+'GetReceiveDetailsByTransNo/'+TransactionNo);
  }

  GetReceiveDetailById(Id) : Observable<any>{
    return this.http.get<any>(_url+'GetReceiveDetailById/'+Id);
  }

  GetReceiveDetailsByTransDateFromByTransDateTo(TransDateFrom, TransDateTo) : Observable<any>{
    return this.http.get<any>(_url+'GetReceiveDetailsByTransDateFromByTransDateTo/'+TransDateFrom+'/'+TransDateTo);
  }

  GetReceiveDetailsByReceiptNoByRecordStatus(ReceiptNo, RecordStatus) : Observable<any>{
    return this.http.get<any>(_url+'GetReceiveDetailsByReceiptNoByRecordStatus/'+ReceiptNo+'/'+RecordStatus);
  }
}
