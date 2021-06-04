import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl,FormArray, FormBuilder } from '@angular/forms';
import { BuildPortfolioService } from '../../../services/build-portfolio.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services = new FormArray([]);
  serviceGroup = {
    title:['',Validators.required],
    description:['']
  }

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private bp:BuildPortfolioService) { }

    ngOnInit(): void {
      this.patchProjects();
    }
  
    addService(){
      this.services.push(this.formBuilder.group(this.serviceGroup));
    }
  
    removeService(index: number) {
      this.services.removeAt(index);
    }

    getService(i:number){
      return this.services.controls[i] as FormGroup;
    }

    onSubmit(){
      console.log(this.services.value);
      const services = this.services.value;
      this.bp.saveSection("Services",services);
      this.activeModal.close();
    }

    patchProjects(){
      const services = this.bp.getSection('Services');
      const controls = services.map((service:any) => {
          const newService = this.formBuilder.group(this.serviceGroup);
          newService.patchValue(service);
          return newService;
      });
      this.services = new FormArray(controls);
    }

}
