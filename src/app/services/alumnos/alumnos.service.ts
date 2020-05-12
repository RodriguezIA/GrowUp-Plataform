import { Injectable } from '@angular/core';
import { ALUMNO } from '../../models/alumno-interface';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  alumnoListRef: AngularFireList<any>;
  alumnoRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createAlumno(al: ALUMNO) {
    return this.alumnoListRef.push({
      matricula: al.matricula,
      nom: al.nom,
      apP: al.apP,
      apM: al.apM,
      carrera: al.carrera,
      cuatrimestre: al.cuatrimestre,
      grupo: al.grupo,
      estatus: al.estatus,
    })
  }

  // Get Single
  getAlumno(id: string) {
    this.alumnoRef = this.db.object('/alumno/' + id);
    return this.alumnoRef;
  }

  // Get List
  getAlumnoList() {
    this.alumnoListRef = this.db.list('/alumno');
    return this.alumnoListRef;
  }

  // Update
  updateAlumno(id, al: ALUMNO) {
    return this.alumnoRef.update({
      matricula: al.matricula,
      nom: al.nom,
      apP: al.apP,
      apM: al.apM,
      carrera: al.carrera,
      cuatrimestre: al.cuatrimestre,
      grupo: al.grupo,
      estatus: al.estatus,
    })
  }

  // Delete
  deleteAlumno(id: string) {
    this.alumnoRef = this.db.object('/alumno/' + id);
    this.alumnoRef.remove();
  }

}
