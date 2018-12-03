import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
    selector: 'app-list-all',
    templateUrl: './list-all.component.html',
    styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {
    idUser:any;
    dataUser = null;
    postsAll = null;

    constructor(private firebase:FirebaseService, private authentication:AuthenticationService, private router:Router) { }

    ngOnInit(): void {
        this.dataUser = this.authentication.getDataUser();
        this.idUser = this.dataUser.id;
        this.postsAll = this.firebase.getPostsAll();
    }

    viewDetailPost(id){
        this.router.navigate(['/detailpost/'+id]);
    }

    public printDataUser(){
        this.dataUser = this.authentication.getDataUser();
        if (this.dataUser.rol == 1) {
            alert('Administrador');
        } else {
            alert('Usuario normal');
        }
    }
}
