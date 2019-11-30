import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../model/company.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company-service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  isLoading = false;
  company: Company;
  imageBlobUrl: string | ArrayBuffer = null;

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute, private companyService: CompanyService,
              private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany() {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params.id;
    this.companyService.getCompany(id).subscribe(response => {
      this.company = response;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
    if (id !== undefined) {
      this.getThumbnail(id);
    }
  }

  getThumbnail(id: number): void {
    this.companyService.getLogo(id).subscribe((val) => {
      console.log(val);
      this.createImageFromBlob(val);
      }, () => {
        }, () => {
        });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageBlobUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
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
