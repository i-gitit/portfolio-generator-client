import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl,FormArray, FormBuilder } from '@angular/forms';
import { BuildPortfolioService } from '../../../services/build-portfolio.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects = new FormArray([]);
  projectGroup = {
    title:['',Validators.required],
    description:[''],
    link:['']
  }
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private bp:BuildPortfolioService) { }

    ngOnInit(): void {
      this.patchProjects();
    }
  
    addProject(){
      this.projects.push(this.formBuilder.group(this.projectGroup));
    }
  
    removeProject(index: number) {
      this.projects.removeAt(index);
    }

    getProject(i:number){
      return this.projects.controls[i] as FormGroup;
    }

    onSubmit(){
      console.log(this.projects.value);
      const projects = this.projects.value;
      this.bp.saveSection("Projects",projects);
      this.activeModal.close();
    }

    patchProjects(){
      const projects = this.bp.getSection('Projects');
      const controls = projects.map((project:any) => {
          const newProject = this.formBuilder.group(this.projectGroup);
          newProject.patchValue(project);
          return newProject;
      });
      this.projects = new FormArray(controls);
    }

}
