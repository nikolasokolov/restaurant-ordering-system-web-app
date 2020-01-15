import {Component, OnInit, ViewChild} from '@angular/core';
import {UserDetails} from '../../model/user-details.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Location} from '@angular/common';
import {OrderService} from '../order-service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {RestaurantDailyOrders} from '../../model/restaurant-daily-orders.model';
import {ExportService} from "../export-service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-daily-orders',
  templateUrl: './daily-orders.component.html',
  styleUrls: ['./daily-orders.component.css']
})
export class DailyOrdersComponent implements OnInit {
  isLoading = false;
  restaurantDailyOrders: RestaurantDailyOrders[] = [];
  userDetails: UserDetails;

  displayedColumns: string[] = ['companyName', 'user', 'menuItemName', 'menuItemPrice', 'timePeriod', 'comments'];
  dataSource = new MatTableDataSource(this.restaurantDailyOrders);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private location: Location, private orderService: OrderService, public dialog: MatDialog,
              private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService,
              private exportService: ExportService) { }

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(response => {
      this.userDetails = response;
    });
    this.getDailyOrdersForRestaurant();
    this.dataSource = new MatTableDataSource(this.restaurantDailyOrders);
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

  getDailyOrdersForRestaurant() {
    const restaurantAccountId = this.userDetails.id;
    this.isLoading = true;
    this.orderService.getDailyOrdersForRestaurant(restaurantAccountId).subscribe(response => {
      this.isLoading = false;
      this.restaurantDailyOrders = response;
      this.dataSource.data = this.restaurantDailyOrders;
    }, () => {
      this.isLoading = false;
    });
  }

  exportDailyOrdersToPdf() {
    this.exportService.generateDocumentReport(1).subscribe(response => {
      let file = new Blob([response.data], { type: 'application/pdf' });
      let fileURL = window.top.URL.createObjectURL(file);
      window.top.open(fileURL, '_blank');
    }, error => {

    })
  }
}
