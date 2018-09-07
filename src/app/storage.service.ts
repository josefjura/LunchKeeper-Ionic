import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx'

const REST_KEY: string = "REST_LIST";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: NativeStorage) { }

  getRestaurants(): Promise<Array<number>> {
    return this.storage.getItem(REST_KEY).catch((err)=>{
      console.error(err);
    });
  }

  private setRestaurants(restList: Array<number>) {
    this.storage.setItem(REST_KEY, restList).catch((err)=>{
      console.error(err);
    });
  }

  addRestaurant(int: number) {
    this.getRestaurants().then((val) => {
      val = val || [];
      val.push(int);
      this.setRestaurants(val);
    }).catch((err)=>{
      console.error(err);
    });
  }

  removeRestaurant(int: number) {
    this.getRestaurants().then((val) => {
      val = val || [];
      console.log(val)
      var index = val.indexOf(5);
      if (index > -1) {
        val.splice(index, 1);
      }
      this.setRestaurants(val);
    }).catch((err)=>{
      console.error(err);
    });
  }
}
