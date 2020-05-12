import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAlumnoPageRoutingModule } from './edit-alumno-routing.module';

import { EditAlumnoPage } from './edit-alumno.page';
import {ComponentsModule} from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    EditAlumnoPageRoutingModule
  ],
  declarations: [EditAlumnoPage]
})
export class EditAlumnoPageModule {}
