import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'router',
  templateUrl: './router-page.component.html',
  styleUrls: ['./app.component.css']
})

export class RouterPageComponent {
  spinnerIsVisible: boolean = false;

  notificationPanelClasses = {
    notifications: "bg-primary",
    errors: "bg-danger",
    successes: "bg-success"
  };

  constructor(
    public userSvc: UserService,
    private notificationsSvc: NotificationService,
    public snackBar: MatSnackBar,
  ) {
  }

  logOut() {
    this.userSvc.logOut();
  }
  
  ngDoCheck(): void {
    this.spinnerIsVisible = this.userSvc.spinnerIsVisible;
    for (let messageType in this.notificationsSvc.messages) {
      if (this.notificationsSvc.messages[messageType].length > 0) {
        for (let item in this.notificationsSvc.messages[messageType]) {
          this.showNotification(this.notificationsSvc.messages[messageType].pop(), messageType);
        }
      }
    }
  }

  showNotification(notification: any, messgeType: string) {
    let panelClass = this.notificationPanelClasses[messgeType];

    setTimeout(() => {
      this.snackBar.open(notification.message, notification.buttonText, {
        panelClass: [panelClass, "text-white"],
        verticalPosition: "top"
      });
    }, 0);
  }
}