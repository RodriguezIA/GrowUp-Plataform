import { Component, OnInit } from '@angular/core';
import { ALUMNO } from '../../models/alumno-interface';
import { AlumnosService } from '../../services/alumnos/alumnos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  Alumnos = [];

  constructor(
    private as: AlumnosService,
    private alertctrl: AlertController
  ) { }

  ngOnInit() {

  }



}
