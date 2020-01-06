import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyOrders} from '../../model/company-orders.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {UserDetails} from '../../model/user-details.model';
import {AuthenticationService} from '../../authentication/authentication.service';
import {OrderService} from '../../restaurant/order-service';

@Component({
  selector: 'app-colleagues-choices',
  templateUrl: './colleagues-choices.component.html',
  styleUrls: ['./colleagues-choices.component.css']
})
export class ColleaguesChoicesComponent implements OnInit {
  isLoading = false;
  dailyCompanyOrders: CompanyOrders[] = [];
  userDetails: UserDetails;

  displayedColumns: string[] = ['username', 'restaurantName', 'menuItemName', 'timePeriod', 'comments'];
  dataSource = new MatTableDataSource(this.dailyCompanyOrders);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private location: Location, private orderService: OrderService, public dialog: MatDialog,
              private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(response => {
      this.userDetails = response;
    });
    this.getDailyCompanyOrders();
    this.dataSource = new MatTableDataSource(this.dailyCompanyOrders);
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

  getDailyCompanyOrders() {
    const companyId = this.userDetails.company.id;
    this.isLoading = true;
    this.orderService.getDailyCompanyOrders(companyId).subscribe(response => {
      this.isLoading = false;
      this.dailyCompanyOrders = response;
      this.dataSource.data = this.dailyCompanyOrders;
    }, error => {
      this.isLoading = false;
    });
  }

}
