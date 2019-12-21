export class MenuItem {
  public id?: number;
  public type: string;
  public name: string;
  public price: number;

  constructor(name: string, type: string, price: number, id?: number) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.price = price;
  }
}
