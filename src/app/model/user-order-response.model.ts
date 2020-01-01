export class UserOrderResponse {
  public id: number;
  public timePeriod: string;
  public comments: string;
  public menuItemName: string;

  constructor(timePeriod: string, comments: string, menuItemName: string, id: number) {
    this.timePeriod = timePeriod;
    this.comments = comments;
    this.menuItemName = menuItemName;
    this.id = id;
  }
}
