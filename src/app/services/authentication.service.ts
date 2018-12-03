import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public dataUser:any = {};

    constructor(private db:AngularFireDatabase, private angularFireAuth:AngularFireAuth, private storage:AngularFireStorage, private router:Router) {}

    // Metodo para iniciar sesion
    public signIn = (dataLogin, dialogRef) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
            .then((response) => {
                this.router.navigate(['/listall']);
                dialogRef.close();
            })
            .catch((error) => {
                // console.log(error);
                alert('El usuario no esta registrado.');
            });
    }

    // Metodo para cerrar sesion
    public signOut(){
        this.angularFireAuth.auth.signOut();
        this.router.navigate(['/']);
    }

    // Metodo para registrar usuario
    public register = (dataRegister, eventImage, dialogRef) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(dataRegister.email, dataRegister.password)
            .then((response) => {
                dataRegister.id = response.user.uid;
                this.createUser(dataRegister, eventImage, dialogRef);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public createUser(dataRegister, eventImage, dialogRef){
        const file = eventImage.target.files[0];
        const filePath = 'images/'+dataRegister.id;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        task.snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe(url => {
                    dataRegister.avatar = url;
                    this.db.database.ref('datos/usuarios/'+dataRegister.id).set(dataRegister);
                    dialogRef.close();
                    this.router.navigate(['/listall']);
                })
            })
        ).subscribe();
    }

    // Metodo para obtener los datos del usuario
    // public getDataUserSession(){
    //     return this.angularFireAuth.auth;
    // }

    // Metodo para obtener todos los datos de un usuario
    public getDataUserGeneral(id){
        return this.db.object('datos/usuarios/'+id);
    }

    // Metodo para validar si el usuario esta autenticado
    public isAuthenticated(){
        return this.angularFireAuth.authState;
    }

    public setDataUser(data){
        this.dataUser = data;
    }
    
    public getDataUser() {
        return this.dataUser;
    }
}
