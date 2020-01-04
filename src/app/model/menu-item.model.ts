export class MenuItem {
  public id?: number;
  public type: string;
  public name: string;
  public price: number;
  public allergens: string;
  public isAvailable: boolean;

  constructor(name: string, type: string, allergens: string, price: number, isAvailable: boolean, id?: number) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.allergens = allergens;
    this.price = price;
    this.isAvailable = isAvailable;
  }
}
