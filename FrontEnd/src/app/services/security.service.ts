import { share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Endpoints } from '../enums/endpoints';

@Injectable()
export class SecurityService implements CanActivate {
  token: string;
  tokenxpirationDate: Date;
  refreshToken: string;

  constructor(
    public router: Router,
    public http: HttpClient
  ) {
    let userTokens = JSON.parse(localStorage.getItem('userTokens'));
    if (userTokens) {
      this.setTokens(userTokens);
    }
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
  }

  login(login, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let body = new HttpParams()
      .set('client_id', "mvc")
      .set('client_secret', "secret")
      .set('grant_type', "password")
      .set('username', login)
      .set('password', password);

    let url = Endpoints.api.user.login;

    let observable = this.http.post(url,
      body,
      httpOptions).pipe(share());

    return observable;
  }

  setTokens(authResponse: any): any {
    this.token = authResponse.access_token;
    this.refreshToken = authResponse.refresh_token;

    if (authResponse.tokenxpirationDate) {
      this.tokenxpirationDate = authResponse.tokenxpirationDate;
    } else {
      this.tokenxpirationDate = new Date();
      this.tokenxpirationDate.setSeconds(authResponse.expires_in);
      authResponse.tokenxpirationDate = this.tokenxpirationDate;
      delete authResponse["expires_in"];
    }

    localStorage.setItem('userTokens', JSON.stringify(authResponse));
  }

  tryToRefreshToken() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let body = new HttpParams()
      .set('client_id', "mvc")
      .set('client_secret', "secret")
      .set('grant_type', "refresh_token")
      .set('refresh_token', this.refreshToken);

    let url = Endpoints.api.user.login;

    let observable = this.http.post(url,
      body,
      httpOptions).pipe(share());

    observable.subscribe(
      data => {

      },
      err => {
        this.router.navigate(['login']);
      }
    )
    return observable;
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    this.tokenxpirationDate = null;
    localStorage.removeItem('userTokens');
  }

  getToken(): any {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token;
  }
}
