import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    var localUser = localStorage.getItem('currentUser');
    if(localUser)
      this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localUser));
    else
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
      this.currentUser = this.currentUserSubject.asObservable();
   }
   
   public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username:string, password:string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      // this.router.navigate(['/login'])
  }
}
