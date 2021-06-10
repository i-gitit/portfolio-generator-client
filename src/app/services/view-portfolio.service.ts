import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class ViewPortfolioService {

  constructor(private http:HttpClient) { }

  getPortfolio(url:string){
    return this.http.get<{portfolio:Portfolio,user:any}>(`${environment.apiUrl}/portfolio/${url}`);
  }
}
