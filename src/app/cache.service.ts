import { Injectable } from '@angular/core';

import { DailyMenu, RestaurantInfo } from './models'

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public restaurants: any = {};
  public menus: any = {};

  constructor() { }

  cacheRestaurant(r: RestaurantInfo) {
    this.restaurants[r.id] = r;
  }

  getRestaurant(id: number): RestaurantInfo {
    if (this.restaurants[id]) {
      return this.restaurants[id];
    } else return null;
  }

  cacheMenus(id: number, r: DailyMenu[]) {
    this.menus[id] = r;
  }

  getMenus(id: number): DailyMenu[] {
    if (this.menus[id]) {
      return this.menus[id];
    } else return null;
  }

}
