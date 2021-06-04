import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl,FormArray, FormBuilder } from '@angular/forms';
import { BuildPortfolioService } from '../../../services/build-portfolio.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  resumeForm: FormGroup = this.formBuilder.group({});
  educationGroup = {
    courseName:[''],
    courseStart:[''],
    courseEnd:[''],
    institute:[''],
    detail:['']
  }
  experienceGroup = {
    profile:[''],
    start:[''],
    end:[''],
    organisation:[''],
    detail:['']
  }

  constructor(public activeModal: NgbActiveModal,
                private formBuilder: FormBuilder,
                private bp: BuildPortfolioService) { }
  
  ngOnInit(): void {
    // this.resumeForm=this.formBuilder.group({
    //   education: this.formBuilder.array([]),
    //   experience: this.formBuilder.array([])
    // })
    this.patchData();
  }

  get education() {
    return this.resumeForm.get('education') as FormArray;
  }

  get experience() {
    return this.resumeForm.get('experience') as FormArray;
  }
  
  addEducation(){
    this.education.push(this.formBuilder.group(this.educationGroup));
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  addExperience(){
    this.experience.push(this.formBuilder.group(this.experienceGroup));
  }

  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  onSubmit(){
    console.log(this.resumeForm.value);
    const resume = this.resumeForm.value;
    this.bp.saveSection("Resume",resume);
    this.activeModal.close();
  }

  patchData(){
    const data = this.bp.getSection("Resume");
    console.log(data);
    const education = data['education'].map((educationRow:any) => {
      const newEducation = this.formBuilder.group(this.educationGroup);
      newEducation.patchValue(educationRow);
      return newEducation;
    });

    const experience = data['experience'].map((experienceRow:any) => {
      const newExperience = this.formBuilder.group(this.experienceGroup);
      newExperience.patchValue(experienceRow);
      return newExperience;
    });

    this.resumeForm.registerControl('education',new FormArray(education));
    this.resumeForm.registerControl('experience',new FormArray(experience));
  }

}
