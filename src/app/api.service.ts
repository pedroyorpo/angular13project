import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any>(_url+'weatherforecast');
  }
}
