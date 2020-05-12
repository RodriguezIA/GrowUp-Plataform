import { Component, OnInit } from '@angular/core';
import { COURSE } from '../../../models/curso-interface';
import { CourseService } from '../../../services/course/course.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserInterface } from '../../../models/user-interface';


@Component({
  selector: 'app-make-alumno',
  templateUrl: './make-alumno.page.html',
  styleUrls: ['./make-alumno.page.scss'],
})
export class MakeAlumnoPage implements OnInit {

  public isLogged: boolean = false;
  public photo: boolean = false;
  public providerId: string = 'null';



  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  courses: COURSE[];

  constructor(
    private cs: CourseService,
    private as: AuthService,
    private af: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.cs.getCourses().subscribe((courses) => {
      console.log('Courses', courses);
      this.courses = courses;
    })
  }

  onRemove(idTask: string) {
    this.cs.removeCourse(idTask);
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
