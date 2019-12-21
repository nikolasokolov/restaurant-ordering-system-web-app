import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MenuItem} from '../../model/menu-item.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-menu-item-dialog',
  templateUrl: './add-menu-item-dialog.component.html',
  styleUrls: ['./add-menu-item-dialog.component.css']
})
export class AddMenuItemDialogComponent implements OnInit {
  isLoading = false;
  error = null;
  isInEdit = false;
  menuItem: MenuItem;

  constructor(public dialogRef: MatDialogRef<AddMenuItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public menuItemForEdit: MenuItem) {
  }

  ngOnInit() {
    if (this.menuItemForEdit.id !== undefined) {
      this.isInEdit = true;
      this.menuItem = new MenuItem(this.menuItemForEdit.name,
        this.menuItemForEdit.type, this.menuItemForEdit.price, this.menuItemForEdit.id);
    } else {
      this.isInEdit = false;
      this.menuItem = this.menuItemForEdit;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleMenuItemForm(menuItemForm: NgForm) {

  }
}
