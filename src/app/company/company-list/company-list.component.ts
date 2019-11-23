import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../model/company.model';
import {Subscription} from 'rxjs';
import {CompanyService} from '../company-service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];
  isLoading = false;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.isLoading = true;
    this.companyService.getAllCompanies().subscribe((response: any[]) => {
      this.companies = response;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

}
