import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../services/auth.service';

import { UserModel } from '../models/UserModel';
import { UserCreatedModel } from '../models/UserCreatedModel';
import { UserUpdatedModel } from '../models/UserUpdatedModel';
import { UserDeletedModel } from '../models/UserDeletedModel';
import { UserUpdateModel } from '../models/UserUpdateModel';
import { AuthorizationModel } from '../models/AuthorizationModel';
import { HashModel } from '../models/HashModel';
import { HashCreateModel } from '../models/HashCreateModel';
import { AvailableModel } from '../models/AvailableModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host:string = `${window.location.origin}`;
  tokenRoute:string = '/api/token';
  userRoute:string = '/api/user';
  availableRoute:string = '/api/user/available';
  encryptRoute:string = '/api/encrypt/';

  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService, 
    private auth:AuthService
  ) {}

  login(emailAddress:string, password:string):Promise<AuthorizationModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let body = {
      email_address: emailAddress,
      password: password
    }

    return this.http.post<AuthorizationModel>(`${this.host}${this.tokenRoute}`, body, { headers }).toPromise();
  }

  createUser(emailAddress:string, username:string, password:string):Promise<UserCreatedModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let body = {
      email_address: emailAddress,
      username: username,
      password: password
    }

    return this.http.post<UserCreatedModel>(`${this.host}${this.userRoute}`, body, { headers }).toPromise();
  }

  updateUser(userUpdateModel: UserUpdateModel):Promise<UserUpdatedModel> {
    let authorization = this.auth.getAuthentication();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorization.token}`
    });

    let username = this.jwtHelper.decodeToken(authorization.token).username;

    return this.http.patch<UserUpdatedModel>(`${this.host}${this.userRoute}/${username}`, userUpdateModel, { headers }).toPromise();
  }

  deleteUser():Promise<UserDeletedModel> {
    let authorization = this.auth.getAuthentication();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorization.token}`
    });

    let username = this.jwtHelper.decodeToken(authorization.token).username;

    return this.http.delete<UserDeletedModel>(`${this.host}${this.userRoute}/${username}`, { headers }).toPromise();
  }

  getUser():Promise<UserModel> {
    let authorization = this.auth.getAuthentication();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorization.token}`
    });

    let username = this.jwtHelper.decodeToken(authorization.token).username;

    return this.http.get<UserModel>(`${this.host}${this.userRoute}/${username}`, { headers }).toPromise();
  }

  emailAvailable(emailAddress: string):Promise<AvailableModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let body = {
      email_address: emailAddress,
    }

    return this.http.post<AvailableModel>(`${this.host}${this.availableRoute}`, body, { headers }).toPromise();
  }

  usernameAvailable(username: string):Promise<AvailableModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let body = {
      username: username,
    }

    return this.http.post<AvailableModel>(`${this.host}${this.availableRoute}`, body, { headers }).toPromise();
  }

  encrypt(hashCreateModel:HashCreateModel):Promise<HashModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<HashModel>(`${this.host}${this.encryptRoute}`, hashCreateModel, { headers }).toPromise();
  }

}
