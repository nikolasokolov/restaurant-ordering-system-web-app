import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MenuItem} from '../model/menu-item.model';

@Injectable({providedIn: 'root'})
export class RestaurantMenuManagementService {
  MENU_ITEMS_BASE_URL = 'https://localhost:8080/main/menu-items';

  constructor(private httpClient: HttpClient) {}

  getRestaurantMenuItems(restaurantId: any): Observable<any> {
    return this.httpClient.get(this.MENU_ITEMS_BASE_URL + '/users/' + restaurantId + '');
  }

  deleteMenuItem(id: number): Observable<any> {
    return this.httpClient.delete(this.MENU_ITEMS_BASE_URL + '/' + id + '/delete');
  }

  addMenuItem(menuItem: MenuItem, userId: number): Observable<any> {
    return this.httpClient.post(this.MENU_ITEMS_BASE_URL + '/add/users/' + userId, menuItem);
  }

  editMenuItem(menuItem: MenuItem, userId: number): Observable<any> {
    return this.httpClient.put(this.MENU_ITEMS_BASE_URL + '/update/users/' + userId, menuItem);
  }

  getMenuItem(id: number): Observable<any> {
    return this.httpClient.get(this.MENU_ITEMS_BASE_URL + '/' + id);
  }

  getRestaurantMenu(restaurantId: number): Observable<any> {
    return this.httpClient.get(this.MENU_ITEMS_BASE_URL + '/restaurants/' + restaurantId);
  }
}
