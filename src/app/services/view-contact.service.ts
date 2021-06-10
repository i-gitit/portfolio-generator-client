import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewContactService {

  constructor(private http:HttpClient) { }

  getContact(url:string){
    return this.http.get<{contact:any,user:any}>(`${environment.apiUrl}/contact/${url}`);
  }
}
