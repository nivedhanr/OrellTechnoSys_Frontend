import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userDetails: any;
  imageDataUrl: string=''; // Initialize with an empty string
  editMode = false;
  image: File | null = null;
  constructor(private apiService: ApiService) {
    
  }

  ngOnInit() {
    const userId = sessionStorage.getItem('userinfo');
    if (userId) {
      this.apiService.getUserDetails(Number(userId)).subscribe((data) => {
        this.userDetails = data;

        if (this.userDetails.image) {
          console.log("Image Data Length:", this.userDetails.image ? this.userDetails.image.length : 'Image data is empty or undefined');

          this.imageDataUrl = 'data:image/jpeg;base64,' + this.userDetails.image;
        }

        console.log("userdetails", this.userDetails);
        console.log("technologies", this.userDetails.technologies);
        console.log(data);
      });
    }
  }

  // Helper function to convert byte array to base64
  arrayBufferToBase64(buffer: any) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  saveChanges() {
    // Create a FormData object to send both user details and the image
    const formData = new FormData();

    // Append user details to the FormData
    formData.append('name', this.userDetails.name);
    formData.append('dob', this.userDetails.dob);
    formData.append('phn', this.userDetails.phn);
    formData.append('address', this.userDetails.address);
    formData.append('district', this.userDetails.district);
    formData.append('gender', this.userDetails.gender);
    formData.append('technologies', this.userDetails.technologies);
    formData.append('email', this.userDetails.email);
    formData.append('password', this.userDetails.password);

    // Append the image file, if it has been selected
    if (this.image) {
      formData.append('image', this.image);
    }

    this.apiService.updateUserDetails(formData).subscribe((data) => {
      console.log('Updated user details:', data);
      // Reload the page and display the current data from the database
      location.reload();
      this.editMode = false;
    });
    

    
  }

  cancelEdit() {
    // Reload user details to discard changes
    this.ngOnInit();
    this.editMode = false;
  }
  onImageChange(event: any) {
    this.image = event.target.files[0];
  }
}
