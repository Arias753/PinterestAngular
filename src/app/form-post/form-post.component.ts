import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-form-post',
    templateUrl: './form-post.component.html',
    styleUrls: ['./form-post.component.css']
})
export class FormPostComponent implements OnInit {
    dataUser = null;
    dataForm:any = {};
    dataPost = {};
    eventImage:Event = null;
    idPost:any = 0;
    titleComponent:string = '';

    constructor(private firebase:FirebaseService, private authentication:AuthenticationService, private router:Router, private route:ActivatedRoute) { }
    
    ngOnInit(): void {
        if (this.route.snapshot.params['status'] == 'create') {
            this.idPost = 0;
            this.titleComponent = 'Crear Publicación';
            this.dataForm = {};
        } else {
            this.idPost = this.route.snapshot.params['status'];
            this.titleComponent = 'Actualizar Publicación';
            this.firebase.getPost(this.idPost).valueChanges().subscribe(post => {
                this.dataForm = post;
            });
        }
        this.dataUser = this.authentication.getDataUser();
    }

    selectImage(event){
        this.eventImage = event;
    }

    createPost() {
        this.dataForm.id = Date.now();
        this.dataForm.id_usuario = this.dataUser.id;
        this.firebase.createPost(this.dataForm, this.eventImage);
    }

    updatePost() {
        if (this.eventImage != null) {
            this.firebase.updatePost(this.dataForm, this.eventImage, true);
        } else {
            this.firebase.updatePost(this.dataForm, this.eventImage, false);
        }
    }
}
