import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

const REST_KEY: string = "REST_LIST";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { }

  getRestaurants(): Promise<Array<number>> {
    return this.storage.get(REST_KEY);
  }

  private setRestaurants(restList: Array<number>) {
    this.storage.set(REST_KEY, restList);
  }

  addRestaurant(int: number) {
    this.getRestaurants().then((val) => {
      val = val || [];
      val.push(int);
      this.setRestaurants(val);
    });;
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
    });;
  }
}
