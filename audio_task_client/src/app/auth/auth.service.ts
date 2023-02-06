import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  head_obj: HttpHeaders;

  constructor(private http: HttpClient) {
    this.head_obj = new HttpHeaders().set(
      'Authorization',
      'bearer ' + localStorage.getItem('token')
    );
  }
  login(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/login', data);
  }

  register(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/register', data);
  }

  getAudio(): Observable<any> {
    return this.http.get('http://localhost:3000/api/common/audio', {
      headers: this.head_obj
    });
  }

  addAudio(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/common/insertAudio',
      data,
      {
        headers: this.head_obj
      }
    );
  }

  deleteAudio(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/common/delete-audio',
      data,
      {
        headers: this.head_obj
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return token != null;
  }

  logOut(){
    localStorage.clear()
  }
}
