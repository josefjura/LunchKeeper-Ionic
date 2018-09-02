import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ZomatoService } from '../zomato.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  results: any;
  public searchText: string;

  constructor(public api: ZomatoService, public loadingController: LoadingController) { }

  ngOnInit() {
    
  }

  onSearch(event: any){
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
        this.results = res.restaurants;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
