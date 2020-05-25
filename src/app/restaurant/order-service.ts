import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderRequest} from '../model/order-request.model';

@Injectable({providedIn: 'root'})
export class OrderService {
  ORDERS_BASE_URL = 'https://localhost:8080/main/orders';

  constructor(private httpClient: HttpClient) {}

  submitOrder(orderRequest: OrderRequest): Observable<any> {
    return this.httpClient.post(this.ORDERS_BASE_URL + '/save', orderRequest);
  }

  getUserOrder(userId: any): Observable<any> {
    return this.httpClient.get(this.ORDERS_BASE_URL + '/users/' + userId);
  }

  cancelOrder(id: number): Observable<any> {
    return this.httpClient.delete(this.ORDERS_BASE_URL + '/' + id + '/delete');
  }

  getCompanyOrders(companyId: number): Observable<any> {
    return this.httpClient.get(this.ORDERS_BASE_URL + '/companies/' + companyId);
  }

  getDailyCompanyOrders(companyId: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/daily-orders/companies/' + companyId);
  }

  getDailyOrdersForRestaurant(restaurantAccountId: number): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/daily-orders/restaurants/users/' + restaurantAccountId);
  }
}
