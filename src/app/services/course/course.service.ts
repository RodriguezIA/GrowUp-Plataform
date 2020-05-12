import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COURSE } from '../../models/curso-interface';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private coursesCollection: AngularFirestoreCollection<COURSE>;
  private courses: Observable<COURSE[]>;

  constructor(db: AngularFirestore) {
    this.coursesCollection = db.collection<COURSE>('Courses');
    this.courses = this.coursesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  getCourses() {
    return this.courses;
  }

  getCourse(id: string) {
    return this.coursesCollection.doc<COURSE>(id).valueChanges();
  }

  updateCourse(c: COURSE, id: string) {
    return this.coursesCollection.doc(id).update(c);
  }

  addCourse(c: COURSE) {
    return this.coursesCollection.add(c);
  }

  async removeCourse(id: string) {
    return this.coursesCollection.doc(id).delete();
  }
}
