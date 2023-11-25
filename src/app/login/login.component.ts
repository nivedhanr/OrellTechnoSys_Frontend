import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private apiService: ApiService) {}


  login = () => {
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert("Please fill in both username and password fields.");
      return;
    }


    const user = { username: this.username, password: this.password };
    console.log('User Data:', user);
    this.apiService.userLogin(user)
      .subscribe((response: any) => {
         console.log('Response:', response);
         if (response.message === "user login success") {
          alert("Valid credential");
          const userId=response.userid
          console.log(userId)
          sessionStorage.setItem("userinfo",userId)
          this.router.navigate(['dashboard']);
        } else {
          alert("Invalid credential");
        }
      });
  }

 
}