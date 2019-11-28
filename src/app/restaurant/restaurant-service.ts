import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Company} from '../model/company.model';
import {Restaurant} from '../model/restaurant.model';

@Injectable({providedIn: 'root'})
export class RestaurantService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  getAllRestaurants(): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/restaurants');
  }

  getRestaurant(id: number): Observable<any> {
    return this.httpClient.get<Company>('https://localhost:8080/main/restaurant/' + id);
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

  getLogo(id: number): Observable<Blob> {
    return this.httpClient.get<Blob>('https://localhost:8080/main/restaurant/' + id + '/logo', {
      responseType: 'blob' as 'json' });
  }

}
