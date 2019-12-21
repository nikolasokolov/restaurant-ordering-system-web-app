import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MenuItem} from '../../model/menu-item.model';

@Injectable({providedIn: 'root'})
export class RestaurantMenuManagementService {
  constructor(private httpClient: HttpClient) {}

  getRestaurantMenuItems(restaurantId: any): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/restaurant/' + restaurantId + '/menu-items');
  }

  deleteMenuItem(id: number): Observable<any> {
    return this.httpClient.delete('https://localhost:8080/main/restaurant/menu-items/' + id + '/delete');
  }

  addMenuItem(menuItem: MenuItem, userId: number): Observable<any> {
    return this.httpClient.post('https://localhost:8080/main/restaurant/' + userId + '/menu-items/add', menuItem);
  }

  editMenuItem(menuItem: MenuItem, userId: number): Observable<any> {
    return this.httpClient.put('https://localhost:8080/main/restaurant/' + userId + '/menu-items/update', menuItem);
  }

  getMenuItem(id: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/restaurant/menu-items/' + id);
  }
}
