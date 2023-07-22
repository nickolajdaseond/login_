import {Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup ,FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit{
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loginForm!:FormGroup;
  constructor(private http : HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group ({
      email:['',Validators.required],
      password:['',Validators.required],
      rememberMe: new FormControl(false)
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login(){
    this.http.get<any>("http://localhost:3000/user")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        this.loginForm.reset();
        this.router.navigate(["home"])
      } else{
        alert("email or password is invalid!");
      }
    })
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
  }
}


}
