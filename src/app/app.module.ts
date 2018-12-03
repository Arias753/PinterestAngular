import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AuthenticationService } from './services/authentication.service';
import { FirebaseService } from './services/firebase.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListAllComponent } from './list-all/list-all.component';
import { ListPostComponent } from './list-post/list-post.component';
import { FormPostComponent } from './form-post/form-post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { DialogFavouriteComponent } from './dialog-favourite/dialog-favourite.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

const appRoutes:Routes = [
	{path: '', component: HomeComponent},
	{path: 'listall', component: ListAllComponent},
	{path: 'listpost', component: ListPostComponent},
	{path: 'formpost/:status', component: FormPostComponent},
	{path: 'detailpost/:id', component: DetailPostComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ListAllComponent,
        ListPostComponent,
        FormPostComponent,
        DetailPostComponent,
        DialogFavouriteComponent,
        DialogLoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule
    ],
    providers: [AuthenticationService, FirebaseService],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogLoginComponent,
        DialogFavouriteComponent
    ]
})
export class AppModule { }
