import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { BuildPortfolioService } from '../../../services/build-portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  
  skills = new FormArray([]);
  constructor(public activeModal: NgbActiveModal,
              private bp: BuildPortfolioService) { }

  ngOnInit(): void {
    this.patchSkills();
  }

  addSkill() {
    const skill = new FormGroup({
      skillName: new FormControl('',Validators.required),
      skillExpertise: new FormControl('',Validators.required)
    })
    this.skills.push(skill);
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  getSkill(i:number){
    return this.skills.controls[i] as FormGroup;
  }

  onSubmit(){
    console.log(this.skills.value);
    const skills = this.skills.value;
    this.bp.saveSection("Skills",skills);
    this.activeModal.close();
  }

  patchSkills(){
    const skills:[] = this.bp.getSection('Skills');
    const controls = skills.map(skill => {
      const newSkill = new FormGroup({
        skillName: new FormControl(''),
        skillExpertise: new FormControl('')
      })
      newSkill.patchValue(skill);
      return newSkill;
    });
    this.skills = new FormArray(controls);
  }

}
