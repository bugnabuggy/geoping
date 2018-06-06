import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
    selector: 'registration',
    templateUrl: '../templates/registration.component.html',
    styleUrls: ['../app.component.css']
})
export class RegistrationComponent {
    // username = 'user';
    // password = 'Password@123';


    constructor(
        private userSvc: UserService,
        private notifications: NotificationService,
        private router: Router
    ) {
    }

    registration(e) {
        let userName = e.currentTarget[0].value;
        let password = e.currentTarget[1].value;
        let repiatPassword = e.currentTarget[2].value;
        if (userName != '') {
            if (password === repiatPassword && password != '') {
                this.userSvc.registration(userName, password).subscribe(
                    (data) => {
                        this.router.navigate(['login']);
                    }, (err) => {
                        this.notifications.showError(err.error);
                    });
            }
            else {
                this.notifications.showError('passwords don\'t match');
            }
        }
        else {
            this.notifications.showError('username can not be empty');
        }

    }
}
