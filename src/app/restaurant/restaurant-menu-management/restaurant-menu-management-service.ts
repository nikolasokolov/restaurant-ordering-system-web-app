import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class RestaurantMenuManagementService {
  constructor(private httpClient: HttpClient) {}

  getRestaurantMenuItems(restaurantId: any): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/restaurant/' + restaurantId + '/menu-items');
  }

  deleteMenuItem(id: number): Observable<any> {
    return this.httpClient.delete('https://localhost:8080/main/restaurant/menu-item/' + id);
  }
}
