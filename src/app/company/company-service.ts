import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../model/company.model';

@Injectable({providedIn: 'root'})
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  getAllCompanies(): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/companies');
  }

  getCompany(id: number): Observable<any> {
    return this.httpClient.get<Company>('https://localhost:8080/main/company/' + id);
  }

  addCompany(company: Company): Observable<any> {
    return this.httpClient.post('https://localhost:8080/main/company/new', company);
  }

  editCompany(company: Company): Observable<any> {
    return this.httpClient.put('https://localhost:8080/main/company/edit', company);
  }

  deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete('https://localhost:8080/main/company/' + id + '/delete');
  }

  uploadFile(file: File, companyId: number): Observable<any> {
    const url = 'https://localhost:8080/main/company/' + companyId + '/uploadLogo/';
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(url , formData);
  }

}
