import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog-login',
    templateUrl: './dialog-login.component.html',
    styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {
    login:any = {};
    register:any = {};
    eventImage:Event = null;

    constructor(public dialogRef: MatDialogRef<DialogLoginComponent>, private authentication:AuthenticationService, private router:Router) { }
    ngOnInit() { }

    selectImage(event){
        this.eventImage = event;
    }

    public signIn(){
        this.authentication.signIn(this.login, this.dialogRef);
    }

    public registerUser(){
        this.register.rol = 2;
        this.authentication.register(this.register, this.eventImage, this.dialogRef);
    }
}
