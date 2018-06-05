import { share , finalize } from 'rxjs/operators';
import 'rxjs/add/observable/empty';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Endpoints } from '../enums/endpoints';
import { SecurityService } from './security.service';
import { Router } from '@angular/router';
import { ChangePasswordDTO } from '../models/changePasswordDTO';
import { Observable} from 'rxjs/Observable';


@Injectable()
export class UserService {
    loginInProgress: boolean = false;
    spinnerIsVisible: boolean = false;

    constructor(private http: HttpClient,
        private securitySvc: SecurityService,
        public router: Router) {
    }

    logIn(login: string, password: string) {
        if (this.loginInProgress) {
            return Observable.empty();
        }

        this.loginInProgress = true;
        let observable = this.securitySvc.login(login, password);
        
        observable
            .subscribe(data => {
            this.securitySvc.setTokens(data as any);
            this.router.navigate(['one']);
        }, err => { // error
            console.error(err);
        });
        
        return observable.pipe(finalize( () => {
            this.loginInProgress = false;
        }));
    }

    logOut() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                // will set up automatically via http interceptor
                //'Authorization': 'Bearer ' + this.securitySvc.token
            })
        };
        let body = new HttpParams()
            .set('token', this.securitySvc.refreshToken)
            .set('token_type_hint', 'refresh_token')
            .set('client_id', "mvc")
            .set('client_secret', "secret");

        let url = Endpoints.api.user.logout;
        try {
            let promise = this.http.post(url,
                body,
                httpOptions)
                .toPromise();

            promise.then(data => {
                // it is ok
            }, err => {
                console.error(err);
            });
        }
        catch (exp) {
            console.error(exp);
        }

        this.securitySvc.clearTokens();
        this.router.navigate(['login']);
    }

    getAntiforgeryKey() {
        let url = Endpoints.api.identity.antiforgery;
        let observable = this.http.get(
            url
        ).pipe(share());
        return observable;
    }

    changePassword(changePassword: ChangePasswordDTO) {
        let url = Endpoints.api.identity.changePassword;
        let observable = this.http.post(
            url,
            changePassword
        ).pipe(share());

        return observable;
    }
}