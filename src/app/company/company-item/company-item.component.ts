import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company-service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
import {CompanyItem} from '../../model/company-item.model';
import {Location} from '@angular/common';
import {AddRestaurantDialogComponent} from '../../shared/add-restaurant-dialog/add-restaurant-dialog.component';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {AuthenticationService} from '../../authentication/authentication.service';
import {UserDetails} from '../../model/user-details.model';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  isLoading = false;
  company: CompanyItem;
  alert = new Subject<string>();
  alertMessage: string;
  userDetails: UserDetails;

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute,
              private companyService: CompanyService, private router: Router,
              public dialog: MatDialog, private sanitizer: DomSanitizer, private location: Location,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.getCompany();
    this.authenticationService.userDetails.subscribe(response => {
      this.userDetails = response;
    });
    this.alert.subscribe((message) => this.alertMessage = message);
    this.alert.pipe(debounceTime(2500)).subscribe(() => this.alertMessage = null);
  }

  changeMessage(message: string) {
    this.alert.next(message);
  }

  getCompany() {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params.id;
    this.companyService.getCompany(id).subscribe(response => {
      this.company = response;
      const objectURL = 'data:image/jpeg;base64,' + this.company.logo;
      this.company.logoImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe(response => {
      this.router.navigate(['/companies']);
    }, () => {
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '140px',
      data: 'Are you sure you want to delete company ' + this.company.name + ' ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCompany(id);
      }
    });
  }

  openRestaurantAddDialog(): void {
    const dialogRef = this.dialog.open(AddRestaurantDialogComponent, {
      width: '500px',
      height: '250px',
      data: this.company
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeMessage('Restaurant is successfully added to company ' + this.company.name);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
