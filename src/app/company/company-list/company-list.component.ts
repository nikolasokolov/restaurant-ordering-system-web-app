import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company-service';
import {CompanyItem} from '../../model/company-item.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: CompanyItem[];
  isLoading = false;

  constructor(private companyService: CompanyService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.isLoading = true;
    this.companyService.getAllCompanies().subscribe((response: any[]) => {
      this.companies = response;
      for (const companyItem of this.companies) {
        const objectURL = 'data:image/jpeg;base64,' + companyItem.logo;
        companyItem.logoImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

}
