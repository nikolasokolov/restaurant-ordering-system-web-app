export class RestaurantDailyOrders {
  public companyName: string;
  public user: string;
  public menuItemName: string;
  public menuItemPrice: number;
  public timePeriod: string;
  public dateOfOrder: string;
  public comments: string;

  constructor(companyName: string, user: string, menuItemName: string, menuItemPrice: number,
              timePeriod: string, dateOfOrder: string, comments: string) {
    this.companyName = companyName;
    this.user = user;
    this.menuItemName = menuItemName;
    this.menuItemPrice = menuItemPrice;
    this.timePeriod = timePeriod;
    this.dateOfOrder = dateOfOrder;
    this.comments = comments;
  }
}
