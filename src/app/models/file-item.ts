export class FileItem{
  public archivo: File;
  public nombreArchivo: string;
  public url: string | any;
  public subiendo: boolean;
  public progreso: number;

  constructor(archivo: File){
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
    this.url = '';
    this.subiendo = false;
    this.progreso = 0;
  }
}

export class IMG{
  nombre: string;
  url: string;

  constructor(nom: string, url: string){
    this.nombre = nom;
    this.url = url;
  }

}
