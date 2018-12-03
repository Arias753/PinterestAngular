import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-favourite',
    templateUrl: './dialog-favourite.component.html',
    styleUrls: ['./dialog-favourite.component.css']
})
export class DialogFavouriteComponent implements OnInit {
    modalTitle: string;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalTitle = data.title;
    }
    ngOnInit() {}
}
