export class Company {
  public id: number;
  public address: string;
  public name: string;
  public phoneNumber: string;

  constructor(name: string, address: string, phoneNumber: string, id?: number) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}
