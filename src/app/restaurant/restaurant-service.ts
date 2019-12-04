import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Restaurant} from '../model/restaurant.model';
import {RestaurantAccount} from '../model/restaurant-account.model';
import {tap} from 'rxjs/operators';
import {RestaurantItem} from '../model/restaurant-item.model';
import {RestaurantAccountDetails} from '../model/restaurant-account-details.model';

@Injectable({providedIn: 'root'})
export class RestaurantService {
  restaurantItemSubject = new BehaviorSubject<Restaurant>(null);

  constructor(private httpClient: HttpClient) {}

  getAllRestaurants(): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/restaurants');
  }

  getRestaurant(id: number): Observable<any> {
    return this.httpClient.get<RestaurantItem>('https://localhost:8080/main/restaurant/' + id).pipe(tap(response => {
      this.handleRestaurantResponse(response.id, response.name, response.address, response.phoneNumber,
        response.restaurantAccountDetails);
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
      restaurantAccount);
  }

  handleRestaurantResponse(id: number, name: string, email: string, phoneNumber: string,
                           restaurantAccountDetails: RestaurantAccountDetails) {
    const restaurantItem = new RestaurantItem(id, name, email, phoneNumber, restaurantAccountDetails);
    this.restaurantItemSubject.next(restaurantItem);
  }

}
