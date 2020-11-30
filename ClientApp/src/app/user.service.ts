import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserData } from './userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAccountUser(): Observable<string>{
    return this.http.get('/account/info', { responseType:'text' });
  }
  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>('/user');
  }

  getUser(id: string): Observable<UserData> {
    return this.http.get<UserData>('/user/' + id);
  }

  createUser(user: UserData): Observable<string> {
    return this.http.post('/user', user, { responseType:'text' });
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete('/user/' + id, { responseType: 'text' });
  }
}
