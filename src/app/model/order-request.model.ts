export class OrderRequest {
  public id?: number;
  public timePeriod: string;
  public comments: string;
  public menuItemId: number;
  public restaurantId: number;
  public userId: number;

  constructor(timePeriod: string, comments: string, menuItemId: number, restaurantId: number, userId: number, id?: number) {
    this.timePeriod = timePeriod;
    this.comments = comments;
    this.menuItemId = menuItemId;
    this.restaurantId = restaurantId;
    this.userId = userId;
    this.id = id;
  }
}
