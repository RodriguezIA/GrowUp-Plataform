import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeGrupoPage } from './make-grupo.page';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MakeGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ComponentsModule],
  exports: [RouterModule],
})
export class MakeGrupoPageRoutingModule {}
