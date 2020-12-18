import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserData,UserCreationData } from './userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAccountUser(): Observable<UserData>{
    return this.http.get<UserData>('/account/info');
  }
  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>('/user');
  }

  getUser(id: string): Observable<UserData> {
    return this.http.get<UserData>('/user/' + id);
  }

  createUser(user: UserCreationData): Observable<string> {
    return this.http.post('/user', user, { responseType:'text' });
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete('/user/' + id, { responseType: 'text' });
  }
}
