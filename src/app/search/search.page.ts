import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ZomatoService } from '../zomato.service'
import { StorageService } from '../storage.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  results: any;
  public searchText: string;
  selected: Array<number>;

  constructor(public api: ZomatoService, public storage: StorageService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.getRestaurants().then((list) => {
      this.selected = list || [];
    })
  }

  subscribe(data) {
    if (!data.isSelected) {
      this.storage.addRestaurant(data.id);
    } else {
      this.storage.removeRestaurant(data.id);
    }

    data.isSelected = !data.isSelected
  }

  onSearch(event: any) {
    this.results = [];
    this.search(this.searchText);
    this.searchText = "";
  }

  async search(keyword: string) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.search(keyword)
      .subscribe(res => {
        this.results = res.restaurants.map((item) => {
          return {
            id: item.restaurant.id,
            name: item.restaurant.name,
            isSelected: this.selected.some((s) => { return s == item.restaurant.id })
          };
        });
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
