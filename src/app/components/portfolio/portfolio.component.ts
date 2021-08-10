import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ViewPortfolioService } from '../../services/view-portfolio.service';
import { Portfolio } from '../../models/portfolio';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css',
              './css/icofont/icofont.min.css',
              './css/boxicons/css/boxicons.min.css',
              './css/venobox.css',
              './css/owl.carousel.min.css',
              './css/aos.css',
              './css/style.css',
            ]
})
export class PortfolioComponent implements OnInit {

  urlToken:any;
  portfolio: Portfolio | undefined;
  user:{
    firstname:string;
    lastname:string
  } | undefined;
  skillSets:any=[];
  constructor(private vp:ViewPortfolioService,
              private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.urlToken = params.get('id');
      if(this.urlToken){
        this.getPortfolio(this.urlToken);
      }
    })
  }

  widthConvert(width:number){
    return `width : ${width}%`;
  }

  splitSkills(skills: any){
    console.log(skills);
    const skillSlice =[];
    skillSlice.push(skills.splice(0,Math.ceil(skills.length/2)));
    skillSlice.push(skills);
    return skillSlice;
  }

  getPortfolio(urlToken: string){
    this.vp.getPortfolio(urlToken)
    .subscribe((res:{portfolio:Portfolio,user:any})=>{
      console.log(res);
      this.portfolio = res.portfolio;
      this.user = res.user;
      this.skillSets = this.splitSkills(this.portfolio['Skills']);
    })
  }

}
