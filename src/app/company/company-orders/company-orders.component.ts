import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {CompanyOrders} from '../../model/company-orders.model';
import {CompanyService} from '../company-service';

@Component({
  selector: 'app-company-orders',
  templateUrl: './company-orders.component.html',
  styleUrls: ['./company-orders.component.css']
})
export class CompanyOrdersComponent implements OnInit {
  isLoading = false;
  companyId = null;
  companyOrders: CompanyOrders[] = [];

  displayedColumns: string[] = ['username', 'restaurantName', 'menuItemName', 'menuItemPrice', 'timePeriod', 'dateOfOrder', 'comments'];
  dataSource = new MatTableDataSource(this.companyOrders);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private location: Location, private companyService: CompanyService, public dialog: MatDialog,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.companyId = id;
    }
    this.getCompanyOrders();
    this.dataSource = new MatTableDataSource(this.companyOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack() {
    this.location.back();
  }

  private getCompanyOrders() {
    this.isLoading = true;
    this.companyService.getCompanyOrders(this.companyId).subscribe(response => {
      this.isLoading = false;
      this.companyOrders = response;
      this.dataSource.data = this.companyOrders;
    }, error => {
      this.isLoading = false;
    });
  }

}
