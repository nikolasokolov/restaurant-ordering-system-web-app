export class MenuItem {
  public id?: number;
  public type: string;
  public name: string;
  public price: number;
  public allergens: string;

  constructor(name: string, type: string, allergens: string, price: number, id?: number) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.allergens = allergens;
    this.price = price;
  }
}
