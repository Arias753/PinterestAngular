import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogFavouriteComponent } from './dialog-favourite/dialog-favourite.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Pinterest Angular';
    mobileQuery: MediaQueryList;
    isAuthenticated:boolean = false;
    dataUser:any = {};
    data:any = [{id: 1,titulo: 'Imagen 1'},{id: 2,titulo: 'Imagen 2'},{id: 3,titulo: 'Imagen 3'}];
    
    constructor(private authentication:AuthenticationService, private router:Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    private _mobileQueryListener: () => void;

    ngOnInit(): void {
        this.authentication.isAuthenticated().subscribe((result) => {
            if (result && result.uid) {
                
                this.authentication.getDataUserGeneral(result.uid).valueChanges().subscribe(user => {
                    this.dataUser = user;
                    this.authentication.setDataUser(user);
                    this.isAuthenticated = true;
                    this.dialog.closeAll();
                    this.router.navigate(['/listall']);
                });

            }else{
                this.isAuthenticated = false;
                this.dataUser = {};
                this.router.navigate(['/']);
                this.openModalLogin();
            }
        }, (error) => {
            this.isAuthenticated = false;
            this.dataUser = {};
            this.router.navigate(['/']);
            this.openModalLogin();
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    openModalLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        const dialogRef = this.dialog.open(DialogLoginComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log('El modal de login se cerro con exito.');
        });
    }

    public signOut(){
        this.authentication.signOut();
        this.isAuthenticated = false;
        this.dataUser = {};
        this.openModalLogin();
        this.router.navigate(['/']);
    }

    public manageRoutes(pos){
        switch(pos) {
            case 1:
                this.router.navigate(['/listall']);
                break;
            case 2:
                this.router.navigate(['/listpost']);
                break;
            default:
                this.router.navigate(['/']);
        }
    }

    // openModal() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = false;
    //     dialogConfig.data = {
    //         id: 1,
    //         title: 'Angular For Beginners'
    //     };
    //     const dialogRef = this.dialog.open(DialogFavouriteComponent, dialogConfig);
    //     dialogRef.afterClosed().subscribe(result => {
    //         alert("response: " + result)
    //     });
    // }

    /*
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogFavouriteComponent, {
            width: '250px',
            data: {name: this.name, animal: this.animal}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }
    */
}