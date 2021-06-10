import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    console.log("inservice",user);
      return this.http.post(`${environment.apiUrl}/signup`, user);
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  get(){
      return this.http.get(`${environment.apiUrl}/user`);
  }

  update(user:any){
      return this.http.post(`${environment.apiUrl}/user`,user);
  }
}