import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company.model';
import {HttpClient} from '@angular/common/http';
import {CompanyService} from '../company-service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  isLoading = false;
  error = null;
  companyAddedSuccessfully = null;
  company: Company;

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.companyService.getCompany(id).subscribe(response => {
        console.log(response);
        this.company = response;
      });
    }
  }

  addCompany(addCompanyForm: NgForm) {
    this.isLoading = true;
    const name = addCompanyForm.value.name;
    const address = addCompanyForm.value.address;
    const phoneNumber = addCompanyForm.value.phoneNumber;
    const companyRequest = new Company(name, address, phoneNumber);
    this.companyService.addCompany(companyRequest).subscribe(response => {
      this.companyAddedSuccessfully = true;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.error = 'Company could not be added';
    });
  }

}
