import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../model/company.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company-service';

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
              private activatedRoute: ActivatedRoute, private companyService: CompanyService, private router: Router) { }

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
      this.router.navigate(['/company-list']);
    }, () => {
    });

  }
}
