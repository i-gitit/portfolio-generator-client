import { Component, OnInit } from '@angular/core';
import { ViewContactService } from '../../services/view-contact.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})

export class ContactCardComponent implements OnInit {
  urlToken:any;
  contact: any;
  user:any;
  constructor(private cs: ViewContactService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.urlToken = params.get('id');
      if(this.urlToken){
        this.getContact(this.urlToken);
      }
    })
  }

  getContact(urlToken:string){
    this.cs.getContact(urlToken)
    .subscribe((res:{contact:any,user:any})=>{
      this.contact = res.contact;
      this.user = res.user;
    },
    (error)=>{
      
    })
  }

  emailConvert(email:string){
    return "mailto:"+email;
  }

  phoneConvert(phone:string){
    return "tel:"+phone;
  }
}


