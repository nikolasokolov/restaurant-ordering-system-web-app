import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../user-service';
import {UserDetails} from '../../model/user-details.model';
import {Users} from '../../model/users.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isLoading = false;
  companyId = null;
  users: Users[] = [];

  displayedColumns: string[] = ['id', 'username', 'email', 'authority', 'company'];
  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private location: Location, private userService: UserService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.dataSource = new MatTableDataSource(this.users);
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

  private getAllUsers() {
    this.userService.getAllUsers().subscribe(response => {
      this.users = response;
      this.dataSource.data = this.users;
      console.log(this.users);
    }, error => {
      alert('Error occurred trying to fetch users');
    });
  }
}
