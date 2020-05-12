import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user-interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string = '';
  public pass: string = '';

  constructor(
    public afAuth: AngularFireAuth, 
    private router: Router,
    private as: AuthService
    ) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.as.loginEmailUser(this.email, this.pass)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle(): void {
    this.as.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLoginFacebook(){
    this.as.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLogout(){
    this.as.logoutUser();
    this.router.navigate(['/home']);
  }

  onLoginRedirect(): void {
    this.router.navigate(['/home']);
  }

}