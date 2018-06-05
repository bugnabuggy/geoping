
import { Injectable, OnInit } from '@angular/core';



@Injectable()
export class NotificationService {
    
    messages:any =
    {
        notifications: [],
        errors: [],
        successes: []
    };
    
    constructor() { }

    showNotification(){

    }

    showError(message:string, buttonText:string = 'Ok'){        
        this.messages["errors"].push({message, buttonText});
    }

    showInfo(message:string, buttonText:string = 'Ok'){
        this.messages["notifications"].push({message, buttonText});
    }

    showSuccess(message:string, buttonText:string = 'Ok'){
        this.messages["successes"].push({message, buttonText});
    }
    
}