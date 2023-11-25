import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  registrationForm: FormGroup;
 
  image: File | null = null;

  selectedTechnologies: string[] = [];


  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router) {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      phn: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      address: ['', [Validators.required]],
      district: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      technologies: [''],
      
      email: ['', [Validators.required, Validators.email, this.gmailValidator()]],
      username: ['', [Validators.required]],
      
      image: [null],
      password: ['', [Validators.required, Validators.minLength(6)]],
      con_password: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordMatchValidator
      
       });
  }

  

  gmailValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      if (!email || !email.toLowerCase().endsWith('@gmail.com')) {
        return { invalidGmail: true };
      }
      return null;
    };
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('con_password');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsNotMatch: true };
    }

    return null;
  }

  onImageChange(event: any) {
    this.image = event.target.files[0];
    
  }




toggleTechnology(technology: string) {
  const index = this.selectedTechnologies.indexOf(technology);
  if (index !== -1) {
    this.selectedTechnologies.splice(index, 1);
  } else {
    this.selectedTechnologies.push(technology);
  }
}

isTechnologySelected(technology: string): boolean {
  return this.selectedTechnologies.includes(technology);
}

  


  getImgUrl(): string {
    if (this.image) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;

        const byteCharacters = atob(base64Image.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/*' });

        const imageFile = new File([blob], 'image.jpg', { type: 'image/*' });
        this.registrationForm.get('image')?.setValue(imageFile);
      };
      reader.readAsDataURL(this.image);

      return '';
    }
    return '';
  }



  

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = new FormData();
  
      
      console.log('Form Values:', this.registrationForm.value);
  
      for (const key in this.registrationForm.value) {
        console.log(`Key: ${key}, Value: ${this.registrationForm.value[key]}`);
        if (key === 'technologies') {
          formData.append(key, JSON.stringify(this.selectedTechnologies));
        } else {
          formData.append(key, this.registrationForm.value[key]);
        }
      }
  
      this.sendFormDataToBackend(formData);
    }
  }
  
  

  
  
  
  sendFormDataToBackend(formData: FormData) {
    this.http.post('http://localhost:8080/api/users/register', formData, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          console.log("Registration response", response);
          if (response.includes("User registered successfully.")) {
            console.log("Registration successful");
            alert("Registration successful");
            this.router.navigate(['/']);
          } else {
            console.log("Unexpected response");
            alert("Unexpected response: " + response);
          }
        },
        (error) => {
          console.error("Error occurred", error);
          if (error.status === 400) {
            alert("Password and Confirm Password do not match.");
          } else if (error.status === 500) {
            alert("Error registering user. Please try again later.");
          } else {
            alert("Unexpected error occurred during registration.");
          }
        }
      );
  }
  
  
  
  
  
  
}


  
  
  










  

