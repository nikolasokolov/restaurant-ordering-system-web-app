import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../model/company.model';
import {CompanyItem} from '../model/company-item.model';

@Injectable({providedIn: 'root'})
export class CompanyService {
  COMPANIES_BASE_URL = 'https://localhost:8080/main/companies';

  constructor(private httpClient: HttpClient) {}

  getAllCompanies(): Observable<any> {
    return this.httpClient.get(this.COMPANIES_BASE_URL + '/');
  }

  getCompany(id: number): Observable<any> {
    return this.httpClient.get<Company>(this.COMPANIES_BASE_URL + '/' + id);
  }

  addCompany(company: Company): Observable<any> {
    return this.httpClient.post(this.COMPANIES_BASE_URL + '/new', company);
  }

  editCompany(company: Company): Observable<any> {
    return this.httpClient.put(this.COMPANIES_BASE_URL + '/edit', company);
  }

  deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete(this.COMPANIES_BASE_URL + '/' + id + '/delete');
  }

  uploadFile(file: File, companyId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.COMPANIES_BASE_URL + '/' + companyId + '/uploadLogo/' , formData);
  }

  addRestaurantForCompany(company: CompanyItem, restaurantId: number): Observable<any> {
    return this.httpClient.post(this.COMPANIES_BASE_URL + '/' + company.id + '/restaurants/' + restaurantId + '/add', company);
  }

  sendInvoice(userId: number, companyId: any) {
    return this.httpClient.get('https://localhost:8080/main/invoices/companies/' + companyId + '/users/' + userId);
  }

  getCompaniesForRestaurant(userId: number): Observable<any> {
    return this.httpClient.get(this.COMPANIES_BASE_URL + '/users/' + userId);
  }
}
