import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { Configuration } from './models'

const CONFIG_KEY: string = "CONFIG"

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor(private storage: NativeStorage) {

  }

  public setCityId(cityId: number) {
    this.storage.getItem(CONFIG_KEY).then((config) => {
      let t = <Configuration>config;
      t.cityId = cityId;
      return this.storage.setItem(CONFIG_KEY, t)
    }).catch((err) => {
      console.error(err);
    })
  }

  public getCityId(): Promise<number> {
    return this.storage.getItem(CONFIG_KEY).then((config) => {
      return (<Configuration>config).cityId;
    })
  }
}
