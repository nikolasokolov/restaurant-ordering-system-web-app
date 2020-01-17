import {Component, Inject, OnInit} from '@angular/core';
import {RestaurantItem} from "../../model/restaurant-item.model";
import {CompanyItem} from "../../model/company-item.model";
import {CompanyService} from "../../company/company-service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDetails} from "../../model/user-details.model";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-monthly-invoice-dialog',
  templateUrl: './monthly-invoice-dialog.component.html',
  styleUrls: ['./monthly-invoice-dialog.component.css']
})
export class MonthlyInvoiceDialogComponent implements OnInit {
  isLoading = false;
  companies: CompanyItem[];
  restaurantItem: RestaurantItem;
  errorMessage = null;
  selectedCompanyId;
  userDetails: UserDetails;

  constructor(public dialogRef: MatDialogRef<MonthlyInvoiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public restaurant: string, private companyService: CompanyService,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(response => {
      this.userDetails = response;
    });
    this.getAllCompanies();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getAllCompanies() {
    this.isLoading = true;
    this.companyService.getAllCompanies().subscribe((response: any[]) => {
      this.companies = response;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  changeCompany(companyId: any) {
    this.selectedCompanyId = companyId;
  }

  sendInvoiceToCompany() {
    const companyId = this.selectedCompanyId;
    this.companyService.sendInvoice(this.userDetails.id, companyId).subscribe(() => {
    }, () => {
      this.errorMessage = 'An error occurred trying to send invoice to company ';
    });
  }
}
