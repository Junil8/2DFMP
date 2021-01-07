import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthorizationModel } from '../models/AuthorizationModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authorization: AuthorizationModel;

  constructor(private jwtHelper: JwtHelperService) { }

  public getAuthentication():AuthorizationModel {
    const token = localStorage.getItem('token');

    if (token) {
      let authorization:AuthorizationModel = {
        token: localStorage.getItem('token') as string
      }
  
      this.authorization = authorization;
    }

    return this.authorization;
  }

  public setAuthentication(authorization: AuthorizationModel) {
    this.authorization = authorization;
    localStorage.setItem('token', authorization.token);
  }

  public clearAuthentication() {
    this.authorization = new AuthorizationModel();
    localStorage.removeItem('token');
  }

  public isAuthenticated():Boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      let authorization:AuthorizationModel = {
        token: localStorage.getItem('token') as string
      }
  
      this.authorization = authorization;

      return !this.jwtHelper.isTokenExpired(token);
    }

    return false;
  }

}
