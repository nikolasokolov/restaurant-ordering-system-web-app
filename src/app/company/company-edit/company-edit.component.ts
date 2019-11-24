import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company-service';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../model/company.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  companyEditedSuccessfully = null;
  company: Company;
  isLoading = false;
  error = null;

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.companyService.getCompany(id).subscribe(response => {
        this.company = response;
      });
    }
  }

  editCompany(editCompanyForm: NgForm) {
    this.isLoading = true;
    const id = editCompanyForm.value.id;
    const name = editCompanyForm.value.name;
    const address = editCompanyForm.value.address;
    const phoneNumber = editCompanyForm.value.phoneNumber;
    const companyRequest = new Company(name, address, phoneNumber, this.company.id);
    this.companyService.editCompany(companyRequest).subscribe(response => {
      this.companyEditedSuccessfully = true;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.error = 'Error occurred while trying to update company';
    });
    editCompanyForm.resetForm();
  }

}
