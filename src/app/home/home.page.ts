import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { IonRefresher, ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
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
    private data: DataService,
    private modalController: ModalController,
  ) { }

  async ngOnInit() {
    this.refreshTeases();
  }

  async refreshTeases(refresher?: IonRefresher) {
    let retry = 0;
    while (retry < 5) {
      const exists = await this.file.checkDir(this.data.dataDir, this.data.teasesFolderName).catch(() => false);
      if (!exists) {
        break;
      }
      const dirs = await this.file.listDir(this.data.dataDir, this.data.teasesFolderName);
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
    await modal.present();
    await modal.onDidDismiss();
    this.refreshTeases();
  }

  loadTease(name: string) {
    throw new Error('Method not implemented.');
  }

  async deleteTease(name: string) {
    // const media = await this.file.listDir(`${this.data.dataDir}${this.data.teasesFolderName}/${name}`, 'media');
    // for (const entry of media) {
    //   entry.remove(() => {});
    // }
    await this.file.removeRecursively(this.data.dataDir + this.data.teasesFolderName, name);
    this.refreshTeases();
  }

  openSettings() {
    throw new Error('Method not implemented.');
  }

}
