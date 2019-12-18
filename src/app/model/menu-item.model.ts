export class MenuItem {
  public id: number;
  public type: string;
  public name: string;
  public price: number;

  constructor(id: number, type: string, name: string, price: number) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.price = price;
  }
}
