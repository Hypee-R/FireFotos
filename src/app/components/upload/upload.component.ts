import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  sobreDrop: boolean = false;
  archivos: FileItem[] = [];
  constructor(
    private cargaImagenesService: CargaImagenesService
  ) { }

  ngOnInit(): void {
  }

  cargarImagenes(){

    this.cargaImagenesService.cargarImagenesFirebase(this.archivos);
  }

  sobreElemento(event: any){
    this.sobreDrop = event;
  }

  limpiarArchivos(){
    this.archivos = [];
  }

}
