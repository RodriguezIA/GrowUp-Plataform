import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private as: AuthService,
    private storage: AngularFireStorage,
    private toastc: ToastController
  ) { }

  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;
  public email: string = '';
  public pass: string = '';


  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onUpload(e){
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize (() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  async onRegister(){
    const toastA = await this.toastc.create({
      message: 'Registrado.',
      position: 'middle',
      duration: 1500,
      color: 'success',
      translucent: true
    });

    const toastB = await this.toastc.create({
      message: 'Error esta cuenta ya esta usada o la contraseña tiene menos de 6 caracteres.',
      position: 'middle',
      duration: 3000,
      color: 'danger',
      translucent: true
    });

    this.as.registerUser(this.email, this.pass)
      .then((res) => {
        this.as.isAuth().subscribe(user => {
        console.log(user);
          // tslint:disable-next-line:align
          if (user) {
            user.updateProfile({
              displayName: '',
            }).then(() => {
              this.router.navigate(['/home']);
              toastA.present();
            }).catch((error) => {
              alert(error);
              console.log('error', error); 
            });
          }
        });
      }).catch(err => {
        alert(err.message);
        console.log('err', err.message)
      });
  }

  onLogin(): void {
    console.log('email: ', this.email);
    console.log('pass: ', this.pass);
    this.as.loginEmailUser(this.email, this.pass)
      .then((res) => {
        this.router.navigate(['/home']);
      }).catch(err => console.log('Error: ', err.message));
  }

  onLoginGoogle(): void {
    this.as.loginGoogleUser().then((res) => {
      console.log('ResUser:', res);
      this.router.navigate(['/home']);
    }).catch((err) => console.log('Erro: ', err.message));
  }

  onLoginFacebook() {
    this.as.loginFacebookUser().then((res) => {
      console.log('ResUser:', res);
      this.router.navigate(['/home']);
    }).catch((err) => console.log('Erro: ', err.message));
  }

  onLogout() {
    this.as.logoutUser();
    this.router.navigate(['/home']);
  }
}