import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  displaySignInCard: boolean = false;
  newUser: boolean = false;
  submitted: boolean = false;
  loginForm : FormGroup = this.formBuilder.group({});
  signupForm : FormGroup = this.formBuilder.group({});
  returnUrl: string = '/';
  loading = false;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private alertService: AlertService,
              public toastService: ToastService) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['',Validators.required]
    },{});
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  displaySignIn(){
    this.displaySignInCard = true;
  }

  toggleForm(){
    this.newUser=!this.newUser;
    this.submitted=false;
    if(this.newUser){
      this.signupForm = this.formBuilder.group({
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.minLength(6)]],
        confirmpassword: ['',Validators.required]
      },{
          validator: this.matchPasswords('password','confirmpassword')
      });
    }
  }

  get signupControl() {
    return this.signupForm.controls;
  }

  onsignupFormSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.loading=true;
    var newUser = this.signupForm.value;
    delete newUser['confirmpassword'];
    console.log(JSON.stringify(this.signupForm.value));
    this.userService.register(newUser)
      .subscribe(
          data => {
              this.loading=false;
              this.toastService.show('User successfully registered', { classname: 'bg-success text-light', delay: 5000 });
              this.toggleForm();
          },
          error => {
            console.log(error);
            this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 5000 });
            this.loading=false;
          });
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  onloginFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading=true;
    this.authenticationService.login(this.loginControls.email.value, this.loginControls.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.toastService.show('User logged in.', { classname: 'bg-success text-light', delay: 5000 });
                this.router.navigate([this.returnUrl]);
                this.loading=false;
            },
            error => {
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
