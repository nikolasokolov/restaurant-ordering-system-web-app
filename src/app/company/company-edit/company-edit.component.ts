import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../../model/company.model';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  company: Company;
  isLoading = false;
  error = null;
  isInEdit = false;
  selectedPhoto: File = null;
  alert = new Subject<string>();
  alertMessage: string;

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute,
              private location: Location, private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.companyService.getCompany(id).subscribe(response => {
        this.company = response;
        this.isInEdit = true;
      });
    } else {
      this.company = new Company('', '', '');
    }
    this.alert.subscribe((message) => this.alertMessage = message);
    this.alert.pipe(debounceTime(2500)).subscribe(() => this.alertMessage = null);
  }

  changeMessage(message: string) {
    this.alert.next(message);
  }

  handleCompanyForm(companyForm: NgForm) {
    this.isLoading = true;
    const name = companyForm.value.name;
    const address = companyForm.value.address;
    const phoneNumber = companyForm.value.phoneNumber;
    if (this.company.id !== undefined) {
      const editCompanyRequest = new Company(name, address, phoneNumber, this.company.id);
      this.companyService.editCompany(editCompanyRequest).subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['/company/' + this.company.id]);
      }, () => {
        this.isLoading = false;
        this.error = 'Error occurred while trying to update company';
      });
      companyForm.resetForm();
    } else {
      const addCompanyRequest = new Company(name, address, phoneNumber);
      this.companyService.addCompany(addCompanyRequest).subscribe(response => {
        this.changeMessage('Company added successfully');
        this.isLoading = false;
        this.companyService.uploadFile(this.selectedPhoto, response.id).subscribe(() => {
        }, () => {
        });
      }, () => {
        this.isLoading = false;
        this.error = 'Company could not be added';
      });
      companyForm.resetForm();
    }
  }

  onFileSelected(event) {
    this.selectedPhoto = event.target.files[0];
  }

  goBack() {
    this.location.back();
  }

}
