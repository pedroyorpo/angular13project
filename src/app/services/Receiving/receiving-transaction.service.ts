import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class ReceivingTransactionService {

  private _refreshrequired=new Subject<void>();
  constructor(
    private http: HttpClient,
  ) { 
  }

  get RequiredRefresh(){
    return this._refreshrequired;
  }
 
  GetTransReceiveNo() : Observable<any>{
    return this.http.get<any>(_url+'GetTransReceiveNo');
  }
  SaveToReceiveHeaders(ItemId: string, TransNo: string, CustomerId: string) : Observable<any>{
    return this.http.get<any>(_url+'SaveToReceiveHeaders/'+ItemId+'/'+TransNo+'/'+CustomerId);
  }
  UpdateReceiveDetail(data: any) : Observable<any>{
    return this.http.post<any>(_url+'UpdateReceiveDetail',data);
  }
  UpdateElementReceiveDetail(Id: string, Column: string, Value: string) : Observable<any>{
    return this.http.get<any>(_url+'UpdateElementReceiveDetail/'+Id+'/'+Column+'/'+Value);
  }
  DeleteReceiveDetailById(Id: string) : Observable<any>{
    return this.http.get<any>(_url+'DeleteReceiveDetailById/'+Id);
  }
  DeleteReceiveDetailsByTransNo(TransNo: string) : Observable<any>{
    return this.http.get<any>(_url+'DeleteReceiveDetailsByTransNo/'+TransNo);
  }
  UpdateReceiveHeader(data: any, RecordStatus: string) : Observable<any>{
    return this.http.post<any>(_url+'UpdateReceiveHeader/'+RecordStatus,data);
  }
  UpdateReceiveHeaderStatusByReceiptNo(ReceiptNo: string, Status) : Observable<any>{
    return this.http.get<any>(_url+'UpdateReceiveHeaderStatusByReceiptNo/'+ReceiptNo+'/'+Status);
  }
  UpdateReceiveDetailStatusById(Id: string, Status) : Observable<any>{
    return this.http.get<any>(_url+'UpdateReceiveDetailStatusById/'+Id+'/'+Status);
  }
}
