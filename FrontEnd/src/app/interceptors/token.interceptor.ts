import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { SecurityService } from '../services/security.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  updateInProgress: boolean = false;
  waitingRequests: HttpRequest<any>[] = [];


  constructor(public securitySvc: SecurityService,
    public router: Router,
    private userSvc: UserService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userSvc.spinnerIsVisible = true;
    if (this.securitySvc.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.securitySvc.getToken()}`
        }
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.userSvc.spinnerIsVisible = false;
        // do stuff with response if you want
      }
    }, (err: any) => {
      this.userSvc.spinnerIsVisible = false;
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.securitySvc.clearTokens();
          this.router.navigate(["login"]);
        }
      }
    });
  }
}
