import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HomeService {

  constructor(private httpClient: HttpClient) {}

  getRestaurantsForUser(userId: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/restaurants/users/' + userId);
  }

}
