import {RestaurantAccountDetails} from './restaurant-account-details.model';

export class RestaurantItem {
  public id: number;
  public address: string;
  public name: string;
  public phoneNumber: string;
  public logo: ArrayBuffer | string;
  public logoImage: any;
  public restaurantAccountDetails: RestaurantAccountDetails;

  constructor(id: number, name: string, address: string, phoneNumber: string,
              restaurantAccountDetails: RestaurantAccountDetails) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.restaurantAccountDetails = restaurantAccountDetails;
  }
}
