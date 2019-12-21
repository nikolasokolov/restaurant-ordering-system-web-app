import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../../model/menu-item.model';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {RestaurantMenuManagementService} from '../restaurant-menu-management-service';

@Component({
  selector: 'app-menu-item-edit',
  templateUrl: './menu-item-edit.component.html',
  styleUrls: ['./menu-item-edit.component.css']
})
export class MenuItemEditComponent implements OnInit {
  isLoading = false;
  error = null;
  isInEdit = false;
  menuItem: MenuItem;
  userId = null;

  constructor(private restaurantMenuManagementService: RestaurantMenuManagementService,
              private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute,
              private location: Location, private router: Router) { }

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(response => {
      this.userId = response.id;
    });
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.restaurantMenuManagementService.getMenuItem(id).subscribe(response => {
        this.menuItem = response;
        this.isInEdit = true;
      });
    } else {
      this.menuItem = new MenuItem('', '', null);
    }
  }

  handleMenuItemForm(menuItemForm: NgForm) {
    const id = this.menuItem.id;
    const name = menuItemForm.value.name;
    const type = menuItemForm.value.type;
    const price = menuItemForm.value.price;
    let menuItem;
    if (id !== undefined) {
      menuItem = new MenuItem(name, type, price, id);
      this.restaurantMenuManagementService.editMenuItem(menuItem, this.userId).subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['/menu-management']);
      }, error => {
        this.isLoading = false;
        this.error = 'An error occurred';
      });
    } else {
      menuItem = new MenuItem(name, type, price);
      this.restaurantMenuManagementService.addMenuItem(menuItem, this.userId).subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['/menu-management']);
      }, error => {
        this.isLoading = false;
        this.error = 'An error occurred';
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
