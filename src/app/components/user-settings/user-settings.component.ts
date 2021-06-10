import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  user: any;
  loading = false;
  userForm: FormGroup = this.formBuilder.group({
    firstname: ['',Validators.required],
    lastname: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    password: ['',[]],
    confirmpassword: ['',[]]
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.userService.get()
    .subscribe((user)=>{
      this.user=user;
      delete this.user['url'];
      this.userForm.patchValue(this.user);
    })
  };

  onuserFormSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.loading=true;
    var newUser = this.userForm.value;
    delete newUser['confirmpassword'];
    delete newUser['password'];
    console.log(JSON.stringify(this.userForm.value));
    this.userService.update(newUser)
      .subscribe(
          data => {
              this.loading=false;
              this.toastService.show('Settings successfully updated', { classname: 'bg-success text-light', delay: 5000 });
          },
          error => {
            console.log(error);
            this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 5000 });
            this.loading=false;
          });
  }

  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pwd = formGroup.controls[password];
      const cnfPwd = formGroup.controls[confirmPassword];

      if (pwd.value !== cnfPwd.value) {
        cnfPwd.setErrors({
          passwordsUnMatched: true
        });
      } else {
        cnfPwd.setErrors(null);
      }
    }
  }

}
