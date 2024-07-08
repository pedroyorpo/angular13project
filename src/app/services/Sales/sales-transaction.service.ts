import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { _url } from 'src/global-variables';


@Injectable({
  providedIn: 'root'
})
export class SalesTransactionService {

  private _refreshrequired=new Subject<void>();
  constructor(
    private http: HttpClient,
  ) { 
  }

  get RequiredRefresh(){
    return this._refreshrequired;
  }


  GetTransSaleNo() : Observable<any>{
    return this.http.get<any>(_url+'GetTransSaleNo');
  }
  SaveToSaleHeaders(ItemId: string, TransNo: string, CustomerId: string) : Observable<any>{
    return this.http.get<any>(_url+'SaveToSaleHeaders/'+ItemId+'/'+TransNo+'/'+CustomerId);
  }
  UpdateSaleDetail(data: any) : Observable<any>{
    return this.http.post<any>(_url+'UpdateSaleDetail',data);
  }
  UpdateElementSaleDetail(Id: string, Column: string, Value: string) : Observable<any>{
    return this.http.get<any>(_url+'UpdateElementSaleDetail/'+Id+'/'+Column+'/'+Value);
  }
  DeleteSaleDetailById(Id: string) : Observable<any>{
    return this.http.delete<any>(_url+'DeleteSaleDetailById/'+Id);
  }
  DeleteSaleDetailsByTransNo(TransNo: string) : Observable<any>{
    return this.http.get<any>(_url+'DeleteSaleDetailsByTransNo/'+TransNo);
  }
  UpdateSaleHeader(data: any, RecordStatus: string) : Observable<any>{
    return this.http.post<any>(_url+'UpdateSaleHeader/'+RecordStatus,data);
  }
  
  UpdateSaleHeaderStatusByReceiptNo(ReceiptNo: string,RecordStatus: string) : Observable<any>{
    return this.http.get<any>(_url+'UpdateSaleHeaderStatusByReceiptNo/'+ReceiptNo+'/'+RecordStatus);
  }
  UpdateSaleDetailStatusById(id: any, RecordStatus: string) {
    return this.http.get<any>(_url+'UpdateSaleDetailStatusById/'+id+'/'+RecordStatus);
  }

 
  
}
