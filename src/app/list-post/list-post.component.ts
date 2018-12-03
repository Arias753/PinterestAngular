import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-post',
    templateUrl: './list-post.component.html',
    styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
    dataUser = null;
    postsUser = null;
    
    constructor(private firebase:FirebaseService, private authentication:AuthenticationService, private router:Router) { }
    
    ngOnInit(): void {
        this.dataUser = this.authentication.getDataUser();
        this.postsUser = this.firebase.getPostsUser(this.dataUser.id);
    }

    viewFormUpdatePost(id){
        this.router.navigate(['/formpost/'+id]);
    }

    deleteImage(id){
        this.firebase.deletePost(id);
    }

    viewDetailPost(id){
        this.router.navigate(['/detailpost/'+id]);
    }
}
