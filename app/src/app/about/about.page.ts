import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public version: string;

  constructor(private platform: Platform, private appVersion: AppVersion) {
    this.platform.ready().then(() => {
      return this.appVersion.getVersionNumber()
    }).then((result) => {
      this.version = result;
    }).catch((err)=>{
      console.error(err);
    });
  }

  ngOnInit() {
  }

}