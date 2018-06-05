import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';


declare var google: any;

@Component({
    selector: 'two-page',
    templateUrl: '../templates/login.component.html',
    styleUrls: ['../app.component.css']
})

export class LoginComponent {
    username = '';
    password = '';

    constructor(
        private userSvc: UserService,
        private notifications: NotificationService
    ) {
    }

    login(e) {
        e.preventDefault();

        this.userSvc.logIn(this.username, this.password)
            .subscribe((data) => {
            }, (err) => {
                this.notifications.showError(err.message);
            });

        return false;
    }
    
};