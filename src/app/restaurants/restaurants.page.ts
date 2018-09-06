import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ZomatoService } from '../zomato.service'
import { RestaurantDetail } from '../models';

import { forkJoin } from 'rxjs'
import { flatMap, map, first } from 'rxjs/operators'
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  restaurants: RestaurantDetail[] = [];

  constructor(private storage: StorageService, private zomato: ZomatoService) { }

  ngOnInit() {
    this.storage.getRestaurants().then((list) => {
      this.loadRestaurants(list || []);
    });
  }

  async loadRestaurants(list: Array<number>) {
    for (let id of list) {
      var user: RestaurantDetail = null;

      await forkJoin(this.zomato.getRestaurantInfo(id), this.zomato.getDailyMenu(id)).pipe(
        map(([first, second]) => {
          var result: RestaurantDetail = <RestaurantDetail>first;
          result.menus = second;
          return result;
        })
      ).subscribe(
        (some) => {
          this.restaurants.push(some);
        }
      )
    }
  }

}
