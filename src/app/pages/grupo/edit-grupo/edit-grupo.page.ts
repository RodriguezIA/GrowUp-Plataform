import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { COURSE } from '../../../models/curso-interface';
import { CourseService } from '../../../services/course/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from '../../../models/user-interface';
import { AuthService } from '../../../services/auth/auth.service';




@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.page.html',
  styleUrls: ['./edit-grupo.page.scss'],
})
export class EditGrupoPage implements OnInit {

  public isLogged: boolean = false;
  public photo: boolean = false;



  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  public providerId: string = 'null';

  course: COURSE = {
   img: '',
   autor: '',
   titulo: '',
   tituloExtend: '',
   duracion: 0,
   nivel: '',
   descripcion: '',
   acercaDe: '',
   costo: 0,
   video: '',
   transcripcionVideo: '',
 }

  courseId = null;

  vid = null;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private cs: CourseService,
    private toastc: ToastController,
    private alertctrl: AlertController,
    private dom: DomSanitizer,
    private as: AuthService,
    private af: AngularFireAuth,
    private router: Router
  ){}

  ngOnInit(){
    this.getCurrentUser();
    this.courseId = this.route.snapshot.params['id'];
    this.vid = this.course.video;
    if (this.courseId) {
      console.log('Arrive');
      this.loadCourse();
    }
  }

  getCurrentUser() {
    this.as.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        console.log(auth);
        this.isLogged = true;
        this.user.name = auth.displayName;
        this.user.email = auth.email;
        this.user.photoUrl = auth.photoURL;
        this.providerId = auth.providerData[0].providerId;
        if (auth.photoURL == null) {
          this.photo = false;
        } else {
          this.photo = true;
        }

      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.as.logoutUser();
    this.router.navigate(['/home']);
  }

  loadCourse() {
    this.cs.getCourse(this.courseId).subscribe(res => {
      console.log(res);
      this.course = res;
      this.vid = this.course.video;
      console.log(this.vid);
    });
  }

  sanitize(vid){
    return this.dom.bypassSecurityTrustResourceUrl(vid);
  }

  async saveCourse() {

    const toast = await this.toastc.create({
      message: 'Guardado.',
      position: 'middle',
      duration: 1500,
      color: 'primary',
      translucent: true
    });

    if (this.courseId) {
      this.cs.updateCourse(this.course, this.courseId).then(() => {
        this.nav.navigateForward('/');
      });
    }
    else {
      this.cs.addCourse(this.course).then(() => {
        toast.present();
        this.nav.navigateForward('/');
      });
    }
  }

  async removeCourse(courseId: string) {

    const alert = await this.alertctrl.create({
      header: 'Seguro que deseas eliminar!',
      message: 'Curso:' + this.course.titulo,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            this.cs.removeCourse(courseId);
            // this.toastc.present();
          }
        }
      ]
    });
    await alert.present();
  }
}
