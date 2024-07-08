import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class SaleDetailsService {
 

  private _refreshrequired=new Subject<void>();
  constructor(
    private http: HttpClient,
  ) { 
  }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  GetSaleDetailsByTransNo(TransactionNo: string) : Observable<any>{
    return this.http.get<any>(_url+'GetSaleDetailsByTransNo/'+TransactionNo);
  }

  GetSaleDetailById(Id: string) : Observable<any>{
    return this.http.get<any>(_url+'GetSaleDetailById/'+Id);
  }
  GetSaleDetailsByTransDateFromByTransDateTo(DateFrom:string,DateTo:string){
    return this.http.get<any>(_url+'GetSaleDetailsByTransDateFromByTransDateTo/'+DateFrom+'/'+DateTo);
  }
  GetSaleDetailsByReceiptNoByRecordStatus(ReceiptNo :string,RecordStatus:string)
  {
    return this.http.get<any>(_url+'GetSaleDetailsByReceiptNoByRecordStatus/'+ReceiptNo+'/'+RecordStatus);  
  }

}
