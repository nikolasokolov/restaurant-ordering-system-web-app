import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company-service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
import {CompanyItem} from '../../model/company-item.model';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  isLoading = false;
  company: CompanyItem;

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute, private companyService: CompanyService,
              private router: Router, public dialog: MatDialog, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getCompany();
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
      height: '150px',
      data: 'Are you sure you want to delete company ' + this.company.name + ' ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.deleteCompany(id);
      }
    });
  }
}
