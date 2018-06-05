import { Component} from '@angular/core';
import { UserService } from './services/user.service';


@Component({
  selector: 'router',
  templateUrl: './router-page.component.html',
  styleUrls: ['./app.component.css']
})

export class RouterPageComponent  {

  constructor(
    private userSvc: UserService,
    
) {
}

  logOut(){
    this.userSvc.logOut();
  }
}