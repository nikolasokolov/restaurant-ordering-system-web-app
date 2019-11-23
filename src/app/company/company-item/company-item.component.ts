import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../model/company.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  isLoading = false;
  company: Company;

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany() {
    const id = this.activatedRoute.snapshot.params.id;
    this.isLoading = true;
    this.httpClient.get<Company>('https://localhost:8080/main/company/' + id).subscribe(response => {
      this.company = response;
      this.isLoading = false;
      console.log(response);
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

}
