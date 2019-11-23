import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../model/company.model';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../company-service';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  isLoading = false;
  company: Company;

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany() {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params.id;
    this.companyService.getCompany(id).subscribe(response => {
      this.company = response;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

}
