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
  RESTAURANTS_BASE_URL = 'https://localhost:8080/main/restaurants';

  restaurantItemSubject = new BehaviorSubject<Restaurant>(null);

  constructor(private httpClient: HttpClient) {
  }

  getAllRestaurants(): Observable<any> {
    return this.httpClient.get(this.RESTAURANTS_BASE_URL + '/');
  }

  getRestaurant(id: number): Observable<any> {
    return this.httpClient.get<RestaurantItem>(this.RESTAURANTS_BASE_URL + '/' + id)
      .pipe(tap(response => {
        this.handleRestaurantResponse(response.id, response.name, response.address, response.phoneNumber,
          response.restaurantAccountDetails);
      }));
  }

  addRestaurant(restaurant: Restaurant): Observable<any> {
    return this.httpClient.post(this.RESTAURANTS_BASE_URL + '/new', restaurant);
  }

  editRestaurant(restaurant: Restaurant): Observable<any> {
    return this.httpClient.put(this.RESTAURANTS_BASE_URL + '/edit', restaurant);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.httpClient.delete(this.RESTAURANTS_BASE_URL + '/' + id + '/delete');
  }

  uploadFile(file: File, restaurantId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.RESTAURANTS_BASE_URL + '/' + +restaurantId + '/uploadLogo', formData);
  }

  addAccountForRestaurant(restaurantId: number, restaurantAccount: RestaurantAccount): Observable<any> {
    return this.httpClient.post(this.RESTAURANTS_BASE_URL + '/' + restaurantId + '/account/add',
      restaurantAccount);
  }

  handleRestaurantResponse(id: number, name: string, email: string, phoneNumber: string,
                           restaurantAccountDetails: RestaurantAccountDetails) {
    const restaurantItem = new RestaurantItem(id, name, email, phoneNumber, restaurantAccountDetails);
    this.restaurantItemSubject.next(restaurantItem);
  }

  getRestaurantsForCompany(id: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/companies/' + id + '/restaurants');
  }

  deleteRestaurantForCompany(companyId: any, restaurantId: number) {
    return this.httpClient
      .delete('https://localhost:8080/main/companies/' + companyId + '/restaurants/' + restaurantId + '/delete');
  }

  getAvailableRestaurantsForCompany(companyId: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/companies/' + companyId + '/available-restaurants');
  }
}
