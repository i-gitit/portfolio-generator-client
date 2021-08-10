import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';
import { BuildPortfolioService } from '../../services/build-portfolio.service';
import { ContactComponent } from '../edit-portfolio/contact/contact.component';
import { ViewContactService } from '../../services/view-contact.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact: any;
  user:any;
  url:any;
  loading:boolean = false;
  constructor(private modalService: NgbModal,
              private bp: BuildPortfolioService,
              private cs: ViewContactService,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.bp.getPortfolio();
    this.bp.url.subscribe((url)=>{
      if(url!=="")
        this.url = url;
        this.getContact(url);
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

  openContactModel(){
    this.modalService.open(ContactComponent,{ size: 'lg', scrollable: true }).result.then((result) => {
      console.log("Save click");
      this.updateContact();
    }, (reason) => {
      console.log("other");
    });
  }

  updateContact(){
    this.loading=true;
    this.bp.updatePortfolio()
    .subscribe(
      (body)=>{
        this.loading=false;
        this.toastService.show('Contact information successfully updated', { classname: 'bg-success text-light', delay: 5000 });
        this.getContact(this.url);
      },
      (error)=>{
        console.log(error);
        this.loading=false;
        this.toastService.show("Contact information was not updated", { classname: 'bg-danger text-light', delay: 5000 });
      }
    )
  }

  createLink(){
    return environment.clientUrl + "contact/" + this.url;
  }
  
}
