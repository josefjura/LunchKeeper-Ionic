import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ZomatoService } from '../zomato.service'

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  restaurants : any = [];

  constructor(private storage: StorageService, private zomato: ZomatoService) { }

  ngOnInit() {
    this.storage.getRestaurants().then((list) => {
      this.loadRestaurants(list);
    });
  }

  async loadRestaurants(list: Array<number>) {
    for (let id of list) {
      await this.zomato.getRestaurantInfo(id)
        .subscribe(res => {
          this.zomato.getDailyMenu(id).subscribe(res2=>{
            if (res2 && res2.daily_menus){
              res.menu = res2.daily_menus
            }
            console.log(res.menu);
            this.restaurants.push(res);
          }, err2=>{
            console.error(err2);
          });          
        }, err => {
          console.error(err);
        })
    }
  }

}
