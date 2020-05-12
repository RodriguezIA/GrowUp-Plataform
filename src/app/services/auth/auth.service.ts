import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user-interface';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afu: AngularFireAuth){}

  registerUser(email: string, pass: string){
    return new Promise((resolve, reaject) => {
      this.afu.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err => reaject(err));
    });
  }

  loginEmailUser(email: string, pass: string){
    return new Promise((resolve, reject) => {
      this.afu.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), 
        err => reject(err));
    });
  }

  loginFacebookUser(){
    return this.afu.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  loginGoogleUser(){
   return this.afu.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logoutUser(){
   return this.afu.auth.signOut();
  }

  isAuth(){
    return this.afu.authState.pipe(map(auth => auth));
  }


}
