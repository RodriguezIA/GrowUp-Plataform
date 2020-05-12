import { Injectable } from '@angular/core';
import { GRUPO } from '../../models/grupo-interface';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  grupoListRef: AngularFireList<any>;
  grupoRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Crear grupo
  createGrupo(gr: GRUPO) {
    return this.grupoListRef.push({
      carrera: gr.carrera,
      cuatrimestre: gr.cuatrimestre,
      grupo: gr.grupo
    })
  }

  // Get Single grupo
  getGrupo(id: string) {
    this.grupoRef = this.db.object('/grupo/' + id);
    return this.grupoRef;
  }

  // Get List grupo
  getGrupoList() {
    this.grupoListRef = this.db.list('/grupo');
    return this.grupoListRef;
  }

  // Update grupo
  updateGrupo(id, gr: GRUPO) {
    return this.grupoRef.update({
      carrera: gr.carrera,
      cuatrimestre: gr.cuatrimestre,
      grupo: gr.grupo
    })
  }

  // Delete grupo
  deleteGrupo(id: string) {
    this.grupoRef = this.db.object('/grupo/' + id);
    this.grupoRef.remove();
  }
}
