import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { IonRefresher, ModalController, Platform } from '@ionic/angular';
import { NewTeasePage } from '../new-tease/new-tease.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  teases: string[];

  constructor(
    private file: File,
    private platform: Platform,
    private modalController: ModalController,
  ) { }

  async ngOnInit() {
    this.setTeases();
  }

  async setTeases(refresher?: IonRefresher) {
    let retry = 0;
    while (retry < 5) {
      const dataDir = this.file.externalRootDirectory;
      const dirs = await this.file.listDir(dataDir, 'Teases');
      console.log(dirs);
      if (dirs) {
        this.teases = dirs.map(value => value.name);
        break;
      } else {
        retry++;
        await new Promise(res => setTimeout(res, 1000));
      }
    }
    if (refresher) {
      refresher.complete();
    }
  }

  async newTease() {
    const modal = await this.modalController.create({
      component: NewTeasePage,
    });
    modal.componentProps = {
      modal,
    };
    return await modal.present();
  }

  loadTease(name: string) {
    throw new Error('Method not implemented.');
  }

  deleteTease(name: string) {
    throw new Error('Method not implemented.');
  }

  openSettings() {
    throw new Error('Method not implemented.');
  }

}
