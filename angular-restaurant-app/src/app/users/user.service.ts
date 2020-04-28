import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'any' })
export class UserService {
  constructor(private http: HttpClient) { }

  getUser():Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/profile`);
  }
}
