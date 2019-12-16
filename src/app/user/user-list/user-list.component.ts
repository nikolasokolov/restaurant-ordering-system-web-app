import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../user-service';
import {Users} from '../../model/users.model';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {UserDetails} from '../../model/user-details.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isLoading = false;
  companyId = null;
  users: Users[] = [];
  loggedInUser: UserDetails = null;

  displayedColumns: string[] = ['id', 'username', 'email', 'authority', 'company', 'actions'];
  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private location: Location, private userService: UserService, public dialog: MatDialog,
              private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.companyId = id;
    }
    if (this.companyId !== null) {
      this.getAllUsersForCompany(this.companyId);
    } else {
      this.getAllUsers();
    }
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loggedInUser = this.authenticationService.getUserDetails();
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

  private getAllUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe(response => {
      this.isLoading = false;
      this.users = response;
      this.dataSource.data = this.users;
    }, error => {
      this.isLoading = false;
    });
  }

  openDialog(id: number, username: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '140px',
      data: 'Are you sure you want to delete user ' + username + ' ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }

  private deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(response => {
      this.deleteRowDataTable(id, 'id', this.paginator, this.dataSource);
    }, error => {
    });
  }

  private deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
    this.dataSource = dataSource.data;
    const itemIndex = this.users.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  private getAllUsersForCompany(id: number) {
    this.isLoading = true;
    this.userService.getAllUsersForCompany(id).subscribe(response => {
      this.isLoading = false;
      this.users = response;
      this.dataSource.data = this.users;
    }, error => {
      this.isLoading = false;
    });
  }
}
