import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {
  SearchResult,
  DailyMenu,
  Dish,
  RestaurantInfo,
  RestaurantDetail
} from './models'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'user-key': '7801edd0712e8d74b9947053e48a9f1a' })
};
const apiUrl = "https://developers.zomato.com/api/v2.1";

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  search(keyword: string): Observable<SearchResult> {
    const url = `${apiUrl}/search?entity_id=84&entity_type=city&q=${keyword}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.mapSearchResults),
      catchError(this.handleError));
  }

  private mapSearchResults(input: any): SearchResult {
    var results = input.restaurants.map((item) => {
      return {
        name: item.restaurant.name,
        id: item.restaurant.id
      };
    });

    return {
      restaurants : results
    }
  }

  getRestaurantInfo(id: number): Observable<RestaurantInfo> {
    const url = `${apiUrl}/restaurant?res_id=${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.mapRestaurantInfo),
      catchError(this.handleError));
  }

  private mapRestaurantInfo(input: any): RestaurantInfo {
    return {
      name: input.name,
      id: input.id,
      thumb: input.thumb
    };
  }

  getDailyMenu(id: number): Observable<DailyMenu[]> {
    const url = `${apiUrl}/dailymenu?res_id=${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.mapRestaurantDetail),
      catchError(error => {
        if (error.status == 400) return of(null);
        return this.handleError(error);
      })
    );
  }

  private mapRestaurantDetail(input: any): DailyMenu[] {
    return input.daily_menus.map((item)=>{
      return {
        name : item.daily_menu.name,
        dishes: item.daily_menu.dishes.map((inner)=>{
          return {
            name : inner.dish.name,
            price : inner.dish.price
          }
        })
      }
    });
  }
}