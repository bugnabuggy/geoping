import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

declare const gapi: any;

@Component({
    selector: 'two-page',
    templateUrl: '../templates/login.component.html',
    styleUrls: ['../app.component.css']
})

export class LoginComponent  implements AfterViewInit {
    private clientId:string = '328443392526-io05f30rib5v05u90c80647rt64egce6.apps.googleusercontent.com';
    private scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly'
      ].join(' ');
      auth2: any;

    username = '';
    password = '';
    // constructor(private element: ElementRef) {
    //     console.log('ElementRef: ', this.element);
    //   }
    constructor(
        private userSvc: UserService,
        private notifications: NotificationService,
        private element: ElementRef
    ) {
        
    }

    login(e) {
        e.preventDefault();

        this.userSvc.logIn(this.username, this.password)
            .subscribe((data) => {
            }, (err) => {
                this.notifications.showError('wrong login or password');
            });

        return false;
    }


    public googleInit() {
        let that = this;
        gapi.load('auth2', function () {
          that.auth2 = gapi.auth2.init({
            client_id: that.clientId,
            cookiepolicy: 'single_host_origin',
            scope: that.scope
          });
          that.attachSignin(that.element.nativeElement.firstChild);
        });
      }
      public attachSignin(element) {
        let that = this;
        this.auth2.attachClickHandler(element, {},
          function (googleUser) {
            let profile = googleUser.getBasicProfile();
            console.log('Token || ' + googleUser.getAuthResponse().id_token);
            console.log('Name: ' + profile.getName());
            console.log('Email: ' + profile.getEmail());
    
    
          }, function (error) {
            console.log(JSON.stringify(error, undefined, 2));
          });
      }
    
      
    
      ngAfterViewInit() {
        this.googleInit();
      }


};