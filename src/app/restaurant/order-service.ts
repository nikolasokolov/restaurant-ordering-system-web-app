import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderRequest} from '../model/order-request.model';

@Injectable({providedIn: 'root'})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  submitOrder(orderRequest: OrderRequest): Observable<any> {
    return this.httpClient.post('https://localhost:8080/main/orders/save', orderRequest);
  }

  getUserOrder(userId: any, restaurantId: any): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/orders/user/' + userId);
  }

  cancelOrder(id: number): Observable<any> {
    return this.httpClient.delete('https://localhost:8080/main/orders/' + id + '/delete');
  }

  getCompanyOrders(companyId: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/orders/company/' + companyId);
  }

  getDailyCompanyOrders(companyId: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/daily-orders/company/' + companyId);
  }

  getDailyOrdersForRestaurant(restaurantAccountId: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/daily-orders/restaurant/' + restaurantAccountId);
  }
}
