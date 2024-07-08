import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, of } from 'rxjs';
import { _url } from 'src/global-variables';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private _refreshrequired=new Subject<void>();

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private http: HttpClient) { }
  private token: string | null = null;

  
  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(_url+'login',{email,password}).pipe(
      tap(res => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        this.RequiredRefresh.next();
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  // Log the user out
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

  register(signUpForm:any): Observable<any>{
    return this.http.post<any>(_url+'signup',signUpForm).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getEmailByName(id) : Observable<any>{
    return this.http.get<any>(_url+'getEmailByName/'+id);
  }



  
}
