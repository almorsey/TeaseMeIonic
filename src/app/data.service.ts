import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataDir: string;
  teasesFolderName: string;

  constructor(
    private file: File,
  ) {
    this.dataDir = file.externalRootDirectory; // TODO: For browser
    this.teasesFolderName = 'Teases';
  }
}
