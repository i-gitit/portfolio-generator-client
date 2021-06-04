import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BuildPortfolioService } from '../../../services/build-portfolio.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup = this.formBuilder.group({});

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private bp: BuildPortfolioService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email:['',Validators.required],
      phone:['',Validators.required],
      location:['',Validators.required],
      socialMedia: this.formBuilder.group({
        twitter:[''],
        facebook:[''],
        instagram:[''],
        github:[''],
        linkedin:['']
      }),
    });
    this.patchData();
  }

  onSubmit(){
    if(this.contactForm.invalid)
      return;
    const contact = this.contactForm.value;
    this.bp.saveSection("Contact",contact);
    this.activeModal.close();
  }

  patchData(){
    this.contactForm.patchValue(this.bp.getSection('Contact'));
  }

}