import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class BuildPortfolioService {

  portfolio: Portfolio | undefined;
  private sectionsSubject: BehaviorSubject<any>;
  public sections: Observable<any>;

  private urlSubject: BehaviorSubject<any>;
  public url: Observable<any>;

  constructor(private http: HttpClient) {
      this.sectionsSubject = new BehaviorSubject({});
      this.sections = this.sectionsSubject.asObservable();
      this.urlSubject = new BehaviorSubject("");
      this.url = this.urlSubject.asObservable();
   }

  getPortfolio(){
    console.log("inside service");
    this.http.get<Portfolio>(`${environment.apiUrl}/portfolio`)
    .subscribe((portfolio: Portfolio)=>{
      console.log("here",portfolio)
      this.portfolio = portfolio;
      this.sectionsSubject.next(portfolio.sections);
      this.urlSubject.next(portfolio.url);
    },
    (error)=>{
      console.log(error);
    })
  }

  getSection(key:string){
    console.log(this.portfolio);
    if(this.portfolio)
    return this.portfolio[key];
  }

  saveSection(key:string,values:any){
    console.log(values);
    if(this.portfolio){
      this.portfolio[key] = values;
      this.enableSection(key);
    }
    console.log(this.portfolio);
  }

  enableSection(key:string){
    if(this.portfolio){
      this.portfolio.sections[key] = true;
      this.sectionsSubject.next(this.portfolio.sections);
    }
  }

  disableSection(key:string){
    if(this.portfolio){
      this.portfolio.sections[key] = false;
      this.sectionsSubject.next(this.portfolio.sections);
    }
  }

  updatePortfolio(){
    return this.http.put<Portfolio>(`${environment.apiUrl}/portfolio`,this.portfolio)
            
  }

  updateUrl(url:string){
    return this.http.post(`${environment.apiUrl}/updateurl`,{url})
    .pipe(map(success => {
      this.urlSubject.next(url);
      return success;
  }));
  }
  
}