import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurants',
    pathMatch: 'full'
  },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'restaurants', loadChildren: './restaurants/restaurants.module#RestaurantsPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
