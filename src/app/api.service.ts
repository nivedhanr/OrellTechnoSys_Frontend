import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/users';
  constructor(private http:HttpClient) { }

  getAllUsers=()=>{
    return this.http.get("http://localhost:8080/api/users/viewAll")
  }

  addUsers=(dataToSend:any)=>
  {
    return this.http.post("http://localhost:8080/api/users/register",dataToSend)
  }
  // updateUserDetails=(datatosend:any)=>
  // {
  //   return this.http.put("http://localhost:8080/api/users/{id}",datatosend)
  // }
  userLogin=(datatosend: any)=>{
  
    return this.http.post("http://localhost:8080/api/users/userlogin", datatosend)
  }
  getUserDetails = (id: number) => {
    return this.http.get(`http://localhost:8080/api/users/${id}`);
  }
  // registerUser(formData: FormData) {
  //   return this.http.post("http://localhost:8080/api/users/register", formData);
  // }
  registerUser(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/register', formData);
  }
  updateUserDetails(formData: FormData): Observable<any> {
    const userId = sessionStorage.getItem('userinfo');
    const url = `${this.apiUrl}/${userId}`;
    const headers = new HttpHeaders();
    // Ensure you're sending the appropriate data in the request body
    // Set content type to multipart/form-data
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put(url, formData, { headers });
  }
}
