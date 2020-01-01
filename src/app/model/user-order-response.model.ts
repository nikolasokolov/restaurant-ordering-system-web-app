export class UserOrderResponse {
  public id: number;
  public timePeriod: string;
  public comments: string;
  public menuItemName: string;
  public restaurantId: number;

  constructor(timePeriod: string, comments: string, menuItemName: string, id: number, restaurantId: number) {
    this.timePeriod = timePeriod;
    this.comments = comments;
    this.menuItemName = menuItemName;
    this.id = id;
    this.restaurantId = restaurantId;
  }
}
