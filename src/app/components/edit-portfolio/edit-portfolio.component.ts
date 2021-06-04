import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  sectionKeys = [ "About",
                  "Skills",
                  "Resume",
                  "Projects",
                  "Services",
                  "Contact"]

  constructor(private modalService: NgbModal,
              private bp: BuildPortfolioService) { }

  ngOnInit(): void {
    this.bp.getPortfolio();
    this.bp.sections.subscribe((sections)=>{
      this.sections=sections;
    }
    )
  }

  removeSection(key:string){
      this.bp.disableSection(key);
  }

  updatePortfolio(){
    this.bp.updatePortfolio();
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
