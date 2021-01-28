import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(private http: HttpClient) { }
  private readonly URL = 'http://localhost:3000';
  getUsersByEmail(email: string){
    return this.http.get(`${this.URL}/users?email=${email}`,);
  }

}
