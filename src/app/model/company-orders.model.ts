export class CompanyOrders {
  public username: string;
  public restaurantName: string;
  public menuItemName: string;
  public menuItemPrice: number;
  public timePeriod: string;
  public dateOfOrder: string;
  public comments: string;

  constructor(username: string, restaurantName: string, menuItemName: string, menuItemPrice: number,
              timePeriod: string, dateOfOrder: string, comments: string) {
    this.username = username;
    this.restaurantName = restaurantName;
    this.menuItemName = menuItemName;
    this.menuItemPrice = menuItemPrice;
    this.timePeriod = timePeriod;
    this.dateOfOrder = dateOfOrder;
    this.comments = comments;
  }
}
