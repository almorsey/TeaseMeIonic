import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-tease',
  templateUrl: './new-tease.page.html',
  styleUrls: ['./new-tease.page.scss'],
})
export class NewTeasePage implements OnInit {

  @Input() modal: ModalController;
  @ViewChild('teaseForm') teaseForm: NgForm;
  url: string;
  downloading = false;
  progressValue = 0;
  progressType = 'indeterminate';

  constructor(
    private http: HttpClient,
    private file: File,
    private data: DataService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.url = 'https://milovana.com/webteases/showtease.php?id=41730';
      // setTimeout(() => {
      //   this.downloadTease(this.teaseForm);
      // }, 100);
    }, 100);
  }

  async downloadTease(form: NgForm) {
    this.downloading = true;
    this.progressValue = 0;
    const teaseId = idFromUrl(form.value.url.trim());
    const teasePage = await this.http.get(
      `https://cors-anywhere.herokuapp.com/https://milovana.com/webteases/showtease.php?id=${teaseId}`, {
        responseType: 'text'
      })
      // .pipe(catchError(val => of(val)))
      .toPromise();
    try {
      const title = teasePage.match(/data-title="(.+)"/)[1].replace(/[^a-zA-Z1-9\s]/g, '');
      const authorId = teasePage.match(/data-author-id="(.+)"/)[1];
      const author = teasePage.match(/data-author="(.+)"/)[1];
      const teaseScript: any = await this.http.get(
        `https://cors-anywhere.herokuapp.com/https://milovana.com/webteases/geteosscript.php?id=${teaseId}`)
        // .pipe(catchError(val => of(val)))
        .toPromise();
      await this.file.createDir(this.data.dataDir, this.data.teasesFolderName, false).catch(() => { });
      await this.file.createDir(this.data.dataDir + this.data.teasesFolderName, title, true).catch(() => { });
      await this.file.createDir(`${this.data.dataDir}${this.data.teasesFolderName}/${title}`, 'media', false).catch(() => { });
      const filenames = Object.keys(teaseScript.files);
      let filesDone = 0;
      this.progressType = 'determinate';
      filenames.forEach(filename => this.downloadFile(authorId, teaseId, title, filename).then(() => {
        filesDone++;
        this.progressValue = filesDone / filenames.length;
        if (this.progressValue === 1) {
          this.progressType = 'indeterminate';
          this.downloading = false;
        }
      }));
      await this.file.createFile(`${this.data.dataDir}${this.data.teasesFolderName}/${title}`, 'script.json', true).catch(reason => {
        console.error('createFile script');
        console.log(reason);
      });
      await this.file.writeFile(`${this.data.dataDir}${this.data.teasesFolderName}/${title}`, 'script.json', teaseScript, {
        replace: true,
      }).catch(reason => {
        console.error('createFile script');
        console.log(reason);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async downloadFile(authorId: string, teaseId: string, title: string, filename: string) {
    const response = await this.http.get(
      `https://cors-anywhere.herokuapp.com/https://milovana.com/media/get.php?folder=${authorId}/${teaseId}&name=${filename}`, {
        responseType: 'blob',
      })
      // .pipe(catchError(val => of(val)))
      .toPromise();
    await this.file.createFile(`${this.data.dataDir}${this.data.teasesFolderName}/${title}/media`, filename, true).catch(reason => {
      console.error('createFile');
      console.log(reason);
    });
    await this.file.writeFile(`${this.data.dataDir}${this.data.teasesFolderName}/${title}/media`, filename, response, {
      replace: true,
    }).catch(reason => {
      console.error('writeFile');
      console.log(reason);
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

}

function idFromUrl(url: string) {
  return url.match(/.*?id=(\d+)/)[1];
}
