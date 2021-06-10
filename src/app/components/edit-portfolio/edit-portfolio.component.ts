import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl,Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

import { BuildPortfolioService } from '../../services/build-portfolio.service';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ResumeComponent } from './resume/resume.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {

  sections: {[key:string]:boolean} = {
    "About": false,
    "Skills":false,
    "Resume": false,
    "Projects":false,
    "Services":false,
    "Contact":false
  }
  url = new FormControl('',Validators.required);

  loading:boolean= false;
  sectionKeys = [ "About",
                  "Skills",
                  "Resume",
                  "Projects",
                  "Services",
                  "Contact"]

  constructor(private modalService: NgbModal,
              private bp: BuildPortfolioService,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.bp.getPortfolio();
    this.bp.sections.subscribe((sections)=>{
      this.sections=sections;
    });
    this.bp.url.subscribe((url)=>{
      this.url.setValue(url);
    })
  }

  updateUrl(){
    console.log(this.url);
    if(this.url.value == ""){
       return;
    }
    this.loading = true;
    this.bp.updateUrl(this.url.value)
    .subscribe((success)=>{
      console.log(success);
      this.loading=false;
      this.toastService.show('Url successfully updated', { classname: 'bg-success text-light', delay: 5000 });
    },
    (error)=>{
      console.log(error);
      this.loading=false;
      this.toastService.show("Url was not updated", { classname: 'bg-danger text-light', delay: 5000 });
    })
  }

  removeSection(key:string){
      this.bp.disableSection(key);
  }

  updatePortfolio(){
    this.loading=true;
    this.bp.updatePortfolio()
    .subscribe(
      (body)=>{
        console.log(body);
        this.loading=false;
        this.toastService.show('Portfolio successfully updated', { classname: 'bg-success text-light', delay: 5000 });
      },
      (error)=>{
        console.log(error);
        this.loading=false;
        this.toastService.show("Portfolio was not updated", { classname: 'bg-danger text-light', delay: 5000 });
      }
    )
  }

  openSectionEditor(section:string) {
    var reference;
    switch(section) {
      case "About":
        reference = AboutComponent;
        break;
      case ("Skills"):
        reference = SkillsComponent;
        break;
      case ("Resume"):
        reference = ResumeComponent;
        break;
      case ("Projects"):
        reference = ProjectsComponent;
        break;
      case ("Services"):
        reference = ServicesComponent;
        break;
      case ("Contact"):
        reference = ContactComponent;
        break;
      default:
        // code block
    }
    const modalRef = this.modalService.open(reference,{ size: 'lg', scrollable: true });
    modalRef.componentInstance.name = 'World';
  }

}
