import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MenuItem} from '../../model/menu-item.model';
import {RestaurantMenuManagementService} from '../restaurant-menu-management-service';

@Component({
  selector: 'app-restaurant-menu-management',
  templateUrl: './restaurant-menu-management.component.html',
  styleUrls: ['./restaurant-menu-management.component.css']
})
export class RestaurantMenuManagementComponent implements OnInit {
  isLoading = false;
  userId = null;
  menuItems: MenuItem[] = [];

  displayedColumns: string[] = ['id', 'type', 'name', 'price', 'actions'];
  dataSource = new MatTableDataSource(this.menuItems);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private location: Location, private restaurantMenuManagementService: RestaurantMenuManagementService,
              public dialog: MatDialog, private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(response => {
      this.userId = response.id;
    });
    this.getMenuItemsForRestaurant(this.userId);
    this.dataSource = new MatTableDataSource(this.menuItems);
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

  openDeleteMenuItemDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '140px',
      data: 'Are you sure you want to remove ' + name + ' from the menu ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMenuItem(id);
      }
    });
  }

  deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
    this.dataSource = dataSource.data;
    const itemIndex = this.menuItems.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  getMenuItemsForRestaurant(restaurantId: any) {
    this.isLoading = true;
    this.restaurantMenuManagementService.getRestaurantMenuItems(restaurantId).subscribe(response => {
      this.isLoading = false;
      this.menuItems = response;
      this.dataSource.data = this.menuItems;
    }, error => {
      this.isLoading = false;
    });
  }

  deleteMenuItem(id: number) {
    this.restaurantMenuManagementService.deleteMenuItem(id).subscribe(() => {
      this.deleteRowDataTable(id, 'id', this.paginator, this.dataSource);
    }, () => {});
  }

}
