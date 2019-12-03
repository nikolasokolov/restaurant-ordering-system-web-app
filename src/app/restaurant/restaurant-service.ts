import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Restaurant} from '../model/restaurant.model';
import {RestaurantAccount} from '../model/restaurant-account.model';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RestaurantService {
  restaurantSubject = new BehaviorSubject<Restaurant>(null);
  restaurantAccountSubject = new BehaviorSubject<RestaurantAccount>(this.getRestaurantAccount());

  constructor(private httpClient: HttpClient) {}

  getAllRestaurants(): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/restaurants');
  }

  getRestaurant(id: number): Observable<any> {
    return this.httpClient.get<Restaurant>('https://localhost:8080/main/restaurant/' + id).pipe(tap(response => {
      this.handleRestaurantResponse(response.id, response.name, response.address, response.phoneNumber);
    }));
  }

  addRestaurant(restaurant: Restaurant): Observable<any> {
    return this.httpClient.post('https://localhost:8080/main/restaurant/new', restaurant);
  }

  editRestaurant(restaurant: Restaurant): Observable<any> {
    return this.httpClient.put('https://localhost:8080/main/restaurant/edit', restaurant);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.httpClient.delete('https://localhost:8080/main/restaurant/' + id + '/delete');
  }

  uploadFile(file: File, restaurantId: number): Observable<any> {
    const url = 'https://localhost:8080/main/restaurant/' + restaurantId + '/uploadLogo/';
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(url , formData);
  }

  addAccountForRestaurant(restaurantId: number, restaurantAccount: RestaurantAccount): Observable<any> {
    return this.httpClient.post('https://localhost:8080/main/restaurant/' + restaurantId + '/account/add',
      restaurantAccount).pipe(tap(response => {
        this.handleRestaurantAccountResponse(response.username, response.email);
    }));
  }

  handleRestaurantResponse(id: number, name: string, email: string, phoneNumber: string) {
    const restaurant = new Restaurant(name, email, phoneNumber, id);
    this.restaurantSubject.next(restaurant);
  }

  handleRestaurantAccountResponse(username: string, email: string) {
    const restaurantAccount = new RestaurantAccount(username, email, null, null);
    this.restaurantAccountSubject.next(restaurantAccount);
    localStorage.setItem('restaurantAccount', JSON.stringify(restaurantAccount));
  }

  getRestaurantAccount() {
    return JSON.parse(localStorage.getItem('restaurantAccount'));
  }

}
