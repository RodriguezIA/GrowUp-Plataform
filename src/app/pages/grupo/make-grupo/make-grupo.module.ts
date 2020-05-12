import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeGrupoPageRoutingModule } from './make-grupo-routing.module';

import { MakeGrupoPage } from './make-grupo.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MakeGrupoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MakeGrupoPage]
})
export class MakeGrupoPageModule {}
