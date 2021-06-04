import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

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

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private alertService: AlertService) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required]],
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
    var newUser = this.signupForm.value;
    delete newUser['confirmpassword'];
    console.log(JSON.stringify(this.signupForm.value));
    this.userService.register(newUser)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              this.toggleForm();
          },
          error => {
            this.alertService.error(error);
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
    this.authenticationService.login(this.loginControls.username.value, this.loginControls.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                alert(error);
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
