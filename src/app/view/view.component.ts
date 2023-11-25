import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  userDetails: any=[];
  imageDataUrl: string=''; // Initialize with an empty string
  
  image: File | null = null;
  constructor(private apiService: ApiService) {
    apiService.getAllUsers().subscribe(
      (response)=>
      {
        this.userDetails=response;
      }
    );
  }

  
  // viewAll=()=>{
  //   this.editMode=true
  //   this.apiService.getAllUsers().subscribe((data) => {
  //     this.userDetails = data;

  //   });
  // }
}
