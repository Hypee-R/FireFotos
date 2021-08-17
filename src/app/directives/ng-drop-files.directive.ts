import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any){
    this.mouseSobre.emit(true);
    this._prevenirAbrirImagen(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any){
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any){
    const transferencia = this._getTransferecia(event);

    if(!transferencia) return;

    this._extraerArchivos(transferencia.files);

    this._prevenirAbrirImagen(event);
    this.mouseSobre.emit(false);

  }

  private _getTransferecia(event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList){
      console.log(archivosLista);

      for (const propiedad in Object.getOwnPropertyNames( archivosLista )) {
        const archivoTemp = archivosLista[propiedad];

        if(this._archivoPuedeSerCargado(archivoTemp)){

          const newArchivo = new FileItem(archivoTemp);
          this.archivos.push(newArchivo);

        }
      }
  }


  //Validaciones
  private _archivoPuedeSerCargado(archivo: File): boolean{

    if(!this._archivoDropeado(archivo.name) && this.esImagen(archivo.type)){
      return true;
    }else{
      return false;
    }

  }

  private _prevenirAbrirImagen(event: any){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoDropeado(nombreArchivo: string): boolean{

    for (const archivo of this.archivos) {
        if(archivo.nombreArchivo == nombreArchivo){

        }
    }

    return false;
  }

  private esImagen(tipoArchivo: string): boolean{
      return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
