import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ZomatoService } from '../zomato.service'
import { StorageService } from '../storage.service'
import { RestaurantInfoViewModel } from '../models';

@Component({
  selector: 'app-zomato',
  templateUrl: './zomato.page.html',
  styleUrls: ['./zomato.page.scss'],
})
export class ZomatoPage implements OnInit {

  results: RestaurantInfoViewModel[];
  public searchText: string;
  selected: Array<number>;

  constructor(public api: ZomatoService, public storage: StorageService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.getRestaurants().then((list) => {
      this.selected = list || [];
    })
  }

  subscribe(data) {
    if (data.isSelected) {
      this.storage.addRestaurant(data.id)
    }
    else {
      this.storage.removeRestaurant(data.id);
    }
  }

  onSearch() {
    this.results = [];
    this.search(this.searchText);
    this.searchText = "";
  }

  async search(keyword: string) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.search(84, keyword)
      .subscribe(res => {
        this.results = res.restaurants.map((item) => {
          var vm = new RestaurantInfoViewModel(); 
          vm.id = item.id;
          vm.name = item.name;
          vm.thumb = item.thumb;
          vm.isSelected = this.selected.some(s => vm.id == s);
          return vm;
        });
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
