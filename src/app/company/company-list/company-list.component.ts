import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../model/company.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies = [];
  isLoading = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.isLoading = true;
    return this.httpClient.get('https://localhost:8080/main/companies').subscribe((response: any[]) => {
      this.isLoading = false;
      this.companies = response;
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

}
