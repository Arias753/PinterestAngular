import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-detail-post',
    templateUrl: './detail-post.component.html',
    styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
    dataUser = null;
    idPost:any = null;
    dataPost = {};

    constructor(private firebase:FirebaseService, private authentication:AuthenticationService, private route:ActivatedRoute) { }
    
    ngOnInit(): void {
        this.dataUser = this.authentication.getDataUser();
        this.idPost = this.route.snapshot.params['id'];
        this.firebase.getPost(this.idPost).valueChanges().subscribe(post => {
            this.dataPost = post;
        });
    }
}
