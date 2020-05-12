import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeAlumnoPage } from './make-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: MakeAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeAlumnoPageRoutingModule {}
