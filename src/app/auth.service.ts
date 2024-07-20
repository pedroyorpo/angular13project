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
  private userEmail: string | null = null;
  private isAuthenticated = false;

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(_url+'login',{email,password}).pipe(
      tap(res => {
        this.token = res.token;
        this.userEmail = email; // Assume the email is returned in the response
        localStorage.setItem('userEmail', this.userEmail);
        localStorage.setItem('token', this.token);
        this.isAuthenticated = true;
        this.RequiredRefresh.next();
      }),
      catchError(this.handleError<any>('login'))
    );
  }


  getUserEmail(): string | null {
    return this.userEmail || localStorage.getItem('userEmail');
  }
 
  logout(): void {
    this.isAuthenticated = false;
    this.token = null;
    this.userEmail = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
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
