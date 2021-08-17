import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class CargaImagenesService {
  private carpetaImagenes = 'img';
  constructor(
    private afireStore: AngularFirestore,
  ) { }

  private guardarImagen(imagen: {nombre: string, url: string}){
    console.log("log antes de guardar");
    console.log(imagen);

    this.afireStore.collection(`/${this.carpetaImagenes}`).add(imagen)
    .then(docRef => console.log('El Documento se grabo con el ID: ', docRef.id))
    .catch(error => console.log('El Documento no se grabo: ', error));
  }

  cargarImagenesFirebase(imagenes: FileItem[]){

    const storageRef = firebase.default.storage().ref();

    for (const item of imagenes) {

      item.subiendo = true;
      if(item.progreso >= 100){
        continue;
      }

      const uploadTask: firebase.default.storage.UploadTask = storageRef.child(`${this.carpetaImagenes}/${item.nombreArchivo}`)
                                .put( item.archivo );

      uploadTask.on( firebase.default.storage.TaskEvent.STATE_CHANGED,
                  (snapshot: firebase.default.storage.UploadTaskSnapshot) =>
                              item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                  (err) => console.error("error al subir ", err),
                  () => {

                    console.log("Imagen cargada correctamente");
                    uploadTask.snapshot.ref.getDownloadURL()
                    .then((url) => {
                      item.url = url;
                      item.subiendo = false;

                      this.guardarImagen({
                        nombre: item.nombreArchivo,
                        url: item.url
                      });
                    });

                  });

    }

  }
}
