import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGrupoPageRoutingModule } from './edit-grupo-routing.module';

import { EditGrupoPage } from './edit-grupo.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    EditGrupoPageRoutingModule
  ],
  declarations: [EditGrupoPage]
})
export class EditGrupoPageModule {}
