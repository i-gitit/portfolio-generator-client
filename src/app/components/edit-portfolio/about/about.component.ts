import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BuildPortfolioService } from '../../../services/build-portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

  aboutForm: FormGroup = this.formBuilder.group({});

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private bp: BuildPortfolioService) { }

  ngOnInit(): void {
    this.aboutForm = this.formBuilder.group({
      profile:['',Validators.required],
      dob:['',Validators.required],
      city:['',Validators.required],
      phone:['',Validators.required],
      email:['',Validators.required],
      degree:['',Validators.required],
      freelance:['',Validators.required],
      aboutSummary:['']
    });
    this.patchData();
  }

  onSubmit(){
    if(this.aboutForm.invalid)
      return;
    const about = this.aboutForm.value;
    this.bp.saveSection("About",about);
    this.activeModal.close();
  }

  patchData(){
    this.aboutForm.patchValue(this.bp.getSection('About'));
  }
}
