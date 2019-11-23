import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  isLoading = false;
  error = null;
  companyAddedSuccessfully = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  addCompany(addCompanyForm: NgForm) {
    this.isLoading = true;
    const name = addCompanyForm.value.name;
    const address = addCompanyForm.value.address;
    const phoneNumber = addCompanyForm.value.phoneNumber;
    const company = {name, address, phoneNumber};

    this.httpClient.post('https://localhost:8080/main/company/new', company).subscribe(response => {
      this.companyAddedSuccessfully = true;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.error = 'Company could not be added';
    });
  }

}
