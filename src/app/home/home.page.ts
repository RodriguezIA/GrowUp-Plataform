import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../models/user-interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public isLogged: boolean = false;
  public photo: boolean = false;



  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  public providerId: string = 'null';

  constructor(
    private as: AuthService,
    private af: AngularFireAuth,
    private router: Router
  ) {  }

  ngOnInit(){
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.as.isAuth().subscribe( auth => {
      if(auth){
        console.log('user logged');
        console.log(auth);
        this.isLogged = true;
        this.user.name = auth.displayName;
        this.user.email = auth.email;
        this.user.photoUrl = auth.photoURL;
        this.providerId = auth.providerData[0].providerId;
        if(auth.photoURL == null){
          this.photo = false;
        }else{
          this.photo = true;
        }

      } else{
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.as.logoutUser();
    this.router.navigate(['/home']);
  }

}
